
export default function CrudTable({
  rows = [],
  columns = [],
  loading = false,
  error = null,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className="text-base-content/60">Loading…</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  if (!rows.length) {
    return <p className="text-base-content/60">No records found.</p>
  }

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra table-hover w-full">
        <thead className="bg-base-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {formatCell(row[col.key])}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="flex gap-2">
                  {onEdit && (
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      className="btn btn-xs btn-error btn-outline"
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
    </div>
  )
}

/**
 * Optional helper to make values readable
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

  return value
}
