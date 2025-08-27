// backend/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@dubaicreatorsummit.com",
    pass: "Info@DubaiCreatorSummit2025" // Use App Password
  },
});

module.exports = transporter;
