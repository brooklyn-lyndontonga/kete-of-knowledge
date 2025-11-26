import express from "express";
import {
  getConditions,
  getCondition,
  postCondition,
  putCondition,
  removeCondition
} from "../controllers/conditionsController.js";

const router = express.Router();

router.get("/", getConditions);
router.get("/:id", getCondition);
router.post("/", postCondition);
router.put("/:id", putCondition);
router.delete("/:id", removeCondition);

export default router;
