export default function CrudTable({ columns = [], rows = [], onEdit, onDelete }) {
  return (
    <div className="bg-white border rounded shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left p-3 font-medium text-gray-600">
                {col.label}
              </th>
            ))}

            <th className="text-right p-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="p-6 text-center text-gray-500">
                No data found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}

                <td className="p-3 text-right space-x-2">
                  <button className="text-indigo-600" onClick={() => onEdit(row)}>
                    Edit
                  </button>
                  <button className="text-red-600" onClick={() => onDelete(row)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
