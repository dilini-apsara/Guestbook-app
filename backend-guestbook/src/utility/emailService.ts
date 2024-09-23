import nodemailer from 'nodemailer';

export async function sendResetPasswordEmail(email: string, resetUrl: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'no-reply@example.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please use the following link: ${resetUrl}`
    };

    await transporter.sendMail(mailOptions);
}
