import express from "express"
import {
  listLibraryConditions,
  getLibraryCondition,
} from "../controllers/libraryConditionsController.js"

const router = express.Router()

router.get("/conditions", listLibraryConditions)
router.get("/conditions/:id", getLibraryCondition)

export default router
