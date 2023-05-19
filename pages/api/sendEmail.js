const nodemailer = require("nodemailer");
const { https } = require("firebase-functions");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "429managerapplication@gmail.com",
      pass: "ytuieehjgwotlgzd",
    },
});

const sendEmail = https.onRequest(async (req, res) => {
    const { email, firstName, lastName } = req.body;

    const mailOptions = {
        from: "429managerapplication@gmail.com",
        to: email,
        subject: "Application Accepted",
        text: `Dear ${firstName} ${lastName},\n\nCongratulations! Your application has been accepted.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "An error occurred while sending the email" });
    }
});

module.exports = sendEmail;