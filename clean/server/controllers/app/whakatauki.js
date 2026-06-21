import { getPrisma } from "../../db/prisma.js"

// =======================
// APP: GET WHAKATAUKI (READ ONLY)
// =======================
export async function getAppWhakatauki(req, res) {
  try {
    const prisma = getPrisma()

    const rows = await prisma.whakatauki.findMany({
      where: { status: "published" },
      select: {
        id: true,
        text: true,
        translation: true,
        theme: true,
        source: true,
      },
      orderBy: [{ sort_order: "asc" }, { id: "asc" }],
    })

    res.json(rows)
  } catch (err) {
    console.error("❌ App getWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}
