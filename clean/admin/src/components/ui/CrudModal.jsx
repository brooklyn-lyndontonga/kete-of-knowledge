import React, { useEffect, useState } from "react"

export default function CrudModal({
  open,
  initial,
  fields,
  onSave,
  onClose,
  children,
}) {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  // Populate form and clear errors when opening or editing
  useEffect(() => {
    setErrors({})
    if (open && initial) {
      setForm(initial)
    } else if (open) {
      setForm({})
    }
  }, [initial, open])

  if (!open) return null

  function handleChange(e) {
    const { name, value, type, files } = e.target

    // Handle file uploads
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }))
      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }))
      }
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Plain-English validations
    const validationErrors = {}
    fields.forEach((f) => {
      const val = form[f.name]
      if (f.required) {
        if (val === null || val === undefined || (typeof val === "string" && !val.trim())) {
          validationErrors[f.name] = f.validationMessage || `Please add a ${f.label.toLowerCase()} — this is required.`
        }
      }
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    onSave(form)
  }

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-2xl rounded-2xl">
        <h3 className="font-bold text-lg mb-4">{initial ? "Edit Item" : "Create New Item"}</h3>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Standard fields */}
          {fields.map((f) => (
            <div
              key={f.name}
              className={`form-control w-full ${
                f.type === "textarea" ? "col-span-full" : ""
              }`}
            >
              <label className="label">
                <span className="label-text flex items-center gap-1.5 font-semibold text-sm">
                  {f.label}
                  {f.required && <span className="text-error">*</span>}
                  {f.helpText && (
                    <div className="tooltip tooltip-right cursor-help text-left" data-tip={f.helpText}>
                      <span className="badge badge-circle badge-ghost badge-xs text-[10px] w-4 h-4 p-0 font-bold">?</span>
                    </div>
                  )}
                </span>
              </label>

              {f.type === "textarea" ? (
                <textarea
                  className={`textarea textarea-bordered h-24 rounded-xl ${errors[f.name] ? "textarea-error" : ""}`}
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${f.label.toLowerCase()}...`}
                />
              ) : f.type === "select" ? (
                <select
                  className={`select select-bordered rounded-xl ${errors[f.name] ? "select-error" : ""}`}
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Option…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "file" ? (
                <input
                  type="file"
                  className={`file-input file-input-bordered w-full rounded-xl ${errors[f.name] ? "file-input-error" : ""}`}
                  name={f.name}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  className={`input input-bordered w-full rounded-xl ${errors[f.name] ? "input-error" : ""}`}
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${f.label.toLowerCase()}...`}
                />
              )}

              {errors[f.name] && (
                <span className="text-xs text-error mt-1 font-semibold pl-1">{errors[f.name]}</span>
              )}
            </div>
          ))}

          {/* 🔹 Custom content (categories, checkboxes, helpers) */}
          {children}

          {/* Actions */}
          <div className="modal-action border-t border-base-200 pt-4 mt-2">
            <button
              type="button"
              className="btn btn-ghost rounded-xl"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary rounded-xl">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </div>
  )
}
