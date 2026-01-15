import { api } from "../../../lib/api"

// CONTACTS CRUD
export async function getContacts() {
  return api("/contacts")
}

export async function addContact(contact) {
  return api("/contacts", "POST", contact)
}

export async function updateContact(id, updates) {
  return api(`/contacts/${id}`, "PUT", updates)
}

export async function deleteContact(id) {
  return api(`/contacts/${id}`, "DELETE")
}
