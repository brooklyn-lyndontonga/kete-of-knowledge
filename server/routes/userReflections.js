import express from "express"
import {
  listUserReflections,
  createUserReflection,
  removeUserReflection,
} from "../controllers/userReflectionsController.js"

const router = express.Router()

router.get("/", listUserReflections)
router.post("/", createUserReflection)
router.delete("/:id", removeUserReflection)

export default router
