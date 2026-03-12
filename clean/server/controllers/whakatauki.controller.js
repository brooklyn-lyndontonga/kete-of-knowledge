import { getPrisma } from "../db/prisma.js"

// =======================
// GET ALL
// =======================
export async function getAllWhakatauki(req, res) {
  try {
    const prisma = getPrisma()
    const rows = await prisma.whakatauki.findMany({
      orderBy: { id: "asc" },
    })
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// CREATE
// =======================
export async function createWhakatauki(req, res) {
  try {
    console.log("📦 Incoming body:", req.body)

    // 🔁 Defensive mapping (frontend-proof)
    const text =
      req.body.text ??
      req.body.content ??
      req.body.title ??
      ""

    const translation =
      req.body.translation ??
      req.body.meaning ??
      ""

    const theme =
      req.body.theme ??
      req.body.category ??
      null

    const source =
      req.body.source ??
      null

    // 🛡 Validation (prevents DB crash)
    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Whakatauki text is required",
      })
    }

    const prisma = getPrisma()

    const result = await prisma.whakatauki.create({
      data: {
        text: text.trim(),
        translation: translation?.trim() || null,
        theme,
        source,
      },
    })

    res.status(201).json(result)
  } catch (err) {
    console.error("❌ createWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// UPDATE
// =======================
export async function updateWhakatauki(req, res) {
  try {
    const { id } = req.params

    const text =
      req.body.text ??
      req.body.content ??
      ""

    const translation =
      req.body.translation ??
      req.body.meaning ??
      ""

    const theme =
      req.body.theme ??
      req.body.category ??
      null

    const source =
      req.body.source ??
      null

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Whakatauki text is required",
      })
    }

    const prisma = getPrisma()

    const result = await prisma.whakatauki.update({
      where: { id: Number(id) },
      data: {
        text: text.trim(),
        translation: translation?.trim() || null,
        theme,
        source,
      },
    })

    res.json(result)
  } catch (err) {
    console.error("❌ updateWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// DELETE
// =======================
export async function deleteWhakatauki(req, res) {
  try {
    const { id } = req.params
    const prisma = getPrisma()

    await prisma.whakatauki.delete({
      where: { id: Number(id) },
    })

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}
