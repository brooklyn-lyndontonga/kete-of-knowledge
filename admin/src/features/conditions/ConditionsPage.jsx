/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import CrudTable from '../../../../clean/admin/src/components/ui/CrudTable.jsx'
import CrudModal from '../../../../clean/admin/src/components/ui/CrudModal.jsx'
import DeleteConfirmModal from '../../../../clean/admin/src/components/ui/DeleteConfirmModal.jsx'
import { useAdminToast } from '../../components/AdminToastProvider'

import * as conditionsApi from './conditions.api'

export default function ConditionsPage() {
  const { showToast } = useAdminToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)
        const data = await conditionsApi.fetchConditions({
          signal: controller.signal,
        })
        setRows(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
        showToast(err.message, 'error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
    return () => controller.abort()
  }, [])

  function normalize(formData) {
    return {
      ...formData,
      triggers: formData.triggers
        ? formData.triggers.split(',').map((s) => s.trim())
        : [],
      treatments: formData.treatments
        ? formData.treatments.split(',').map((s) => s.trim())
        : [],
      images: formData.images
        ? formData.images.split(',').map((s) => s.trim())
        : [],
    }
  }

  async function reload() {
    setRows(await conditionsApi.fetchConditions())
  }

  async function handleSave(formData) {
    try {
      const cleaned = normalize(formData)

      if (editing) {
        await conditionsApi.updateCondition(editing.id, cleaned)
        showToast('Condition updated')
      } else {
        await conditionsApi.createCondition(cleaned)
        showToast('Condition created')
      }

      setModalOpen(false)
      setEditing(null)
      await reload()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  async function handleDelete() {
    try {
      await conditionsApi.deleteCondition(deleteId)
      showToast('Condition deleted')
      setDeleteId(null)
      await reload()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Conditions</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Condition
        </button>
      </div>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'summary', label: 'Summary' },
        ]}
        onEdit={(row) => {
          setEditing({
            ...row,
            triggers: row.triggers?.join(', ') || '',
            treatments: row.treatments?.join(', ') || '',
            images: row.images?.join(', ') || '',
          })
          setModalOpen(true)
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'summary', label: 'Summary', type: 'textarea' },
          { name: 'image', label: 'Image Path' },
          { name: 'triggers', label: 'Triggers (comma-separated)' },
          { name: 'treatments', label: 'Treatments (comma-separated)' },
          { name: 'images', label: 'Images (comma-separated)' },
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
