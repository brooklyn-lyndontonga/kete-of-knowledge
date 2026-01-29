import { getDB } from "../db/index.js"

// =======================
// GET ALL
// =======================
export async function getAllWhakatauki(req, res) {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM whakatauki ORDER BY id ASC"
    )
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
        error: "Whakatauki text is required"
      })
    }

    const db = await getDB()

    const result = await db.run(
      `
      INSERT INTO whakatauki (text, translation, theme, source)
      VALUES (?, ?, ?, ?)
      `,
      [
        text.trim(),
        translation?.trim() || null,
        theme,
        source
      ]
    )

    res.status(201).json({
      id: result.lastID,
      text,
      translation,
      theme,
      source
    })
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
        error: "Whakatauki text is required"
      })
    }

    const db = await getDB()

    await db.run(
      `
      UPDATE whakatauki
      SET text = ?, translation = ?, theme = ?, source = ?
      WHERE id = ?
      `,
      [
        text.trim(),
        translation?.trim() || null,
        theme,
        source,
        id
      ]
    )

    res.json({
      id,
      text,
      translation,
      theme,
      source
    })
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
    const db = await getDB()

    await db.run(
      `DELETE FROM whakatauki WHERE id = ?`,
      [id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}
