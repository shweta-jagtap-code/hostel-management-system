const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendWelcomeMail(toEmail, username, tempPassword) {
  const info = await transporter.sendMail({
    from: `"Hostel Admin" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Your Hostel Account Login Credentials",
    html: `
      <h3>Welcome ${username}</h3>
      <p>Your account has been created.</p>
      <p><b>Temporary Password:</b> ${tempPassword}</p>
      <p>Please login and change your password immediately.</p>
    `,
  });

  console.log("📧 Email sent:", info.messageId);
}

module.exports = { sendWelcomeMail };
