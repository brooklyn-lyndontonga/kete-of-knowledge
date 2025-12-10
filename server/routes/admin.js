import express from "express"

import reflectionTemplates from "./reflectionTemplates.js"
import conditions from "./conditions.js"
import snapshots from "./snapshots.js"
import resources from "./resources.js"
import resourceCategories from "./resourceCategories.js"
import profileSeeds from "./profileSeeds.js"
import supportContacts from "./supportContacts.js"
import whakatauki from "./whakatauki.js"

// Optional but recommended
import statsController from "../controllers/statsController.js"

const router = express.Router()

// Dashboard Stats
router.get("/stats", statsController.getStats)

// Admin CRUD Routes
router.use("/reflection-templates", reflectionTemplates)
router.use("/conditions", conditions)
router.use("/snapshots", snapshots)
router.use("/resources", resources)
router.use("/resource-categories", resourceCategories)
router.use("/profile-seeds", profileSeeds)
router.use("/support", supportContacts)
router.use("/whakatauki", whakatauki)

export default router
