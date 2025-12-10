/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { contactsApi } from "../api/contacts"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function ContactsPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await contactsApi.list()
    setItems(data)
  }

  useEffect(() => {
    loadItems()
  }, [])

  function handleCreate() {
    setSelected(null)
    setModalOpen(true)
  }

  function handleEdit(item) {
    setSelected(item)
    setModalOpen(true)
  }

  function handleDelete(item) {
    setSelected(item)
    setDeleteOpen(true)
  }

  async function submitForm(values) {
    if (selected) {
      await contactsApi.update(selected.id, values)
    } else {
      await contactsApi.create(values)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await contactsApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Contacts</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Contact
      </button>

      <CrudTable
        items={items}
        fields={["id", "name", "role"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Contact" : "New Contact"}
        initialValues={
          selected || {
            name: "",
            phone: "",
            email: "",
            role: "",
          }
        }
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "phone", label: "Phone", type: "text" },
          { name: "email", label: "Email", type: "text" },
          { name: "role", label: "Role/Relation", type: "text" },
        ]}
        onSubmit={submitForm}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selected?.name}
      />
    </div>
  )
}
