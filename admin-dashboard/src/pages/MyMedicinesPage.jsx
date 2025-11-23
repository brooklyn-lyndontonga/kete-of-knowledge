/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import {
  getMyMedicines,
  addMyMedicine,
  updateMyMedicine,
  deleteMyMedicine,
} from "../api/myMedicines"

export default function MyMedicinesPage() {
  const [list, setList] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
  })

  async function load() {
    setList(await getMyMedicines())
  }

  useEffect(() => {
    load()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ name: "", dosage: "", frequency: "" })
    setModal(true)
  }

  const openEdit = (m) => {
    setEditing(m.id)
    setForm(m)
    setModal(true)
  }

  const save = async () => {
    if (editing) {
      await updateMyMedicine(editing, form)
    } else {
      await addMyMedicine(form)
    }
    setModal(false)
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Medicines</h2>

      <button
        onClick={openAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        + Add Medicine
      </button>

      <table className="w-full border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Dosage</th>
            <th className="p-2 border">Frequency</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((m) => (
            <tr key={m.id}>
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.dosage}</td>
              <td className="p-2 border">{m.frequency}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => openEdit(m)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await deleteMyMedicine(m.id)
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
              {editing ? "Edit Medicine" : "Add Medicine"}
            </h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Dosage"
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-4"
              placeholder="Frequency"
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: e.target.value })
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
