import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchConditions,
  createCondition,
  updateCondition,
  deleteCondition,
  fetchLearningResources,
} from "../api/content.api"

export default function ConditionsPage() {
  const [rows, setRows] = useState([])
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // Selection & Bulk actions
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkActionLoading, setBulkActionLoading] = useState(false)

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("")

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [conditionsData, resourcesData] = await Promise.all([
        fetchConditions().catch(() => []),
        fetchLearningResources().catch(() => []),
      ])
      setRows(conditionsData || [])
      setResources(resourcesData || [])
    } catch (err) {
      setError("Failed to load conditions or learning resources.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function reload() {
    const data = await fetchConditions()
    setRows(data || [])
  }

  async function handleSave(formData) {
    try {
      const payload = {
        ...formData,
        sort_order: Number(formData.sort_order) || 0,
      }

      if (editing) {
        await updateCondition(editing.id, payload)
      } else {
        await createCondition(payload)
      }

      setEditing(null)
      setModalOpen(false)
      reload()
    } catch (err) {
      alert("Failed to save condition: " + err.message)
    }
  }

  async function handleDelete() {
    try {
      await deleteCondition(deleteId)
      setDeleteId(null)
      reload()
    } catch (err) {
      alert("Failed to delete condition: " + err.message)
    }
  }

  async function handleStatusToggle(row, newStatus) {
    try {
      await updateCondition(row.id, {
        ...row,
        status: newStatus,
      })
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
      )
    } catch (err) {
      alert("Failed to toggle status: " + err.message)
    }
  }

  // --- Bulk Action Handlers ---
  async function handleBulkDelete() {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} conditions?`)) return
    setBulkActionLoading(true)
    try {
      await Promise.all(selectedIds.map((id) => deleteCondition(id)))
      setSelectedIds([])
      reload()
    } catch (err) {
      alert("Failed to delete some items: " + err.message)
    } finally {
      setBulkActionLoading(false)
    }
  }

  async function handleBulkStatusChange(newStatus) {
    setBulkActionLoading(true)
    try {
      await Promise.all(
        selectedIds.map((id) => {
          const item = rows.find((r) => r.id === id)
          return updateCondition(id, { ...item, status: newStatus })
        })
      )
      setSelectedIds([])
      reload()
    } catch (err) {
      alert("Failed to update status for some items: " + err.message)
    } finally {
      setBulkActionLoading(false)
    }
  }

  // --- Search Filtering ---
  const filteredRows = rows.filter((row) => {
    return (
      row.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.summary?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Map rows to include matching resources indicator
  const mappedRows = filteredRows.map((row) => {
    const linked = resources.filter(
      (res) =>
        res.title?.toLowerCase().includes(row.title?.toLowerCase()) ||
        res.description?.toLowerCase().includes(row.title?.toLowerCase())
    )
    return {
      ...row,
      linkedCount:
        linked.length > 0 ? (
          <span className="badge badge-accent badge-sm font-semibold text-white">
            {linked.length} linked
          </span>
        ) : (
          "—"
        ),
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conditions</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage medical conditions, descriptions, common triggers, and treatments.
          </p>
        </div>

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

      {/* Search Input */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
        <div className="form-control flex-grow">
          <input
            type="text"
            placeholder="Search by title or summary..."
            className="input input-bordered rounded-xl w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-primary/10 border border-primary/20 p-4 rounded-xl animate-fade-in">
          <div className="text-sm font-semibold text-primary">
            {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="btn btn-xs btn-success text-white"
              onClick={() => handleBulkStatusChange("published")}
              disabled={bulkActionLoading}
            >
              Bulk Publish
            </button>
            <button
              className="btn btn-xs btn-warning text-white"
              onClick={() => handleBulkStatusChange("draft")}
              disabled={bulkActionLoading}
            >
              Bulk Draft
            </button>
            <button
              className="btn btn-xs btn-error btn-outline"
              onClick={handleBulkDelete}
              disabled={bulkActionLoading}
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-error font-medium">{error}</p>}

      {/* Table */}
      <CrudTable
        rows={mappedRows}
        loading={loading}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onStatusToggle={handleStatusToggle}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
          { key: "triggers", label: "Triggers" },
          { key: "treatments", label: "Treatments" },
          { key: "linkedCount", label: "Resources" },
          { key: "status", label: "Status" },
          { key: "sort_order", label: "Sort Order" },
        ]}
        onEdit={(row) => {
          setEditing(row)
          setModalOpen(true)
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      {/* Edit/Create Modal */}
      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "title", label: "Title" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "triggers", label: "Triggers", type: "textarea" },
          { name: "treatments", label: "Treatments", type: "textarea" },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ],
          },
          { name: "sort_order", label: "Sort Order Priority" },
        ]}
        onSave={handleSave}
        onClose={() => {
          setEditing(null)
          setModalOpen(false)
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
