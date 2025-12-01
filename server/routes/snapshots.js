import express from "express"
import {
  listSnapshots,
  createSnapshot,
  removeSnapshot,
} from "../controllers/snapshotsController.js"

const router = express.Router()

router.get("/", listSnapshots)
router.post("/", createSnapshot)
router.delete("/:id", removeSnapshot)

export default router
