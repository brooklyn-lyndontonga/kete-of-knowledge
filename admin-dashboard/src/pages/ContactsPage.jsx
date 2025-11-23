/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { getContacts, addContact, updateContact, deleteContact } from "../api/contacts"

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: "", phone: "", relationship: "" })

  async function load() {
    setContacts(await getContacts())
  }

  useEffect(() => {
    load()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ name: "", phone: "", relationship: "" })
    setModal(true)
  }

  const openEdit = (c) => {
    setEditing(c.id)
    setForm(c)
    setModal(true)
  }

  const save = async () => {
    if (editing) {
      await updateContact(editing, form)
    } else {
      await addContact(form)
    }
    setModal(false)
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>

      <button
        onClick={openAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        + Add Contact
      </button>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Relationship</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.phone}</td>
              <td className="p-2 border">{c.relationship}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => openEdit(c)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteContact(c.id)
                    load()
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              {editing ? "Edit Contact" : "Add Contact"}
            </h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-4"
              placeholder="Relationship"
              value={form.relationship}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setModal(false)} className="px-4 py-2">
                Cancel
              </button>
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
