// services/email.js — hardened, non-throwing mailer for Kete of Knowledge
// Drop-in replacement: same exports (sendMagicLink, sendPasswordResetLink),
// same call signatures. Difference: these never throw. They return
//   { ok: true, messageId } on success, or { ok: false, error } on failure.
// This guarantees an SMTP problem can never turn into a 500 "Server error"
// that blocks login — in dev OR production. The token is already persisted
// before the email is attempted, so login still works even if delivery fails.

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true only for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail: must be a 16-char App Password, no spaces
  },
});

// Verify at startup so a bad login (like the 535 you're hitting) shows up
// immediately and clearly, instead of only on the first send attempt.
transporter.verify()
  .then(() => console.log('📧 SMTP ready'))
  .catch((err) =>
    console.warn('⚠️  SMTP not ready — emails will be skipped:', err.message)
  );

async function send({ to, subject, text, html, label }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Kete of Knowledge" <no-reply@kete.com>',
      to,
      subject,
      text,
      html,
    });
    console.log(`📧 ${label} sent to ${to}: ${info.messageId}`);
    if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    // Log loudly, but never throw — callers must not treat this as fatal.
    console.error(`⚠️  Failed to send ${label} to ${to}:`, error.message);
    return { ok: false, error: error.message };
  }
}

export const sendMagicLink = (email, link) =>
  send({
    to: email,
    subject: 'Login to Kete of Knowledge',
    text: `Click here to login: ${link}`,
    html: `<p>Click here to login: <a href="${link}">${link}</a></p>`,
    label: 'Magic link',
  });

export const sendPasswordResetLink = (email, link) =>
  send({
    to: email,
    subject: 'Reset your Kete Admin Password',
    text: `Click here to reset your password: ${link}`,
    html: `<p>Click here to reset your password: <a href="${link}">${link}</a></p>`,
    label: 'Password reset',
  });
