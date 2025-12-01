import express from "express"
import {
  listSupportContacts,
  createSupportContact,
  editSupportContact,
  removeSupportContact,
} from "../controllers/supportContactsController.js"

const router = express.Router()

router.get("/", listSupportContacts)
router.post("/", createSupportContact)
router.put("/:id", editSupportContact)
router.delete("/:id", removeSupportContact)

export default router
