/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { resourcesApi } from "../api/resources"
import { resourceCategoriesApi } from "../api/resourceCategories"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function ResourcesPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadData() {
    const [resources, cats] = await Promise.all([
      resourcesApi.list(),
      resourceCategoriesApi.list(),
    ])

    setItems(resources)
    setCategories(cats)
  }

  useEffect(() => {
    loadData()
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
      await resourcesApi.update(selected.id, values)
    } else {
      await resourcesApi.create(values)
    }

    setModalOpen(false)
    await loadData()
  }

  async function confirmDelete() {
    await resourcesApi.remove(selected.id)
    setDeleteOpen(false)
    await loadData()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Resources</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Resource
      </button>

      <CrudTable
        items={items}
        fields={["id", "title", "subtitle", "category_id"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Resource" : "New Resource"}
        initialValues={
          selected || {
            title: "",
            subtitle: "",
            body: "",
            image: "",
            category_id: "",
          }
        }
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "body", label: "Body", type: "textarea" },
          { name: "image", label: "Image URL", type: "text" },
          {
            name: "category_id",
            label: "Category",
            type: "select",
            options: categories.map((c) => ({
              label: c.name,
              value: c.id,
            })),
          },
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
