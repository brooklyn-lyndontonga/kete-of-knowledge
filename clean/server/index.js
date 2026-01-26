import express from "express"
import { initSchema } from "./db/index.js"

import whakataukiRoutes from "./routes/whakatauki.js"
import reflectionTemplateRoutes from "./routes/reflectionTemplates.js"
import profileSeedRoutes from "./routes/profileSeeds.js"
import conditionRoutes from "./routes/conditions.js"

const app = express()
app.use(express.json())

await initSchema()

app.get("/health", (_, res) => res.json({ ok: true }))

app.use("/whakatauki", whakataukiRoutes)
app.use("/reflection-templates", reflectionTemplateRoutes)
app.use("/profile-seeds", profileSeedRoutes)
app.use("/conditions", conditionRoutes)

app.listen(3000, () => {
  console.log("🧠 Clean server running on http://localhost:3000")
})
