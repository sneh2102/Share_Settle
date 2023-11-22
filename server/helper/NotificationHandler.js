const nodemailer = require('nodemailer');
const emailTemplates = require('../emailTemplates.json'); 

const notificationHandler = async (email, userName, groupName, action) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: process.env.SHARESETTLE_EMAIL,
            pass: process.env.CONTACTUS_PASSWORD
        }
    });

    const template = emailTemplates[action];

    if (!template) {
        console.error('Invalid action:', action);
        return {
            success: false,
            message: 'Invalid action. Email not sent.'
        };
    }

    const mailOptions = {
        from: 'sharesettle@outlook.com',
        to: email,
        subject: template.subject,
        text: template.text.replace('{userName}', userName).replace('{groupName}', groupName)
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent:', response);

        return {
            success: true,
            message: 'Email sent successfully'
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: 'Error sending email. Please try again later.'
        };
    }
};

module.exports = notificationHandler;
