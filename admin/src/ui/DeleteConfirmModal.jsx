import React from "react"

export default function DeleteConfirmModal({
  open,
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div className="modal-backdrop">
      <div className="modal modal--small">
        <h2>Confirm Delete</h2>
        <p>This action cannot be undone.</p>

        <div className="form-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
