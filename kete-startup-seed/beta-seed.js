// clean/server/scripts/beta-seed.js
//
// Ensures the beta dummy content exists and is PUBLISHED. Runs at every
// server startup; each item is inserted only if its title/text isn't
// already present, so it never duplicates and never overwrites edits
// made in the admin panel.
//
// REMOVE the ensureBetaContent() call from index.js (and this file)
// once real content is loaded before store submission.

import { getDB } from "../db/index.js"

const conditions = [
  { title: "Diabetes (Type 2)", summary: "A long-term condition where the body struggles to manage blood sugar. It can be managed well with kai choices, movement, and medication.", triggers: "Sugary drinks and kai, low activity, whānau history, stress.", treatments: "Healthy kai, regular movement, metformin or other prescribed medicines, regular checks with your nurse or GP.", title_mi: "Mate huka", summary_mi: "He mate roa e uaua ai te whakahaere a te tinana i te huka o te toto.", triggers_mi: "Ngā inu reka, te kai reka, te kore korikori, te hītori o te whānau.", treatments_mi: "Kai hauora, korikori tinana, rongoā kua tohua, arotake auau.", sort_order: 1 },
  { title: "Asthma (Huangō)", summary: "A condition that makes breathing harder when airways tighten. Most people manage it well with inhalers and a clear action plan.", triggers: "Cold air, dust, pollen, smoke, colds and flu, exercise without warm-up.", treatments: "Reliever and preventer inhalers, an asthma action plan, avoiding known triggers.", title_mi: "Huangō", summary_mi: "He mate e uaua ai te ngā i te kūitinga o ngā arahau.", triggers_mi: "Te hau makariri, te puehu, te hae pua, te auahi.", treatments_mi: "Ngā inhaler, he mahere mahi huangō, te karo i ngā take.", sort_order: 2 },
  { title: "High blood pressure", summary: "Often has no symptoms but raises the risk of heart attack and stroke. Regular checks and small daily changes make a real difference.", triggers: "Too much salt, low activity, smoking, stress, whānau history.", treatments: "Less salt, more movement, prescribed medication, regular blood pressure checks.", title_mi: "Pēhanga toto tiketike", summary_mi: "Kāore he tohu i te nuinga o te wā, engari ka piki te tūraru manawa.", triggers_mi: "Te tote nui rawa, te kore korikori, te kai paipa, te taumahatanga.", treatments_mi: "He iti ake te tote, he nui ake te korikori, te rongoā kua tohua.", sort_order: 3 },
  { title: "Gout", summary: "A painful form of arthritis, often in the big toe. Very common in Aotearoa and very treatable — you don't have to put up with the pain.", triggers: "Some kai and drinks (kaimoana, red meat, beer, sugary drinks), dehydration, whānau history.", treatments: "Daily preventer medicine (allopurinol), pain relief during flares, plenty of water.", title_mi: "Kāuti", summary_mi: "He momo pona mamae, e kitea nuitia ana i Aotearoa, ka taea te rongoā.", triggers_mi: "Ētahi kai me ngā inu, te matewai, te hītori o te whānau.", treatments_mi: "He rongoā ārai ia rā, he rongoā mamae i ngā wā ngau.", sort_order: 4 },
]

const whakatauki = [
  { text: "He oranga ngākau, he pikinga waiora.", translation: "Positive feelings in your heart will raise your sense of self-worth.", theme: "Wellbeing", source: "Traditional" },
  { text: "Ehara taku toa i te toa takitahi, engari he toa takitini.", translation: "My strength is not that of one, but that of many.", theme: "Community", source: "Traditional" },
  { text: "He kai kei aku ringa.", translation: "There is food at the end of my hands — I can use my abilities to thrive.", theme: "Resilience", source: "Traditional" },
]

const resources = [
  { title: "Looking after your heart", description: "A plain-language guide to keeping your heart healthy — kai, movement, and knowing your numbers.", title_mi: "Te tiaki i tō manawa", description_mi: "He aratohu reo māmā mō te tiaki i tō manawa.", type: "link", file_path: "https://www.heartfoundation.org.nz" },
  { title: "Managing your medicines", description: "How to keep track of what you take, when to take it, and questions to ask your pharmacist.", title_mi: "Te whakahaere i ō rongoā", description_mi: "Me pēhea te aroturuki i ō rongoā me ngā pātai ki tō kaiwhakarite rongoā.", type: "link", file_path: "https://www.healthify.nz" },
  { title: "Healthy kai on a budget", description: "Simple, affordable meal ideas for the whole whānau.", title_mi: "He kai hauora, he utu iti", description_mi: "He whakaaro kai māmā, utu iti mō te whānau katoa.", type: "link", file_path: "https://www.healthify.nz" },
]

export async function ensureBetaContent() {
  const db = await getDB()
  let added = 0

  for (const c of conditions) {
    const existing = await db.get(
      `SELECT id FROM conditions WHERE title = ?`, [c.title]
    )
    if (existing) continue
    await db.run(
      `INSERT INTO conditions
        (title, summary, triggers, treatments,
         title_mi, summary_mi, triggers_mi, treatments_mi,
         status, sort_order, archived)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, 0)`,
      [c.title, c.summary, c.triggers, c.treatments,
       c.title_mi, c.summary_mi, c.triggers_mi, c.treatments_mi, c.sort_order]
    )
    added++
  }

  for (const w of whakatauki) {
    const existing = await db.get(
      `SELECT id FROM whakatauki WHERE text = ?`, [w.text]
    )
    if (existing) continue
    await db.run(
      `INSERT INTO whakatauki (text, translation, theme, source, status, sort_order, archived)
       VALUES (?, ?, ?, ?, 'published', 0, 0)`,
      [w.text, w.translation, w.theme, w.source]
    )
    added++
  }

  for (const r of resources) {
    const existing = await db.get(
      `SELECT id FROM learning_resources WHERE title = ?`, [r.title]
    )
    if (existing) continue
    await db.run(
      `INSERT INTO learning_resources
        (title, description, title_mi, description_mi, type, file_path, status, sort_order, archived)
       VALUES (?, ?, ?, ?, ?, ?, 'published', 0, 0)`,
      [r.title, r.description, r.title_mi, r.description_mi, r.type, r.file_path]
    )
    added++
  }

  if (added > 0) {
    console.log(`🌱 Beta content seeded: ${added} item(s) published`)
  } else {
    console.log("🌱 Beta content already present — nothing to add")
  }
}
