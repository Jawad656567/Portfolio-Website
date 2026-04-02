const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ POST contact form
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // ✅ Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Mail options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // tumhara gmail
      subject: `New Message: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email failed" });
  }
});

module.exports = router;