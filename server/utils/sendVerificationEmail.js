const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, firstName, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `${process.env.CLIENT_URL}/verify/${token}`;

  await transporter.sendMail({
    from: `"Booking App" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Verify your email",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Hello ${firstName},</p>
        <p>Thank you for registering with our service. To complete your registration, please verify your email address by clicking the button below:</p>
        <p>
          <a href="${url}" class="button">Verify Email</a>
        </p>
      </div>
    </body>
    </html>
  `,
  });
};

module.exports = sendVerificationEmail;
