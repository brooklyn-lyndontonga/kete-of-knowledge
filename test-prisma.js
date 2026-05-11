import { getPrisma } from "./clean/server/db/prisma.js";
try {
  getPrisma();
  console.log("Success");
} catch (e) {
  console.error("ERROR:", e.message);
}
