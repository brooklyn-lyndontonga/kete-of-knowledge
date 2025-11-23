/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"
import {
  getConditions,
  addCondition,
  updateCondition,
  deleteCondition,
} from "../api/conditions"

export default function ConditionsPage() {
  const [rows, setRows] = useState([])
  const [modal, setModal] = useState(false)
  const [expanded, setExpanded] = useState(null) // condition ID
  const [editing, setEditing] = useState(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
    symptoms: "",
    actions: "",
    risks: "",
    carePlan: "",
    category: "",
  })

  async function load() {
    setRows(await getConditions())
  }

  useEffect(() => {
    load()
  }, [])

  // ------------------------------
  // OPEN / CLOSE ACTIONS
  // ------------------------------
  const openAdd = () => {
    setEditing(null)
    setForm({
      name: "",
      description: "",
      symptoms: "",
      actions: "",
      risks: "",
      carePlan: "",
      category: "",
    })
    setModal(true)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm(row)
    setModal(true)
  }

  const save = async () => {
    if (editing) {
      await updateCondition(editing, form)
    } else {
      await addCondition(form)
    }
    setModal(false)
    load()
  }

  const toggleExpand = (id) =>
    setExpanded(expanded === id ? null : id)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Conditions</h2>

      {/* Add button */}
      <button
        onClick={openAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        + Add Condition
      </button>

      {/* Table */}
      <table className="w-full border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <>
              <tr key={row.id}>
                <td className="p-2 border font-medium">{row.name}</td>
                <td className="p-2 border">{row.category}</td>

                <td className="p-2 border space-x-2">
                  <button
                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                    onClick={() => toggleExpand(row.id)}
                  >
                    {expanded === row.id ? "Close" : "Expand"}
                  </button>

                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => openEdit(row)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={async () => {
                      await deleteCondition(row.id)
                      load()
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>

              {/* Expanded editor */}
              {expanded === row.id && (
                <tr>
                  <td colSpan="3" className="border p-4 bg-gray-50">
                    <ExpandedConditionEditor
                      condition={row}
                      onSave={load}
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {/* MODAL (Add/Edit) */}
      {modal && (
        <Modal
          title={editing ? "Edit Condition" : "Add Condition"}
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">{title}</h3>

        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            className="border p-2 w-full mb-2"
            placeholder={key}
            value={value}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
          />
        ))}

        <div className="flex justify-end space-x-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function ExpandedConditionEditor({ condition, onSave }) {
  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Edit Details</h4>

      <p className="text-sm opacity-70 mb-4">
        Expand this for deeper editing in Phase 2 (nested actions, symptoms, care plans).
      </p>

      <p><strong>Description:</strong> {condition.description}</p>
      <p><strong>Symptoms:</strong> {condition.symptoms}</p>
      <p><strong>Actions:</strong> {condition.actions}</p>
      <p><strong>Risk factors:</strong> {condition.risks}</p>
      <p><strong>Care Plan:</strong> {condition.carePlan}</p>

      <p className="text-xs text-gray-500 mt-2">
        (Later we will add buttons to manage sub-items)
      </p>
    </div>
  )
}
