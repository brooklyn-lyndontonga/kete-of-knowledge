// server/routes/libraryResources.js
import express from "express"
import {
  getResources,
  addResource,
  removeResource,
} from "../controllers/libraryResourcesController.js"

const router = express.Router()

// GET all resources for a category
router.get("/:categoryId", getResources)

// Add a new library resource
router.post("/", addResource)

// Delete a resource by ID
router.delete("/:id", removeResource)

export default router

