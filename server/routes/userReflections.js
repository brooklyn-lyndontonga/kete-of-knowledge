// server/routes/userReflections.js
import express from "express"
import {
  listUserEntries,
  createUserEntry,
  removeUserEntry
} from "../controllers/userReflectionsController.js"

const router = express.Router()

router.get("/", listUserEntries)
router.post("/", createUserEntry)
router.delete("/:id", removeUserEntry)

export default router
