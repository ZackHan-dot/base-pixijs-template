import nodemailer from 'nodemailer';
import {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_SECURE,
} from '@/config';

// 创建邮件传输器
const transporter = nodemailer.createTransport({
    pool: true,
    host: SMTP_HOST, // SMTP 服务器地址
    port: Number(SMTP_PORT), // SMTP 端口
    secure: SMTP_SECURE === 'true' || false, // 如果是 465 端口，则设置为 true
    auth: {
        user: SMTP_USER, // 你的邮箱地址
        pass: SMTP_PASS, // 你的邮箱密码
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
    const mailOptions = {
        from: SMTP_FROM, // 发件人地址
        to, // 收件人地址
        subject, // 邮件主题
        text, // 纯文本内容
        html, // HTML 内容（可选）
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: %s', error);
    }
};
