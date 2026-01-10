// server/routes/admin.js
import express from "express"

import { loginAdmin } from "../controllers/adminAuthController.js"
import { requireAdminAuth } from "../middleware/requireAdminAuth.js"

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
// PUBLIC ADMIN AUTH ROUTE
// =====================
router.post("/auth/login", loginAdmin)

// =====================
// ALL ROUTES BELOW ARE PROTECTED
// =====================
router.use(requireAdminAuth)

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

// Optional: who-am-I check
router.get("/me", (req, res) => {
  res.json({
    message: "Admin authenticated",
    admin: req.admin,
  })
})

export default router
