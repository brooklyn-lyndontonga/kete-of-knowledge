import { useEffect, useState } from "react"
import CrudTable from "../components/ui/CrudTable"
import CrudModal from "../components/ui/CrudModal"
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal"

import {
  fetchWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
  restoreWhakatauki,
} from "../api/content.api"

export default function WhakataukiPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [showArchived, setShowArchived] = useState(false)

  // Selection & Bulk actions
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [bulkTheme, setBulkTheme] = useState("")

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("")
  const [themeFilter, setThemeFilter] = useState("")

  // CSV Import Modal
  const [csvModalOpen, setCsvModalOpen] = useState(false)
  const [csvText, setCsvText] = useState("")
  const [csvError, setCsvError] = useState("")

  const [activeCount, setActiveCount] = useState(0)
  const [archivedCount, setArchivedCount] = useState(0)

  useEffect(() => {
    loadData()
  }, [showArchived])

  async function loadData() {
    setLoading(true)
    try {
      const [activeData, archivedData] = await Promise.all([
        fetchWhakatauki(false),
        fetchWhakatauki(true),
      ])
      setActiveCount(activeData?.length || 0)
      setArchivedCount(archivedData?.length || 0)
      setRows(showArchived ? (archivedData || []) : (activeData || []))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function reload() {
    const [activeData, archivedData] = await Promise.all([
      fetchWhakatauki(false),
      fetchWhakatauki(true),
    ])
    setActiveCount(activeData?.length || 0)
    setArchivedCount(archivedData?.length || 0)
    setRows(showArchived ? (archivedData || []) : (activeData || []))
  }

  async function handleRestore(row) {
    try {
      await restoreWhakatauki(row.id)
      reload()
    } catch (err) {
      alert("Error restoring: " + err.message)
    }
  }

  // Save new/edited whakataukī
  async function handleSave(data) {
    try {
      if (editing) {
        await updateWhakatauki(editing.id, {
          ...data,
          sort_order: Number(data.sort_order) || 0
        })
      } else {
        await createWhakatauki({
          ...data,
          sort_order: Number(data.sort_order) || 0
        })
      }
      setEditing(null)
      setModalOpen(false)
      reload()
    } catch (err) {
      alert("Error saving: " + err.message)
    }
  }

  // Delete single
  async function handleDelete() {
    try {
      await deleteWhakatauki(deleteId)
      setDeleteId(null)
      reload()
    } catch (err) {
      alert("Error deleting: " + err.message)
    }
  }

  // Inline status toggle switch
  async function handleStatusToggle(row, newStatus) {
    try {
      await updateWhakatauki(row.id, {
        ...row,
        status: newStatus
      })
      // Update state locally first for snappy UX, then reload
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
      )
    } catch (err) {
      alert("Failed to toggle status: " + err.message)
    }
  }

  // --- Bulk Action Handlers ---
  async function handleBulkDelete() {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) return
    setBulkActionLoading(true)
    try {
      await Promise.all(selectedIds.map((id) => deleteWhakatauki(id)))
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
          return updateWhakatauki(id, { ...item, status: newStatus })
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

  async function handleBulkThemeApply(e) {
    e.preventDefault()
    if (!bulkTheme.trim()) return
    setBulkActionLoading(true)
    try {
      await Promise.all(
        selectedIds.map((id) => {
          const item = rows.find((r) => r.id === id)
          return updateWhakatauki(id, { ...item, theme: bulkTheme.trim() })
        })
      )
      setBulkTheme("")
      setSelectedIds([])
      reload()
    } catch (err) {
      alert("Failed to update theme: " + err.message)
    } finally {
      setBulkActionLoading(false)
    }
  }

  // --- CSV Parser & Bulk Import ---
  function handleCsvSubmit(e) {
    e.preventDefault()
    setCsvError("")
    if (!csvText.trim()) return

    try {
      const lines = csvText.split("\n")
      if (lines.length < 2) throw new Error("CSV must contain a header row and at least one data row.")

      // Parse headers
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
      const textIdx = headers.indexOf("text")
      const transIdx = headers.indexOf("translation")
      const themeIdx = headers.indexOf("theme")
      const statusIdx = headers.indexOf("status")
      const orderIdx = headers.indexOf("sort_order")

      if (textIdx === -1) {
        throw new Error("CSV Header must contain a 'text' column.")
      }

      const parsedItems = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        // Basic CSV line splitter (handles optional wrapping in quotes)
        const parts = []
        let currentPart = ""
        let insideQuotes = false
        for (let j = 0; j < line.length; j++) {
          const char = line[j]
          if (char === '"') {
            insideQuotes = !insideQuotes
          } else if (char === "," && !insideQuotes) {
            parts.push(currentPart.trim())
            currentPart = ""
          } else {
            currentPart += char
          }
        }
        parts.push(currentPart.trim())

        const textVal = parts[textIdx]?.replace(/^"|"$/g, "")
        if (!textVal) continue

        parsedItems.push({
          text: textVal,
          translation: transIdx !== -1 ? parts[transIdx]?.replace(/^"|"$/g, "") : "",
          theme: themeIdx !== -1 ? parts[themeIdx]?.replace(/^"|"$/g, "") : "",
          status: statusIdx !== -1 ? parts[statusIdx]?.replace(/^"|"$/g, "") || "draft" : "draft",
          sort_order: orderIdx !== -1 ? Number(parts[orderIdx]) || 0 : 0,
        })
      }

      if (parsedItems.length === 0) {
        throw new Error("No valid rows could be parsed. Check headers and text content.")
      }

      setBulkActionLoading(true)
      // POST all parsed items in parallel
      Promise.all(parsedItems.map((item) => createWhakatauki(item)))
        .then(() => {
          setCsvText("")
          setCsvModalOpen(false)
          reload()
        })
        .catch((err) => {
          setCsvError("Failed to import some rows: " + err.message)
        })
        .finally(() => {
          setBulkActionLoading(false)
        })
    } catch (err) {
      setCsvError(err.message)
    }
  }

  // --- Filtering Logic ---
  const uniqueThemes = Array.from(new Set(rows.map((r) => r.theme).filter(Boolean)))

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.translation?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTheme = !themeFilter || row.theme === themeFilter
    return matchesSearch && matchesTheme
  })

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Whakataukī</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage proverbs, themes, translations, and sorting.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline btn-secondary" onClick={() => setCsvModalOpen(true)}>
            📥 Bulk CSV Import
          </button>
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
      </div>

      {/* Tabs for Active vs Archived */}
      <div className="tabs tabs-boxed mb-4 max-w-xs">
        <button
          className={`tab ${!showArchived ? "tab-active" : ""}`}
          onClick={() => setShowArchived(false)}
        >
          Active Content ({activeCount})
        </button>
        <button
          className={`tab ${showArchived ? "tab-active" : ""}`}
          onClick={() => setShowArchived(true)}
        >
          Archived Content ({archivedCount})
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
        <div className="form-control flex-1">
          <input
            type="text"
            placeholder="Search proverbs or translations..."
            className="input input-bordered w-full rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="form-control min-w-[200px]">
          <select
            className="select select-bordered w-full rounded-xl"
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
          >
            <option value="">All Themes</option>
            {uniqueThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && !showArchived && (
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

            {/* Bulk Edit Theme Inline Form */}
            <form onSubmit={handleBulkThemeApply} className="flex gap-1 items-center">
              <input
                type="text"
                placeholder="New theme..."
                className="input input-xs input-bordered w-32 rounded-lg"
                value={bulkTheme}
                onChange={(e) => setBulkTheme(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-xs btn-outline btn-neutral"
                disabled={bulkActionLoading || !bulkTheme.trim()}
              >
                Apply Theme
              </button>
            </form>

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

      {/* Main Table */}
      <CrudTable
        rows={filteredRows}
        loading={loading}
        selectedIds={selectedIds}
        onSelectionChange={showArchived ? null : setSelectedIds}
        onStatusToggle={showArchived ? null : handleStatusToggle}
        emptyMessage={
          showArchived 
            ? "No archived Whakataukī found."
            : "No active Whakataukī yet. Click + Add Whakataukī to create one or use Bulk CSV Import."
        }
        columns={[
          { key: "text", label: "Whakataukī" },
          { key: "translation", label: "Translation" },
          { key: "theme", label: "Theme" },
          { key: "status", label: "Status" },
          { key: "sort_order", label: "Sort Order" },
        ]}
        onEdit={
          showArchived
            ? null
            : (row) => {
                setEditing(row)
                setModalOpen(true)
              }
        }
        onDelete={showArchived ? null : (row) => setDeleteId(row.id)}
        onRestore={showArchived ? handleRestore : null}
      />

      {/* Edit/Create Modal */}
      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { 
            name: "text", 
            label: "Whakataukī", 
            type: "textarea", 
            required: true,
            helpText: "The Māori proverb text. e.g. 'He kete kōrero'.",
            validationMessage: "Please enter the Māori proverb text."
          },
          { 
            name: "translation", 
            label: "Translation", 
            type: "textarea", 
            required: true,
            helpText: "The English translation of the proverb.",
            validationMessage: "Please enter the English translation."
          },
          { 
            name: "theme", 
            label: "Theme",
            required: true,
            helpText: "Used to group proverbs — e.g. 'Resilience' or 'Whānau'. Keep naming consistent.",
            validationMessage: "Please enter a theme for this proverb."
          },
          { 
            name: "source", 
            label: "Source",
            helpText: "Optional credit for where this quote/translation was sourced from."
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ],
            helpText: "Draft content is only visible in the admin panel; Published content goes live immediately.",
          },
          { 
            name: "sort_order", 
            label: "Sort Order Priority",
            helpText: "Lower numbers appear first in the app list (e.g. 1, 2, 3)."
          },
        ]}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* CSV Import Modal */}
      {csvModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-xl">
            <h3 className="font-bold text-lg mb-2">📥 Bulk CSV Import</h3>
            <p className="text-xs text-base-content/60 mb-4">
              Paste comma-separated values (CSV) below. The first row must be a header containing{" "}
              <span className="font-bold">text</span>, and optionally{" "}
              <span className="font-bold">translation</span>, <span className="font-bold">theme</span>,{" "}
              <span className="font-bold">status</span>, and <span className="font-bold">sort_order</span>.
            </p>

            <form onSubmit={handleCsvSubmit} className="space-y-4">
              <div className="form-control">
                <textarea
                  className="textarea textarea-bordered h-48 font-mono text-xs w-full"
                  placeholder={`text,translation,theme,status,sort_order\n"He kete kai","A food basket","General","published",1\n"He kete kōrero","A basket of words","Knowledge","draft",2`}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  required
                />
              </div>

              {csvError && <p className="text-xs text-error font-medium">{csvError}</p>}

              <div className="modal-action border-t border-base-200 pt-3">
                <button
                  type="button"
                  className="btn btn-ghost rounded-xl"
                  onClick={() => {
                    setCsvText("")
                    setCsvError("")
                    setCsvModalOpen(false)
                  }}
                  disabled={bulkActionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-xl"
                  disabled={bulkActionLoading || !csvText.trim()}
                >
                  {bulkActionLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Import Rows"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setCsvModalOpen(false)}>
            <button>close</button>
          </div>
        </div>
      )}
    </div>
  )
}
