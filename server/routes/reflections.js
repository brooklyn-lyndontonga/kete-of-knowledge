import express from "express";
import {
  getReflections,
  getReflection,
  getLatest,
  postReflection,
  putReflection,
  removeReflection
} from "../controllers/reflectionsController.js";

const router = express.Router();

// public for app
router.get("/", getReflections);
router.get("/latest", getLatest);
router.get("/:id", getReflection);

// admin CRUD
router.post("/", postReflection);
router.put("/:id", putReflection);
router.delete("/:id", removeReflection);

export default router;
