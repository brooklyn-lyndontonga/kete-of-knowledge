import express from "express"
import {
  getContacts,
  addContact,
  removeContact,
  editContact,
} from "../controllers/contactsController.js"

const router = express.Router()

router.get("/", getContacts)
router.post("/", addContact)
router.delete("/:id", removeContact)
router.put("/:id", editContact)

export default router
