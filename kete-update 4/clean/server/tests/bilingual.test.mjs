import path from "path"
import os from "os"
import fs from "fs"

const DB_PATH = path.join(os.tmpdir(), "bilingual-test.db")

process.env.SQLITE_DB_PATH = DB_PATH
process.env.APP_JWT_SECRET = "t"
process.env.ADMIN_JWT_SECRET = "t"

for (const suffix of ["", "-wal", "-shm"]) {
  try {
    fs.unlinkSync(DB_PATH + suffix)
  } catch {
    // no previous run to clean up
  }
}

const { initSchema, getDB } = await import("../db/index.js")
await initSchema()
const db = await getDB()

const { createCondition, updateCondition } = await import("../controllers/conditions.controller.js")
const { getAppConditions } = await import("../controllers/app/conditions.js")
const { createLearningResource } = await import("../controllers/learningResources.controller.js")
const { getAppLearningResources } = await import("../controllers/app/learningResources.js")

function mockRes() { return { statusCode:200, body:null, status(c){this.statusCode=c;return this}, json(b){this.body=b;return this} } }

let res = mockRes()
await createCondition({ body: {
  title: "Atrial fibrillation", summary: "An irregular heartbeat.",
  triggers: "Stress, alcohol.", treatments: "Medicines, lifestyle.",
  title_mi: "Kōripiripi manawa", summary_mi: "He manawa tāwhaowhao.",
  triggers_mi: "Te taumaha, te waipiro.", treatments_mi: "Ngā rongoā.",
  status: "published", sort_order: 1,
}, admin:{email:"t"} }, res)
console.log("create condition:", res.statusCode)

const row = await db.get("SELECT * FROM conditions WHERE title='Atrial fibrillation'")
console.log("✅ te reo stored on create:", row.title_mi === "Kōripiripi manawa" && row.treatments_mi === "Ngā rongoā.")

res = mockRes()
await updateCondition({ params:{id:row.id}, body: {
  title: "Atrial fibrillation", summary: "An irregular heartbeat.",
  triggers: "Stress.", treatments: "Medicines.",
  title_mi: "Kōripiripi manawa (updated)", summary_mi: "He manawa tāwhaowhao.",
  triggers_mi: "Te taumaha.", treatments_mi: "Ngā rongoā katoa.",
  status: "published", sort_order: 1,
}, admin:{email:"t"} }, res)
const updated = await db.get("SELECT * FROM conditions WHERE id=?", [row.id])
console.log("✅ te reo stored on update:", updated.title_mi.includes("updated") && updated.treatments_mi === "Ngā rongoā katoa.")

res = mockRes()
await getAppConditions({}, res)
const appRow = res.body[0]
console.log("✅ app endpoint returns te reo:", Boolean(appRow.title_mi && appRow.summary_mi && appRow.triggers_mi && appRow.treatments_mi))

res = mockRes()
await createLearningResource({ body: {
  title: "Looking after your heart", description: "A short guide.",
  title_mi: "Te tiaki i tō manawa", description_mi: "He aratohu poto.",
  type: "link", file_path: "https://example.com", status: "published", categories: ["learn"],
}, admin:{email:"t"} }, res)
const lr = await db.get("SELECT * FROM learning_resources WHERE title='Looking after your heart'")
console.log("✅ resource te reo stored:", lr.title_mi === "Te tiaki i tō manawa" && lr.description_mi === "He aratohu poto.")

res = mockRes()
await getAppLearningResources({}, res)
console.log("✅ app resources return te reo:", Boolean(res.body[0].title_mi))

// English-only content must still work (fallback case)
res = mockRes()
await createCondition({ body: { title: "Heart failure", summary: "English only.", status:"published" }, admin:{email:"t"} }, res)
const eo = await db.get("SELECT * FROM conditions WHERE title='Heart failure'")
console.log("✅ English-only content still saves:", eo.title === "Heart failure" && eo.title_mi === null)

process.exit(0)
