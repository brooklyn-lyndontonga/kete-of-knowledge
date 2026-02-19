
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

  // Populate form when opening or editing
  useEffect(() => {
    if (open && initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">{initial ? "Edit" : "Create"}</h3>

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
                <span className="label-text">{f.label}</span>
              </label>

              {f.type === "textarea" ? (
                <textarea
                  className="textarea textarea-bordered h-24"
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                />
              ) : f.type === "select" ? (
                <select
                  className="select select-bordered"
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "file" ? (
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  name={f.name}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {/* 🔹 Custom content (categories, checkboxes, helpers) */}
          {children}

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
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
