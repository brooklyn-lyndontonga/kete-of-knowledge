// server/routes/userReflections.js
import express from "express";
import {
  listUserReflections,
  createUserReflection,
  deleteUserReflection,
} from "../controllers/userReflectionsController.js";

const router = express.Router();

router.get("/", listUserReflections);
router.post("/", createUserReflection);
router.delete("/:id", deleteUserReflection);

export default router;
