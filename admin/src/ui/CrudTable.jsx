import React from "react"
import "./CrudTable.css"

export default function CrudTable({
  rows = [],
  columns = [],
  loading,
  error,
  onEdit,
  onDelete,
}) {
  if (loading) return <p className="text-muted">Loading…</p>
  if (error) return <p className="text-error">{error}</p>
  if (!rows.length) return <p className="text-muted">No records found.</p>

  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
          {(onEdit || onDelete) && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((c) => (
              <td key={c.key} className="table-cell--wrap">
                {row[c.key]}
              </td>
            ))}

            {(onEdit || onDelete) && (
              <td className="table-actions">
                {onEdit && (
                  <button
                    className="btn btn-small"
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => onDelete(row)}
                  >
                    Delete
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
