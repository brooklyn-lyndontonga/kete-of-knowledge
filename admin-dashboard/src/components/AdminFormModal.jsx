import React from "react"
import "./AdminFormModal.css"

export default function AdminFormModal({
  open,
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        {fields.map((f) => (
          <div key={f.name} className="form-group">
            <label>{f.label}</label>
            <input
              type="text"
              value={values[f.name] || ""}
              onChange={(e) => onChange(f.name, e.target.value)}
              placeholder={f.placeholder || ""}
            />
          </div>
        ))}

        <div className="modal-actions">
          <button onClick={onSubmit} className="primary">
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
