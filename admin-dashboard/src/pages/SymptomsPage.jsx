/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import {
  getSymptoms,
  addSymptom,
  updateSymptom,
  deleteSymptom,
  getSymptomSummary,
} from "../api/symptoms"

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([])
  const [summary, setSummary] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    date: "",
    symptom: "",
    severity: 1,
    notes: "",
  })

  async function load() {
    setSymptoms(await getSymptoms())
    setSummary(await getSymptomSummary())
  }

  useEffect(() => {
    load()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ date: "", symptom: "", severity: 1, notes: "" })
    setModal(true)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm(row)
    setModal(true)
  }

  const save = async () => {
    if (editing) {
      await updateSymptom(editing, form)
    } else {
      await addSymptom(form)
    }
    setModal(false)
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Symptoms</h2>

      <button
        onClick={openAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        + Log Symptom
      </button>

      {/* Summary */}
      <h3 className="text-xl font-bold mb-2">Summary</h3>
      <div className="mb-6 border rounded p-4 bg-white">
        {summary.map((s) => (
          <div key={s.date} className="flex justify-between border-b py-1">
            <span>{s.date}</span>
            <span>{s.count} entries</span>
          </div>
        ))}
      </div>

      {/* Symptoms Table */}
      <table className="w-full border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Symptom</th>
            <th className="p-2 border">Severity</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {symptoms.map((s) => (
            <tr key={s.id}>
              <td className="p-2 border">{s.date}</td>
              <td className="p-2 border">{s.symptom}</td>
              <td className="p-2 border">{s.severity}</td>
              <td className="p-2 border">{s.notes}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => openEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await deleteSymptom(s.id)
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
              {editing ? "Edit Symptom" : "Log Symptom"}
            </h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Symptom"
              value={form.symptom}
              onChange={(e) => setForm({ ...form, symptom: e.target.value })}
            />

            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="Severity (1–10)"
              value={form.severity}
              onChange={(e) =>
                setForm({ ...form, severity: Number(e.target.value) })
              }
            />

            <textarea
              className="border p-2 w-full mb-4"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
