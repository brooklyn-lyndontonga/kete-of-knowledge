/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { reflectionTemplatesApi } from "../api/reflections"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function ReflectionTemplatesPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await reflectionTemplatesApi.listTemplates()
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
    const payload = {
      ...values,
      order_index: Number(values.order_index) || 0,
    }

    if (selected) {
      await reflectionTemplatesApi.updateTemplate(selected.id, payload)
    } else {
      await reflectionTemplatesApi.createTemplate(payload)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await reflectionTemplatesApi.deleteTemplate(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Reflection Templates</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Template
      </button>

      <CrudTable
        items={items}
        fields={["id", "title", "order_index"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Template" : "New Template"}
        initialValues={
          selected || {
            title: "",
            body: "",
            order_index: 0,
          }
        }
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "body", label: "Body", type: "textarea" },
          { name: "order_index", label: "Display Order", type: "number" },
        ]}
        onSubmit={submitForm}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selected?.title}
      />
    </div>
  )
}
