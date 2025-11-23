/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import {
  getWhakatauki,
  addWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
} from "../api/whakatauki"

export default function WhakataukiPage() {
  const [rows, setRows] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const [form, setForm] = useState({
    text: "",
    translation: "",
    theme: "",
  })

  async function load() {
    setRows(await getWhakatauki())
  }

  useEffect(() => {
    load()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ text: "", translation: "", theme: "" })
    setModal(true)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm(row)
    setModal(true)
  }

  const save = async () => {
    if (editing) {
      await updateWhakatauki(editing, form)
    } else {
      await addWhakatauki(form)
    }
    setModal(false)
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Whakataukī</h2>

      <button
        onClick={openAdd}
        className="px-4 py-2 bg-green-600 text-white rounded mb-4"
      >
        + Add Whakataukī
      </button>

      <table className="w-full border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Māori Text</th>
            <th className="border p-2">English</th>
            <th className="border p-2">Theme</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border p-2 font-medium">{row.text}</td>
              <td className="border p-2">{row.translation}</td>
              <td className="border p-2">{row.theme}</td>

              <td className="border p-2 space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => openEdit(row)}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await deleteWhakatauki(row.id)
                    load()
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <Modal
          title={editing ? "Edit Whakataukī" : "Add Whakataukī"}
          form={form}
          setForm={setForm}
          onClose={() => setModal(false)}
          onSave={save}
        />
      )}
    </div>
  )
}

function Modal({ title, form, setForm, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-xl font-bold mb-4">{title}</h3>

        <textarea
          className="border p-2 w-full mb-2 h-20"
          placeholder="Māori Text"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-2 h-20"
          placeholder="English Translation"
          value={form.translation}
          onChange={(e) =>
            setForm({ ...form, translation: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Theme (optional)"
          value={form.theme}
          onChange={(e) =>
            setForm({ ...form, theme: e.target.value })
          }
        />

        <div className="flex justify-end space-x-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
