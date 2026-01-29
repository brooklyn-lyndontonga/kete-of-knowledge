import express from "express"
import { getAppProfileSeeds } from "../../controllers/app/profileSeeds.js"

const router = express.Router()

router.get("/", getAppProfileSeeds)

export default router
