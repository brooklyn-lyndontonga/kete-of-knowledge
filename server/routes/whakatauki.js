import express from "express"
import {
  listWhakatauki,
  createWhakatauki,
  removeWhakatauki,
} from "../controllers/whakataukiController.js"

const router = express.Router()

router.get("/", listWhakatauki)
router.post("/", createWhakatauki)
router.delete("/:id", removeWhakatauki)

export default router
