// server/routes/userReflections.js
import express from "express"
import {
  getAllUserReflections,
  getUserReflectionById,
  createUserReflection,
  updateUserReflection,
  deleteUserReflection,
} from "../controllers/userReflectionsController.js"

const router = express.Router()

router.get("/", getAllUserReflections)
router.get("/:id", getUserReflectionById)
router.post("/", createUserReflection)
router.put("/:id", updateUserReflection)
router.delete("/:id", deleteUserReflection)

export default router
