import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMagicLink = async (email, link) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Kete of Knowledge" <no-reply@kete.com>', // sender address
      to: email, // list of receivers
      subject: "Login to Kete of Knowledge", // Subject line
      text: `Click here to login: ${link}`, // plain text body
      html: `<p>Click here to login: <a href="${link}">${link}</a></p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendPasswordResetLink = async (email, link) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Kete of Knowledge" <no-reply@kete.com>', // sender address
      to: email, // list of receivers
      subject: "Reset your Kete Admin Password", // Subject line
      text: `Click here to reset your password: ${link}`, // plain text body
      html: `<p>Click here to reset your password: <a href="${link}">${link}</a></p>`, // html body
    });

    console.log("Password reset message sent: %s", info.messageId);
    if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
