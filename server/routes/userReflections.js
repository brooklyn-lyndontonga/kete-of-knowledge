import express from "express"
import {
  listUserReflections,
  addUserReflection,
  removeUserReflection,
} from "../controllers/userReflectionsController.js"

const router = express.Router()

router.get("/", listUserReflections)
router.post("/", addUserReflection)
router.delete("/:id", removeUserReflection)

export default router
