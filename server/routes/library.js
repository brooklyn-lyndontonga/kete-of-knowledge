// server/routes/library.js
import express from "express"
import { searchLibrary } from "../controllers/libraryController.js"

const router = express.Router()

router.get("/search", searchLibrary)

export default router
