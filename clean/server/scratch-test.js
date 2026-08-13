import "dotenv/config";
import { getPrisma } from "./db/prisma.js";
import { sendMagicLink } from "./services/email.js";
import { randomBytes } from "crypto";

async function run() {
  console.log("Starting debug script...");
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SQLITE_DB_PATH:", process.env.SQLITE_DB_PATH);

  const email = "test@example.com";
  const token = randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 15 * 60 * 1000;

  try {
    console.log("1. Initializing Prisma...");
    const prisma = getPrisma();
    console.log("Prisma initialized.");

    console.log("2. Deleting old tokens...");
    await prisma.magic_link_tokens.deleteMany({
      where: { email },
    });
    console.log("Deleted old tokens.");

    console.log("3. Creating new token...");
    await prisma.magic_link_tokens.create({
      data: {
        token,
        email,
        expiresAt,
      },
    });
    console.log("Created token successfully.");

    console.log("4. Attempting to send email...");
    const magicLink = `keteofknowledge://auth?token=${token}`;
    await sendMagicLink(email, magicLink);
    console.log("Email sent successfully!");

  } catch (err) {
    console.error("DEBUG EXCEPTION OCCURRED:");
    console.error(err);
  }
}

run();
