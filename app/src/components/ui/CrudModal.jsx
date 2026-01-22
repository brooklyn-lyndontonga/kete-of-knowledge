/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
export default function CrudModal({
  open,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel = "Save",
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="space-y-4">{children}</div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
