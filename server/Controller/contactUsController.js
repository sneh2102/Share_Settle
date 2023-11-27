/**
 * Contact Us Controller:
 * This controller handles the logic for processing and sending contact us emails.
 * It uses Nodemailer to send emails to the specified recipient.
 */
const nodemailer = require('nodemailer');

/**
 * contactUs Function:
 * Handles the processing of a contact us request, sends an email with the provided information.
 * @param {Object} req - The Express request object containing the contact details.
 * @param {Object} res - The Express response object to send the email status.
 */
const contactUs = (req, res) => {
    const {name, email, subject, message} = req.body;
    console.log(name)

    // Creating a Nodemailer transporter with the provided email server configuration.
    const transporter = nodemailer.createTransport({
        host: process.env.CONTACTUS_EMAIL_HOST,
        secureConnection: false,
        port: 587,
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user: process.env.CONTACTUS_USERNAME,
            pass: process.env.CONTACTUS_PASSWORD
        }
    });
    
    var mailOptions = {
        from: process.env.CONTACTUS_USERNAME,
        to: process.env.SHARESETTLE_EMAIL,
        subject: `User contacted: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Sending the email.
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send({error: error});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({message: "Email sent"});
        }
    });
    
};

// Exporting the contactUs function.
module.exports = {contactUs};