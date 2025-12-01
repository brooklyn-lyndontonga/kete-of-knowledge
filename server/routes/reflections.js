import { Router } from "express"
import * as C from "../controllers/reflectionsController.js"

const router = Router()

router.get("/", C.index)
router.get("/latest", C.latest)
router.get("/:id", C.show)
router.post("/", C.create)
router.put("/:id", C.update)
router.delete("/:id", C.remove)

export default router
