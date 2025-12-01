import { Router } from "express"
import * as C from "../controllers/whakataukiController.js"

const router = Router()

router.get("/", C.index)
router.get("/random", C.random)
router.get("/:id", C.show)
router.post("/", C.create)
router.put("/:id", C.update)
router.delete("/:id", C.remove)

export default router
