import { useEffect, useState } from "react"
import CrudTable from "../../ui/CrudTable.jsx"
import CrudModal from "../../ui/CrudModal.jsx"
import DeleteConfirmModal from "../../ui/DeleteConfirmModal.jsx"
import { useAdminToast } from "../../components/AdminToastProvider"


import * as supportApi from "./supportContacts.api"

export default function SupportContactsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        const data = await supportApi.fetchSupportContacts({
          signal: controller.signal,
        })
        setRows(data || [])
      } catch (err) {
        if (err.name === "AbortError") return
        setError(err.message)
        showToast(err.message, "error")
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [showToast])

  async function handleSave(formData) {
    try {
      if (editing) {
        await supportApi.updateSupport(editing.id, formData)
        showToast("Support contact updated")
      } else {
        await supportApi.createSupport(formData)
        showToast("Support contact created")
      }

      setEditing(null)
      setModalOpen(false)
      setRows(await supportApi.fetchSupportContacts())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  async function handleDelete() {
    try {
      await supportApi.deleteSupport(deleteId)
      showToast("Support contact deleted")
      setDeleteId(null)
      setRows(await supportApi.fetchSupportContacts())
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Support Contacts</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Support Contact
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "organisation", label: "Organisation" },
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
          { name: "role", label: "Role" },
          { name: "organisation", label: "Organisation" },
          { name: "phone", label: "Phone" },
          { name: "email", label: "Email" },
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
    </>
  )
}
