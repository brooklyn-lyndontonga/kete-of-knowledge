import express from "express"

import { getStats } from "../controllers/statsController.js"

import reflectionTemplates from "./reflectionTemplates.js"
import conditions from "./conditions.js"
import snapshots from "./snapshots.js"
import resources from "./resources.js"
import resourceCategories from "./resourceCategories.js"
import profileSeeds from "./profileSeeds.js"
import supportContacts from "./supportContacts.js"
import whakatauki from "./whakatauki.js"

const router = express.Router()

// =====================
// ADMIN DASHBOARD STATS
// =====================
router.get("/stats", getStats)

// =====================
// ADMIN CRUD ROUTES
// =====================
router.use("/reflection-templates", reflectionTemplates)
router.use("/conditions", conditions)
router.use("/snapshots", snapshots)
router.use("/resources", resources)
router.use("/resource-categories", resourceCategories)
router.use("/profile-seeds", profileSeeds)
router.use("/support", supportContacts)
router.use("/whakatauki", whakatauki)

export default router
