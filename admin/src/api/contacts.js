import { api } from "./client";

export function fetchUserContacts() {
  return api.get("/user/contacts");
}

export function createUserContact(data) {
  return api.post("/user/contacts", data);
}

export function updateUserContact(id, data) {
  return api.put(`/user/contacts/${id}`, data);
}

export function deleteUserContact(id) {
  return api.delete(`/user/contacts/${id}`);
}
