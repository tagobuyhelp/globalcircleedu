import { asyncHandler } from "../utils/asyncHandler.js";
import { Payment } from '../models/payment.model.js';
import { Billing } from '../models/billing.model.js';
import Stripe from 'stripe';
import Razorpay from 'razorpay';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createPayment = asyncHandler(async (req, res) => {
    const { amount, currency, paymentMethod, serviceId } = req.body;
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
        await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { 
                status: 'completed',
                razorpayPaymentId: razorpay_payment_id,
                transactionId: razorpay_payment_id
            }
        );

        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

        // Update the corresponding billing record
        await Billing.findOneAndUpdate(
            { user: payment.user, service: payment.service, status: 'pending' },
            { status: 'paid', payment: payment._id }
        );

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