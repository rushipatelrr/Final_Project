const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // use TLS on 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text version
 * @param {string} html - HTML version (optional)
 */
async function sendMail(to, subject, text, html = null) {
  try {
    const info = await transporter.sendMail({
      from: `"Campus Cravings" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text, // if no HTML, fallback to plain text
    });
    console.log("✅ Mail sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email error:", err);
    throw err;
  }
}

module.exports = sendMail;
