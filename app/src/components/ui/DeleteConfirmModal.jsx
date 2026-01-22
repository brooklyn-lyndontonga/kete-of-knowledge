/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
export default function DeleteConfirmModal({ open, title, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-3 text-gray-600">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
