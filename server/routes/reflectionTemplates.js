// server/routes/reflectionTemplates.js
import express from "express";
import {
  listReflectionTemplates,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
} from "../controllers/reflectionTemplatesController.js";

const router = express.Router();

router.get("/", listReflectionTemplates);
router.post("/", createReflectionTemplate);
router.put("/:id", updateReflectionTemplate);
router.delete("/:id", deleteReflectionTemplate);

export default router;
