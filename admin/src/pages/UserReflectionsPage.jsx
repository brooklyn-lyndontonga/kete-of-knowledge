import React, { useEffect, useState } from "react"
import CrudTable from "../components/CrudTable"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { useAdminToast } from "../components/AdminToastProvider"
import * as reflectionsApi from "../api/reflections"

export default function UserReflectionsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    try {
      const data = await reflectionsApi.fetchUserReflections()
      setRows(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => load(), [])

  async function handleDelete() {
    try {
      await reflectionsApi.deleteUserReflection(deleteId)
      showToast("Deleted")
      setDeleteId(null)
      load()
    } catch (err) {
      showToast(err.message, "error")
    }
  }

  return (
    <div className="page-container">
      <h1>User Reflections</h1>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "userId", label: "User ID" },
          { key: "templateId", label: "Template ID" },
          { key: "content", label: "Content" },
        ]}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
