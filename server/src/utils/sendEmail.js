import nodemailer from 'nodemailer';
import { User } from '../models/user.model.js';

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const message = {
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html, // Add HTML support
        };

        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

const getAdminEmails = async () => {
    try {
        const adminUsers = await User.find({ role: { $in: ['administrator', 'admin'] } }).select('email');
        return adminUsers.map(user => user.email);
    } catch (error) {
        console.error('Error fetching admin emails:', error);
        return [];
    }
};

const notifyAdmins = async (subject, message, html) => {
    try {
        const adminEmails = await getAdminEmails();
        for (const email of adminEmails) {
            await sendEmail({
                email,
                subject: `[ADMIN NOTIFICATION] ${subject}`,
                message,
                html,
            });
        }
    } catch (error) {
        console.error('Error notifying admins:', error);
    }
};

const notifyUser = async (userEmail, subject, message, html) => {
    try {
        await sendEmail({
            email: userEmail,
            subject,
            message,
            html,
        });
    } catch (error) {
        console.error('Error notifying user:', error);
    }
};

export { sendEmail, notifyAdmins, notifyUser };