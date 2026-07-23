import { Router } from "express"
import { requireAppAuth } from "../../middleware/appAuth.js"
import { syncUserData, deleteUserData } from "../../controllers/app/sync.js"

const router = Router()

router.use(requireAppAuth)
router.post("/", syncUserData)
router.delete("/", deleteUserData)

export default router
