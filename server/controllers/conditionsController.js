function parseJSONfields(row) {
  return {
    ...row,
    triggers: row.triggers ? JSON.parse(row.triggers) : [],
    treatments: row.treatments ? JSON.parse(row.treatments) : [],
    images: row.images ? JSON.parse(row.images) : []
  }
}

export async function listConditions(req, res) {
  try {
    const db = req.app.get("db")
    const rows = await db.all("SELECT * FROM conditions")
    res.json(rows.map(parseJSONfields))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
