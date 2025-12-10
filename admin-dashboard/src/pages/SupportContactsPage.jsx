import React, { useEffect, useState } from 'react'
import CrudTable from '../components/CrudTable'
import CrudModal from '../components/CrudModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { useAdminToast } from '../components/AdminToastProvider'
import * as supportApi from '../api/supportContacts'

export default function SupportContactsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const { showToast } = useAdminToast()

  async function load() {
    try {
      const data = await supportApi.fetchSupportContacts()
      setRows(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ FIXED — SAFE useEffect, NO RETURNING PROMISE
  useEffect(() => {
    async function fetchData() {
      await load()
    }
    fetchData()
  }, [])

  async function handleSave(formData) {
    try {
      if (editing) {
        await supportApi.updateSupport(editing.id, formData)
        showToast('Support contact updated', 'success')
      } else {
        await supportApi.createSupport(formData)
        showToast('Support contact created', 'success')
      }
      setModalOpen(false)
      setEditing(null)
      load()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  async function handleDelete() {
    try {
      await supportApi.deleteSupport(deleteId)
      showToast('Deleted', 'success')
      setDeleteId(null)
      load()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <div className="page-container">
      <h1>Support Contacts</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Support Contact
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'organisation', label: 'Organisation' },
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
          { name: 'name', label: 'Name' },
          { name: 'role', label: 'Role' },
          { name: 'organisation', label: 'Organisation' },
          { name: 'phone', label: 'Phone' },
          { name: 'email', label: 'Email' },
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
