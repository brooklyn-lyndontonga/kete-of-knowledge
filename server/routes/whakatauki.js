import express from "express"
import {
  getWhakatauki,
  addWhakatauki,
  removeWhakatauki,
} from "../controllers/whakataukiController.js"

const router = express.Router()

router.get("/", getWhakatauki)
router.post("/", addWhakatauki)
router.delete("/:id", removeWhakatauki)

export default router
