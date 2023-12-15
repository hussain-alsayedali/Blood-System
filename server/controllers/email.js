const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bloodwaveproject@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(recipientMail, messageSubject, messageText) {
  try {
    const mailOptions = {
      from: "bloodwaveproject@gmail.com",
      to: recipientMail,
      subject: messageSubject,
      text: messageText,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
