import express from "express"
import { getAppWhakatauki } from "../../controllers/app/whakatauki.js"

const router = express.Router()

router.get("/", getAppWhakatauki)

export default router
