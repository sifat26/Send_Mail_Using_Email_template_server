const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Load the email template
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "test.html"),
  "utf8"
);

// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or "Mailtrap" / "SendGrid" etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password or smtp password
  },
});

// Send email route
app.get("/send-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"Demo Server" <${process.env.EMAIL_USER}>`,
      to: req.query.to || "sifatict26@gmail.com", 
      subject: "7 Must-Know Business Insurance Types for Entrepreneurs",
      html: emailTemplate,
    });

    res.send("✅ Email sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to send email");
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
