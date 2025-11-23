import { request } from "./client"

export const getContacts = () => request("/contacts")
export const addContact = (data) => request("/contacts", "POST", data)
export const updateContact = (id, data) =>
  request(`/contacts/${id}`, "PUT", data)
export const deleteContact = (id) => request(`/contacts/${id}`, "DELETE")
