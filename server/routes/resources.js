import express from "express";
import {
  getResources,
  getResource,
  postResource,
  putResource,
  removeResource
} from "../controllers/resourcesController.js";

const router = express.Router();

router.get("/", getResources);
router.get("/:id", getResource);
router.post("/", postResource);
router.put("/:id", putResource);
router.delete("/:id", removeResource);

export default router;
