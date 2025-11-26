import express from "express";
import {
  getSnapshots,
  getSnapshot,
  getLatest,
  postSnapshot,
  putSnapshot,
  removeSnapshot
} from "../controllers/snapshotsController.js";

const router = express.Router();

// Public
router.get("/", getSnapshots);
router.get("/latest", getLatest);
router.get("/:id", getSnapshot);

// Admin
router.post("/", postSnapshot);
router.put("/:id", putSnapshot);
router.delete("/:id", removeSnapshot);

export default router;
