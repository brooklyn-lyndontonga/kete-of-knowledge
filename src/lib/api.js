/* eslint-disable no-undef */
// CONTACTS CRUD
export async function getContacts() {
  return await api("/contacts")
}

export async function addContact(contact) {
  return await api("/contacts", "POST", contact)
}

export async function updateContact(id, updates) {
  return await api(`/contacts/${id}`, "PUT", updates)
}

export async function deleteContact(id) {
  return await api(`/contacts/${id}`, "DELETE")
}
