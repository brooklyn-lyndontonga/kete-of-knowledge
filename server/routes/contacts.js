import express from "express"
import {
  listContacts,
  createContact,
  removeContact,
} from "../controllers/contactsController.js"

const router = express.Router()

router.get("/", listContacts)
router.post("/", createContact)
router.delete("/:id", removeContact)

export default router
