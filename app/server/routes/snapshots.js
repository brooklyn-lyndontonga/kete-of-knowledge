import express from "express"
import {
  listSnapshots,
  createSnapshot,
  deleteSnapshot,
} from "../controllers/snapshotsController.js"

const router = express.Router()

router.get("/", listSnapshots)
router.post("/", createSnapshot)
router.delete("/:id", deleteSnapshot)

export default router
