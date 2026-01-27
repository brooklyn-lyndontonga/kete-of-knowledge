import { useEffect, useState } from 'react'
import CrudTable from '../../../../clean/admin/src/components/ui/CrudTable.jsx'
import CrudModal from '../../../../clean/admin/src/components/ui/CrudModal.jsx'
import DeleteConfirmModal from '../../../../clean/admin/src/components/ui/DeleteConfirmModal.jsx'
import { useAdminToast } from '../../components/AdminToastProvider'

import * as whakataukiApi from './whakatauki.api'

export default function WhakataukiPage() {
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
        const data = await whakataukiApi.fetchWhakatauki({
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

    load()
    return () => controller.abort()
  }, [showToast])

  async function reload() {
    setRows(await whakataukiApi.fetchWhakatauki())
  }

  async function handleSave(formData) {
    try {
      if (editing) {
        await whakataukiApi.updateWhakatauki(editing.id, formData)
        showToast('Whakataukī updated')
      } else {
        await whakataukiApi.createWhakatauki(formData)
        showToast('Whakataukī created')
      }

      setEditing(null)
      setModalOpen(false)
      await reload()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  async function handleDelete() {
    try {
      await whakataukiApi.deleteWhakatauki(deleteId)
      showToast('Whakataukī deleted')
      setDeleteId(null)
      await reload()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <h1>Whakataukī</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          + Add Whakataukī
        </button>
      </div>

      {error && <p className="text-muted">{error}</p>}

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: 'text', label: 'Whakataukī' },
          { key: 'translation', label: 'Translation' },
          { key: 'theme', label: 'Theme' },
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
          { name: 'text', label: 'Whakataukī', type: 'textarea' },
          { name: 'translation', label: 'Translation', type: 'textarea' },
          { name: 'theme', label: 'Theme (optional)' },
          { name: 'source', label: 'Source (optional)' },
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
