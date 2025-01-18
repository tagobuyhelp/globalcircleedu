import { asyncHandler } from "../utils/asyncHandler.js";
import { Payment } from '../models/payment.model.js';
import { Billing } from '../models/billing.model.js';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import { notifyAdmins, notifyUser } from '../utils/sendEmail.js';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createPayment = asyncHandler(async (req, res) => {
    const { amount, currency, paymentMethod, serviceId, offlineDetails } = req.body;
    const userId = req.user._id;

    let payment;

    if (paymentMethod === 'stripe') {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency,
            payment_method: req.body.paymentMethodId,
            confirm: true
        });

        payment = await Payment.create({
            user: userId,
            amount,
            currency,
            paymentMethod,
            transactionId: paymentIntent.id,
            status: 'completed',
            service: serviceId
        });

        await notifyPaymentParties(payment, 'Stripe', req.user.email);

    } else if (paymentMethod === 'razorpay') {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: `receipt_${Date.now()}`
        });

        payment = await Payment.create({
            user: userId,
            amount,
            currency,
            paymentMethod,
            razorpayOrderId: order.id,
            status: 'pending',
            service: serviceId
        });

        await notifyPaymentParties(payment, 'Razorpay', req.user.email, true);

    } else if (paymentMethod === 'offline') {
        payment = await Payment.create({
            user: userId,
            amount,
            currency,
            paymentMethod,
            status: 'pending',
            service: serviceId,
            offlineDetails: offlineDetails || {}
        });

        await Billing.create({
            user: userId,
            service: serviceId,
            amount,
            currency,
            status: 'pending',
            payment: payment._id
        });

        await notifyPaymentParties(payment, 'Offline', req.user.email, true);

    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid payment method'
        });
    }

    res.status(201).json({
        success: true,
        data: payment
    });
});

export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { 
                status: 'completed',
                razorpayPaymentId: razorpay_payment_id,
                transactionId: razorpay_payment_id
            },
            { new: true }
        );

        await Billing.findOneAndUpdate(
            { user: payment.user, service: payment.service, status: 'pending' },
            { status: 'paid', payment: payment._id }
        );

        await notifyPaymentParties(payment, 'Razorpay', req.user.email);

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid signature'
        });
    }
});

export const getPaymentHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const payments = await Payment.find({ user: userId }).populate('service');

    res.status(200).json({
        success: true,
        data: payments
    });
});

async function notifyPaymentParties(payment, paymentProvider, userEmail, isPending = false) {
    const status = isPending ? 'initiated' : 'completed';
    const adminSubject = `New ${paymentProvider} Payment ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    const adminMessage = `A new ${paymentProvider} payment of ${payment.currency} ${payment.amount} has been ${status} for service ${payment.service}.`;
    const adminHtml = `
        <h1>${adminSubject}</h1>
        <p>${adminMessage}</p>
        <p>Payment ID: ${payment._id}</p>
        <p>User ID: ${payment.user}</p>
        <p>Status: ${payment.status}</p>
    `;
    await notifyAdmins(adminSubject, adminMessage, adminHtml);

    const userSubject = `Your ${paymentProvider} Payment Has Been ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    const userMessage = `Your ${paymentProvider} payment of ${payment.currency} ${payment.amount} has been ${status}.`;
    const userHtml = `
        <h1>${userSubject}</h1>
        <p>${userMessage}</p>
        <p>Payment ID: ${payment._id}</p>
        <p>Amount: ${payment.currency} ${payment.amount}</p>
        <p>Status: ${payment.status}</p>
    `;
    await notifyUser(userEmail, userSubject, userMessage, userHtml);
}