// admin/server/routes/adminAuth.js
import express from "express"
import {
  loginAdmin,
  getAdminMe,
} from "../controllers/adminAuth.controller.js"

const router = express.Router()

router.post("/login", loginAdmin)
router.get("/me", getAdminMe)

export default router
