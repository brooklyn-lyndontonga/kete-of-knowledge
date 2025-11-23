/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"
import {
  getResources,
  addResource,
  updateResource,
  deleteResource,
} from "../api/resources"

export default function LibraryPage() {
  const [rows, setRows] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: "",
    type: "",
    content: "",
    category: "",
  })

  async function load() {
    setRows(await getResources())
  }

  useEffect(() => {
    load()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ title: "", type: "", content: "", category: "" })
    setModal(true)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm(row)
    setModal(true)
  }

  const save = async () => {
    if (editing) {
      await updateResource(editing, form)
    } else {
      await addResource(form)
    }
    setModal(false)
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Library Resources</h2>

      <button
        onClick={openAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        + Add Resource
      </button>

      <table className="w-full border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border">{row.title}</td>
              <td className="p-2 border">{row.type}</td>
              <td className="p-2 border">{row.category}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => openEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await deleteResource(row.id)
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

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              {editing ? "Edit Resource" : "Add Resource"}
            </h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Type (PDF, video, guide...)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />

            <textarea
              className="border p-2 w-full mb-2"
              placeholder="Content URL or text"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-4"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setModal(false)}>Cancel</button>
              <button
                onClick={save}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
