import express from "express"
import {
  loginAdmin,
  getAdminMe,
} from "../controllers/adminAuthController.js"

const router = express.Router()

// POST /api/admin/login
router.post("/login", loginAdmin)

// GET /api/admin/me
router.get("/me", getAdminMe)

export default router
