import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from '../components/AdminToastProvider'
import * as contactsApi from "../api/contacts"

export default function ContactsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    try {
      const data = await contactsApi.fetchContacts()
      setRows(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => load(), [])

  async function handleSave(formData) {
    try {
      if (editing) {
        await contactsApi.updateContact(editing.id, formData)
        showToast("Contact updated")
      } else {
        await contactsApi.createContact(formData)
        showToast("Contact created")
      }

      setModalOpen(false)
      setEditing(null)
      load()
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await contactsApi.deleteContact(deleteId)
      showToast("Deleted")
      setDeleteId(null)
      load()
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <div className="page-container">
      <h1>Contacts</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Contact
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "relationship", label: "Relationship" },
          { key: "phone", label: "Phone" },
        ]}
        onEdit={(row) => {
          setEditing(row)
          setModalOpen(true)
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "name", label: "Name" },
          { name: "relationship", label: "Relationship" },
          { name: "phone", label: "Phone" },
          { name: "notes", label: "Notes", type: "textarea" },
        ]}
        onSave={handleSave}
        onClose={() => {
          setEditing(null)
          setModalOpen(false)
        }}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
