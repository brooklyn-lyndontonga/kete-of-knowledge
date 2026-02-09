import { getDB, initSchema } from "../db/index.js"

const seedData = {
  whakatauki: [
    {
      text: "Sample whakataukī (replace before launch).",
      translation: "Sample translation placeholder.",
      theme: "Sample theme",
      source: "Internal",
    },
  ],
  reflection_templates: [
    {
      category: "Daily",
      title: "How are you feeling today?",
      prompt:
        "Write a few words about how your body and mind are feeling right now.",
    },
  ],
  profile_seeds: [
    { name: "Goal", value: "Sleep better" },
    { name: "Goal", value: "Move more this week" },
  ],
  learning_resources: [
    {
      title: "Sample resource (replace before launch)",
      description: "Placeholder description to be replaced with real content.",
      type: "link",
      file_path: "https://example.com",
    },
  ],
  conditions: [
    {
      title: "Sample condition (replace before launch)",
      summary: "Placeholder summary for initial testing.",
      triggers: "Placeholder triggers.",
      treatments: "Placeholder treatments.",
    },
  ],
}

async function seedTable(db, table, rows, columns) {
  const existing = await db.get(`SELECT COUNT(*) as count FROM ${table}`)
  if (existing?.count > 0) {
    console.log(`Skip ${table} (already has ${existing.count})`)
    return
  }

  const placeholders = columns.map(() => "?").join(", ")
  const insertSql = `INSERT INTO ${table} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`

  for (const row of rows) {
    const values = columns.map((col) => row[col] ?? null)
    await db.run(insertSql, values)
  }

  console.log(`Seeded ${table} (${rows.length})`)
}

async function run() {
  await initSchema()
  const db = await getDB()

  await seedTable(db, "whakatauki", seedData.whakatauki, [
    "text",
    "translation",
    "theme",
    "source",
  ])

  await seedTable(db, "reflection_templates", seedData.reflection_templates, [
    "category",
    "title",
    "prompt",
  ])

  await seedTable(db, "profile_seeds", seedData.profile_seeds, [
    "name",
    "value",
  ])

  await seedTable(db, "learning_resources", seedData.learning_resources, [
    "title",
    "description",
    "type",
    "file_path",
  ])

  await seedTable(db, "conditions", seedData.conditions, [
    "title",
    "summary",
    "triggers",
    "treatments",
  ])

  console.log("Seed complete.")
}

run().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
