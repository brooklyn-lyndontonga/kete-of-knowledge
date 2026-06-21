import { getPrisma } from "../db/prisma.js"
import { logAudit } from "../services/audit.js"

// =======================
// GET ALL
// =======================
export async function getAllWhakatauki(req, res) {
  try {
    const prisma = getPrisma()
    const showArchived = req.query.showArchived === "true"
    const rows = await prisma.whakatauki.findMany({
      where: { archived: showArchived },
      orderBy: [{ sort_order: "asc" }, { id: "asc" }],
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

    const status = req.body.status ?? "draft"
    const sort_order = Number(req.body.sort_order) || 0

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
        status,
        sort_order,
      },
    })

    await logAudit("CREATE", "whakatauki", result.id, `Created whakatauki: "${result.text.slice(0, 30)}..."`, req.admin?.email)

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

    const status = req.body.status ?? "draft"
    const sort_order = req.body.sort_order !== undefined ? Number(req.body.sort_order) : undefined

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
        status,
        sort_order,
      },
    })

    await logAudit("UPDATE", "whakatauki", result.id, `Updated whakatauki: "${result.text.slice(0, 30)}..."`, req.admin?.email)

    res.json(result)
  } catch (err) {
    console.error("❌ updateWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// DELETE (SOFT DELETE)
// =======================
export async function deleteWhakatauki(req, res) {
  try {
    const { id } = req.params
    const prisma = getPrisma()

    const existing = await prisma.whakatauki.findUnique({
      where: { id: Number(id) },
      select: { text: true },
    })

    if (!existing) {
      return res.status(404).json({ error: "Whakatauki not found" })
    }

    await prisma.whakatauki.update({
      where: { id: Number(id) },
      data: { archived: true },
    })

    await logAudit("DELETE", "whakatauki", id, `Archived whakatauki: "${existing.text.slice(0, 30)}..."`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// RESTORE
// =======================
export async function restoreWhakatauki(req, res) {
  try {
    const { id } = req.params
    const prisma = getPrisma()

    const existing = await prisma.whakatauki.findUnique({
      where: { id: Number(id) },
      select: { text: true },
    })

    if (!existing) {
      return res.status(404).json({ error: "Whakatauki not found" })
    }

    await prisma.whakatauki.update({
      where: { id: Number(id) },
      data: { archived: false },
    })

    await logAudit("RESTORE", "whakatauki", id, `Restored whakatauki: "${existing.text.slice(0, 30)}..."`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ restoreWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}
