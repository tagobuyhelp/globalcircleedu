import { User } from '../models/user.model.js';
import { Visitor } from '../models/visitor.model.js';
import { Agent } from '../models/agent.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// Register user
export const register = asyncHandler(async (req, res) => {
    const { email, password, role, phone, name } = req.body;

    // Define allowed roles
    const allowedRoles = ['administrator', 'admin', 'editor', 'visitor', 'agent'];

    // Check if the role is valid
    if (!allowedRoles.includes(role)) {
        throw new ApiError(400, 'Invalid role');
    }

    // Check if the user making the request is an administrator or admin
    if (req.user && !['administrator', 'admin'].includes(req.user.role)) {
        throw new ApiError(403, 'Only administrators and admins can create new users');
    }

    // If no user is authenticated (i.e., during initial setup), allow the creation of the first administrator
    if (!req.user && role === 'administrator') {
        const administratorCount = await User.countDocuments({ role: 'administrator' });
        if (administratorCount > 0) {
            throw new ApiError(403, 'Administrator already exists. Only existing administrators can create new users');
        }
    }

    // Additional checks based on roles
    if (req.user) {
        if (req.user.role === 'admin' && role === 'administrator') {
            throw new ApiError(403, 'Admins cannot create administrator accounts');
        }
        if (req.user.role === 'admin' && role === 'admin') {
            throw new ApiError(403, 'Admins cannot create other admin accounts');
        }
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        phone
    });

    // If the role is 'visitor' or 'agent', create the corresponding entry
    if (role === 'visitor') {
        await Visitor.create({
            name,
            email,
            phone,
        });
    } else if (role === 'agent') {
        await Agent.create({
            name,
            email,
            phone,
        });
    }

    sendTokenResponse(user, 201, res);
});

// Login user
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Please provide an email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    sendTokenResponse(user, 200, res);
});

// Forgot password
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new ApiError(404, 'There is no user with that email');
    }

    // Generate OTP
    const otp = user.getResetPasswordOtp();
    await user.save({ validateBeforeSave: false });

    // Create reset url
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Your OTP is: ${otp}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset OTP',
            message,
        });

        res.status(200).json(new ApiResponse(200, {}, 'OTP sent to email'));
    } catch (err) {
        console.log(err);
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        throw new ApiError(500, 'Email could not be sent');
    }
});

// Reset password
export const resetPassword = asyncHandler(async (req, res, next) => {
    // Get hashed OTP
    const resetPasswordOtp = crypto
        .createHash('sha256')
        .update(req.body.otp)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordOtp,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(400, 'Invalid or expired OTP');
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// Delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Check if the user is trying to delete their own account
    if (user._id.toString() !== req.user.id) {
        throw new ApiError(401, 'You can only delete your own account');
    }

    await user.remove();

    res.status(200).json(new ApiResponse(200, {}, 'User deleted successfully'));
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    if (!token) {
        throw new ApiError(500, 'Failed to generate token');
    }

    const options = {
        expires: new Date(
            Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json(new ApiResponse(statusCode, { token }, 'User logged in successfully'));
};