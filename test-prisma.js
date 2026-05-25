import { getPrisma } from "./clean/server/db/prisma.js";
async function run() {
  try {
    const prisma = getPrisma();
    console.log("🔺 Prisma Client Initialized");
    const whakataukiList = await prisma.whakatauki.findMany();
    console.log("✅ Successfully queried database!");
    console.log(`Count of whakatauki: ${whakataukiList.length}`);
    if (whakataukiList.length > 0) {
      console.log("First whakatauki:", whakataukiList[0]);
    }
  } catch (e) {
    console.error("❌ ERROR running Prisma query:", e.message);
  }
}
run();
