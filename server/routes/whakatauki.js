import express from "express";
import {
  getWhakataukiList,
  getWhakataukiItem,
  getWhakataukiRandom,
  postWhakatauki,
  putWhakatauki,
  removeWhakatauki
} from "../controllers/whakataukiController.js";

const router = express.Router();

// Public
router.get("/", getWhakataukiList);
router.get("/random", getWhakataukiRandom);
router.get("/:id", getWhakataukiItem);

// Admin
router.post("/", postWhakatauki);
router.put("/:id", putWhakatauki);
router.delete("/:id", removeWhakatauki);

export default router;
