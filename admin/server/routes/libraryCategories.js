import { Router } from "express"
import * as Library from "../controllers/libraryController.js"

const router = Router()

router.get("/", Library.index)
router.get("/:id", Library.show)
router.post("/", Library.create)
router.put("/:id", Library.update)
router.delete("/:id", Library.remove)

export default router
