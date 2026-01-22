export async function listLibrary(req, res) {
  const db = req.app.get("db")
  const rows = await db.all("SELECT * FROM library_items")
  res.json(rows)
}
