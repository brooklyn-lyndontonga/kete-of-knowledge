import express from "express"
import {
  getAllWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
} from "../controllers/whakatauki.controller.js"

const router = express.Router()

router.get("/", getAllWhakatauki)
router.post("/", createWhakatauki)
router.put("/:id", updateWhakatauki)
router.delete("/:id", deleteWhakatauki)

export default router
