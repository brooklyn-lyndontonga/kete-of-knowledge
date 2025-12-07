// READ
export async function listConditions(req, res) {
  const db = req.app.get("db");
  try {
    const rows = await db.all("SELECT * FROM conditions");

    const parsed = rows.map((c) => ({
      ...c,
      triggers: c.triggers ? JSON.parse(c.triggers) : [],
      treatments: c.treatments ? JSON.parse(c.treatments) : [],
      images: c.images ? JSON.parse(c.images) : [],
    }));

    res.json(parsed);
  } catch {
    res.status(500).json({ error: "Failed to fetch conditions" });
  }
}

// CREATE
export async function createCondition(req, res) {
  const db = req.app.get("db");
  const { name, description, triggers, treatments, images } = req.body;

  try {
    const result = await db.run(
      `INSERT INTO conditions (name, description, triggers, treatments, images)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        description,
        JSON.stringify(triggers || []),
        JSON.stringify(treatments || []),
        JSON.stringify(images || []),
      ]
    );

    res.json({ id: result.lastID });
  } catch {
    res.status(500).json({ error: "Failed to create condition" });
  }
}
