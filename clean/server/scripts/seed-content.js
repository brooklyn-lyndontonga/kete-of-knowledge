// clean/server/scripts/seed-content.js — OPTIONAL replacement
//
// Changes vs original:
//   1. Rows are inserted with status: "published" — the app only shows
//      published content, so the original draft-status seeds made a fresh
//      server look empty in the app.
//   2. Realistic bilingual dummy content (the same set used for the
//      screenshots) instead of "replace before launch" placeholders, so the
//      team's beta build has something real-feeling to browse. Kory OK'd
//      dummy content. Replace with real content via the admin panel before
//      store submission — app store reviewers open the app.
//   3. Same skip-if-not-empty behaviour as the original. To re-seed an
//      already-seeded database, clear the tables first (or use the admin
//      panel to add content instead).
//
// NOTE: whakataukī here are traditional/commonly attributed proverbs with
// plain-English translations. Have your te reo reviewer confirm text and
// translations before anything public — same gate as TE_REO_REVIEW_SHEET.md.

import { getDB, initSchema } from "../db/index.js"

const seedData = {
  whakatauki: [
    {
      text: "He oranga ngākau, he pikinga waiora.",
      translation:
        "Positive feelings in your heart will raise your sense of self-worth.",
      theme: "Wellbeing",
      source: "Traditional",
      status: "published",
    },
    {
      text: "Ehara taku toa i te toa takitahi, engari he toa takitini.",
      translation: "My strength is not that of one, but that of many.",
      theme: "Community",
      source: "Traditional",
      status: "published",
    },
    {
      text: "He kai kei aku ringa.",
      translation:
        "There is food at the end of my hands — I can use my abilities to thrive.",
      theme: "Resilience",
      source: "Traditional",
      status: "published",
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
      title: "Looking after your heart",
      description:
        "A plain-language guide to keeping your heart healthy — kai, movement, and knowing your numbers.",
      title_mi: "Te tiaki i tō manawa",
      description_mi: "He aratohu reo māmā mō te tiaki i tō manawa.",
      type: "link",
      file_path: "https://www.heartfoundation.org.nz",
      status: "published",
    },
    {
      title: "Managing your medicines",
      description:
        "How to keep track of what you take, when to take it, and questions to ask your pharmacist.",
      title_mi: "Te whakahaere i ō rongoā",
      description_mi:
        "Me pēhea te aroturuki i ō rongoā me ngā pātai ki tō kaiwhakarite rongoā.",
      type: "link",
      file_path: "https://www.healthify.nz",
      status: "published",
    },
    {
      title: "Healthy kai on a budget",
      description: "Simple, affordable meal ideas for the whole whānau.",
      title_mi: "He kai hauora, he utu iti",
      description_mi:
        "He whakaaro kai māmā, utu iti mō te whānau katoa.",
      type: "link",
      file_path: "https://www.healthify.nz",
      status: "published",
    },
  ],
  conditions: [
    {
      title: "Diabetes (Type 2)",
      summary:
        "A long-term condition where the body struggles to manage blood sugar. It can be managed well with kai choices, movement, and medication.",
      triggers:
        "Sugary drinks and kai, low activity, whānau history, stress.",
      treatments:
        "Healthy kai, regular movement, metformin or other prescribed medicines, regular checks with your nurse or GP.",
      title_mi: "Mate huka",
      summary_mi:
        "He mate roa e uaua ai te whakahaere a te tinana i te huka o te toto.",
      triggers_mi:
        "Ngā inu reka, te kai reka, te kore korikori, te hītori o te whānau.",
      treatments_mi:
        "Kai hauora, korikori tinana, rongoā kua tohua, arotake auau.",
      status: "published",
      sort_order: 1,
    },
    {
      title: "Asthma (Huangō)",
      summary:
        "A condition that makes breathing harder when airways tighten. Most people manage it well with inhalers and a clear action plan.",
      triggers:
        "Cold air, dust, pollen, smoke, colds and flu, exercise without warm-up.",
      treatments:
        "Reliever and preventer inhalers, an asthma action plan, avoiding known triggers.",
      title_mi: "Huangō",
      summary_mi:
        "He mate e uaua ai te ngā i te kūitinga o ngā arahau.",
      triggers_mi: "Te hau makariri, te puehu, te hae pua, te auahi.",
      treatments_mi:
        "Ngā inhaler, he mahere mahi huangō, te karo i ngā take.",
      status: "published",
      sort_order: 2,
    },
    {
      title: "High blood pressure",
      summary:
        "Often has no symptoms but raises the risk of heart attack and stroke. Regular checks and small daily changes make a real difference.",
      triggers:
        "Too much salt, low activity, smoking, stress, whānau history.",
      treatments:
        "Less salt, more movement, prescribed medication, regular blood pressure checks.",
      title_mi: "Pēhanga toto tiketike",
      summary_mi:
        "Kāore he tohu i te nuinga o te wā, engari ka piki te tūraru manawa.",
      triggers_mi:
        "Te tote nui rawa, te kore korikori, te kai paipa, te taumahatanga.",
      treatments_mi:
        "He iti ake te tote, he nui ake te korikori, te rongoā kua tohua.",
      status: "published",
      sort_order: 3,
    },
    {
      title: "Gout",
      summary:
        "A painful form of arthritis, often in the big toe. Very common in Aotearoa and very treatable — you don't have to put up with the pain.",
      triggers:
        "Some kai and drinks (kaimoana, red meat, beer, sugary drinks), dehydration, whānau history.",
      treatments:
        "Daily preventer medicine (allopurinol), pain relief during flares, plenty of water.",
      title_mi: "Kāuti",
      summary_mi:
        "He momo pona mamae, e kitea nuitia ana i Aotearoa, ka taea te rongoā.",
      triggers_mi:
        "Ētahi kai me ngā inu, te matewai, te hītori o te whānau.",
      treatments_mi:
        "He rongoā ārai ia rā, he rongoā mamae i ngā wā ngau.",
      status: "published",
      sort_order: 4,
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
    "status",
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
    "title_mi",
    "description_mi",
    "type",
    "file_path",
    "status",
  ])

  await seedTable(db, "conditions", seedData.conditions, [
    "title",
    "summary",
    "triggers",
    "treatments",
    "title_mi",
    "summary_mi",
    "triggers_mi",
    "treatments_mi",
    "status",
    "sort_order",
  ])

  console.log("Seed complete.")
}

run().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
