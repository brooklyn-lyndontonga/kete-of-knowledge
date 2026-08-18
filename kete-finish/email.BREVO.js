// services/email.js — hardened, non-throwing mailer for Kete of Knowledge
//
// TWO TRANSPORTS, picked automatically:
//   1. Brevo HTTPS API  — used when BREVO_API_KEY is set. Required on
//      Railway Free/Trial/Hobby plans, where outbound SMTP ports are
//      blocked (connections just time out). Works over plain HTTPS.
//      Set in Railway:  BREVO_API_KEY   = your key from app.brevo.com
//                       BREVO_FROM_EMAIL = the VERIFIED sender address
//                       BREVO_FROM_NAME  = display name (optional)
//   2. SMTP (nodemailer) — fallback for local dev / SMTP-capable hosts.
//      Uses SMTP_* vars, connecting via an explicitly-resolved IPv4
//      address (some hosts resolve Gmail to IPv6 with no IPv6 route).
//
// Same exports as always (sendMagicLink, sendPasswordResetLink), same
// signatures, and they NEVER throw — they return {ok:true,messageId}
// or {ok:false,error}, so email trouble can never 500 a login request.

import nodemailer from 'nodemailer';
import dns from 'node:dns';

const BREVO_API_KEY = process.env.BREVO_API_KEY || null;
const BREVO_FROM_EMAIL =
  process.env.BREVO_FROM_EMAIL || process.env.SMTP_USER || null;
const BREVO_FROM_NAME = process.env.BREVO_FROM_NAME || 'Kete of Knowledge';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.ethereal.email';

// ── Transport 1: Brevo over HTTPS ────────────────────────────────
async function sendViaBrevo({ to, subject, text, html, label }) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: BREVO_FROM_NAME, email: BREVO_FROM_EMAIL },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Brevo ${res.status}: ${body.message || JSON.stringify(body)}`
    );
  }
  console.log(`📧 ${label} sent to ${to} via Brevo: ${body.messageId || 'ok'}`);
  return { ok: true, messageId: body.messageId || null };
}

// ── Transport 2: SMTP via nodemailer (IPv4-pinned) ───────────────
const transporterPromise = BREVO_API_KEY
  ? null
  : (async () => {
      let host = SMTP_HOST;
      try {
        const addrs = await dns.promises.resolve4(SMTP_HOST);
        if (addrs && addrs.length) {
          host = addrs[0];
          console.log(`📧 SMTP using IPv4 ${host} for ${SMTP_HOST}`);
        }
      } catch (e) {
        console.warn(
          `📧 IPv4 resolve failed for ${SMTP_HOST} (${e.message}) — using hostname`
        );
      }
      return nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true only for port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS, // Gmail: 16-char App Password
        },
        tls: { servername: SMTP_HOST }, // cert check against real hostname
      });
    })();

// Startup self-check so problems appear in the logs immediately.
if (BREVO_API_KEY) {
  if (!BREVO_FROM_EMAIL) {
    console.warn('⚠️  BREVO_API_KEY set but no BREVO_FROM_EMAIL/SMTP_USER — sends will fail');
  } else {
    console.log(`📧 Email via Brevo HTTPS API (sender: ${BREVO_FROM_EMAIL})`);
  }
} else {
  transporterPromise.then((t) =>
    t
      .verify()
      .then(() => console.log('📧 SMTP ready'))
      .catch((err) =>
        console.warn('⚠️  SMTP not ready — emails will be skipped:', err.message)
      )
  );
}

async function send({ to, subject, text, html, label }) {
  try {
    if (BREVO_API_KEY) {
      return await sendViaBrevo({ to, subject, text, html, label });
    }
    const transporter = await transporterPromise;
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
    text: `Login to Kete of Knowledge\n\nTap the link below to sign in:\n${link}\n\nThis link expires in 15 minutes. If you didn't request this, you can safely ignore this email.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06)">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a7a5c 0%,#2da87c 100%);padding:32px 24px;text-align:center">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-.3px">Kete of Knowledge</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px 28px">
          <p style="margin:0 0 8px;color:#333;font-size:16px;font-weight:600">Kia ora 👋</p>
          <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.5">Tap the button below to sign in to your account. This link will expire in 15 minutes.</p>
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
            <a href="${link}" style="display:inline-block;background:#1a7a5c;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:10px;font-weight:600;font-size:16px;letter-spacing:.2px">Sign In</a>
          </td></tr></table>
          <p style="margin:24px 0 0;color:#999;font-size:13px;line-height:1.5">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="margin:6px 0 0;word-break:break-all"><a href="${link}" style="color:#1a7a5c;font-size:13px">${link}</a></p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 28px;border-top:1px solid #eee;text-align:center">
          <p style="margin:0;color:#aaa;font-size:12px">If you didn't request this email, you can safely ignore it.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    label: 'Magic link',
  });

export const sendPasswordResetLink = (email, link) =>
  send({
    to: email,
    subject: 'Reset your Kete Admin Password',
    text: `Reset your Kete Admin Password\n\nTap the link below to reset your password:\n${link}\n\nThis link expires in 15 minutes. If you didn't request this, you can safely ignore this email.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06)">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a7a5c 0%,#2da87c 100%);padding:32px 24px;text-align:center">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-.3px">Kete of Knowledge</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px 28px">
          <p style="margin:0 0 8px;color:#333;font-size:16px;font-weight:600">Password Reset</p>
          <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.5">We received a request to reset your admin password. Tap the button below to choose a new one. This link expires in 15 minutes.</p>
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
            <a href="${link}" style="display:inline-block;background:#1a7a5c;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:10px;font-weight:600;font-size:16px;letter-spacing:.2px">Reset Password</a>
          </td></tr></table>
          <p style="margin:24px 0 0;color:#999;font-size:13px;line-height:1.5">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="margin:6px 0 0;word-break:break-all"><a href="${link}" style="color:#1a7a5c;font-size:13px">${link}</a></p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 28px;border-top:1px solid #eee;text-align:center">
          <p style="margin:0;color:#aaa;font-size:12px">If you didn't request this, you can safely ignore this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    label: 'Password reset',
  });
