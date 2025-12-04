import React from "react"
import "./AdminTable.css"

export default function AdminTable({ columns, data, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="empty">
                No items yet.
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}

              {(onEdit || onDelete) && (
                <td className="actions">
                  {onEdit && <button onClick={() => onEdit(row)}>Edit</button>}
                  {onDelete && (
                    <button className="danger" onClick={() => onDelete(row.id)}>
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
