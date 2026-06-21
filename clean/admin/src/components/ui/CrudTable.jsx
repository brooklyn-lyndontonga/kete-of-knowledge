import { useState, useEffect } from "react"

export default function CrudTable({
  rows = [],
  columns = [],
  loading = false,
  error = null,
  onEdit,
  onDelete,
  onSelectionChange,
  onStatusToggle,
  selectedIds = [],
  emptyMessage = "",
  onRestore,
}) {
  const [sortField, setSortField] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [role, setRole] = useState("editor")

  // Decode role from JWT token
  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        if (payload && payload.role) {
          setRole(payload.role)
        }
      } catch (err) {
        console.error("Failed to decode token role", err)
      }
    }
  }, [])

  // Clear selections when rows change or are reloaded
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange([])
    }
  }, [rows])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md text-primary"></span>
        <span className="ml-2 text-base-content/60">Loading content…</span>
      </div>
    )
  }

  if (error) {
    return <p className="text-error font-medium p-4 bg-error/10 rounded">{error}</p>
  }

  if (!rows || !Array.isArray(rows) || !rows.length) {
    return (
      <p className="text-base-content/60 py-8 text-center bg-base-100 rounded-lg shadow-sm border border-base-200">
        {emptyMessage || "No records found."}
      </p>
    )
  }

  // Handle header click for sorting
  function handleSort(key) {
    if (sortField === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(key)
      setSortAsc(true)
    }
  }

  // Sort rows client-side
  const sortedRows = [...rows].sort((a, b) => {
    if (!sortField) return 0
    let valA = a[sortField]
    let valB = b[sortField]

    if (valA === null || valA === undefined) valA = ""
    if (valB === null || valB === undefined) valB = ""

    if (typeof valA === "string") valA = valA.toLowerCase()
    if (typeof valB === "string") valB = valB.toLowerCase()

    if (valA < valB) return sortAsc ? -1 : 1
    if (valA > valB) return sortAsc ? 1 : -1
    return 0
  })

  // Checkbox handlers
  const allSelected = rows.length > 0 && selectedIds.length === rows.length
  const someSelected = selectedIds.length > 0 && selectedIds.length < rows.length

  function handleSelectAll(e) {
    if (onSelectionChange) {
      if (e.target.checked) {
        onSelectionChange(rows.map((r) => r.id))
      } else {
        onSelectionChange([])
      }
    }
  }

  function handleSelectRow(id, checked) {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedIds, id])
      } else {
        onSelectionChange(selectedIds.filter((x) => x !== id))
      }
    }
  }

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-200">
      <table className="table table-zebra table-hover w-full">
        <thead className="bg-base-200">
          <tr>
            {role === "admin" && onSelectionChange && (
              <th className="w-12 text-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="cursor-pointer hover:bg-base-300 transition-colors select-none"
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {sortField === col.key && (
                    <span className="text-xs">{sortAsc ? "▲" : "▼"}</span>
                  )}
                </div>
              </th>
            ))}
            {(onEdit || (onDelete && role === "admin") || (onRestore && role === "admin")) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {sortedRows.map((row) => {
            const isSelected = selectedIds.includes(row.id)
            return (
              <tr key={row.id} className={isSelected ? "bg-primary/5" : ""}>
                {role === "admin" && onSelectionChange && (
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "status" ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`badge badge-sm font-semibold capitalize ${
                            row.status === "published"
                              ? "badge-success text-white"
                              : "badge-warning"
                          }`}
                        >
                          {row.status || "draft"}
                        </span>
                        {onStatusToggle && (
                          <input
                            type="checkbox"
                            className="toggle toggle-xs toggle-success"
                            checked={row.status === "published"}
                            onChange={(e) => {
                              const newStatus = e.target.checked ? "published" : "draft"
                              onStatusToggle(row, newStatus)
                            }}
                          />
                        )}
                      </div>
                    ) : col.key === "sort_order" ? (
                      <span className="badge badge-ghost badge-sm">{row.sort_order ?? 0}</span>
                    ) : (
                      formatCell(row[col.key])
                    )}
                  </td>
                ))}

                {(onEdit || (onDelete && role === "admin") || (onRestore && role === "admin")) && (
                  <td>
                    <div className="flex gap-2">
                      {onRestore && role === "admin" && (
                        <button
                          className="btn btn-xs btn-success btn-outline"
                          onClick={() => onRestore(row)}
                        >
                          Restore
                        </button>
                      )}

                      {onEdit && (
                        <button
                          className="btn btn-xs btn-outline btn-neutral"
                          onClick={() => onEdit(row)}
                        >
                          Edit
                        </button>
                      )}

                      {onDelete && role === "admin" && (
                        <button
                          className="btn btn-xs btn-error btn-outline"
                          onClick={() => onDelete(row)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Helper to make values readable
 */
function formatCell(value) {
  if (value === null || value === undefined) return "—"
  if (typeof value === "boolean") return value ? "Yes" : "No"

  // ISO date → readable date
  if (
    typeof value === "string" &&
    value.match(/^\d{4}-\d{2}-\d{2}T/)
  ) {
    return new Date(value).toLocaleDateString()
  }

  // Truncate long texts for table view
  if (typeof value === "string" && value.length > 100) {
    return value.slice(0, 100) + "..."
  }

  return value
}
