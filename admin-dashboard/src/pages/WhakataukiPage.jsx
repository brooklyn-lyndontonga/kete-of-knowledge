/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { whakataukiApi } from "../api/whakatauki"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function WhakataukiPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await whakataukiApi.list()
    setItems(data)
  }

  useEffect(() => {
    loadItems()
  }, [])

  function handleCreate() {
    setSelected(null)
    setModalOpen(true)
  }

  function handleEdit(item) {
    setSelected(item)
    setModalOpen(true)
  }

  function handleDelete(item) {
    setSelected(item)
    setDeleteOpen(true)
  }

  async function submitForm(values) {
    if (selected) {
      await whakataukiApi.update(selected.id, values)
    } else {
      await whakataukiApi.create(values)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await whakataukiApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Whakataukī</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Whakataukī
      </button>

      <CrudTable
        items={items}
        fields={["id", "text", "translation", "author"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Whakataukī" : "New Whakataukī"}
        initialValues={
          selected || {
            text: "",
            translation: "",
            author: "",
          }
        }
        fields={[
          { name: "text", label: "Whakataukī", type: "textarea" },
          { name: "translation", label: "Translation", type: "textarea" },
          { name: "author", label: "Author (optional)", type: "text" },
        ]}
        onSubmit={submitForm}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selected?.text}
      />
    </div>
  )
}
