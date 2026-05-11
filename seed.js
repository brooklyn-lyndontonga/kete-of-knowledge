import bcrypt from "bcryptjs";
import { initDB } from "./clean/server/db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./clean/server/.env" });

async function seed() {
  const db = await initDB();
  const passwordHash = await bcrypt.hash("@administrator1", 10);
  await db.run(
    "INSERT OR IGNORE INTO admin_users (email, password_hash) VALUES (?, ?)",
    "maraea@thecentreforhealth.co.nz",
    passwordHash
  );
  console.log("Seeded!");
}
seed();
