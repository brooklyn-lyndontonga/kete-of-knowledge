/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { resourcesApi } from "../api/resources"
import { libraryCategoriesApi } from "../api/resourceCategories"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function LibraryResourcesPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await resourcesApi.list()
    setItems(data)
  }

  async function loadCategories() {
    const cats = await libraryCategoriesApi.list()
    setCategories(cats)
  }

  useEffect(() => {
    loadItems()
    loadCategories()
  }, [])

  function handleCreate() {
    setSelected(null)
    setModalOpen(true)
  }

  function handleEdit(item) {
    const formatted = {
      ...item,
      tags: item.tags?.join(", ") || "",
    }
    setSelected(formatted)
    setModalOpen(true)
  }

  function handleDelete(item) {
    setSelected(item)
    setDeleteOpen(true)
  }

  async function submitForm(values) {
    const payload = {
      ...values,
      category_id: Number(values.category_id),
      tags: values.tags
        ? values.tags.split(",").map((t) => t.trim())
        : [],
    }

    if (selected) {
      await resourcesApi.update(selected.id, payload)
    } else {
      await resourcesApi.create(payload)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await resourcesApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Library Resources</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Resource
      </button>

      <CrudTable
        items={items}
        fields={["id", "category_id", "title"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Resource" : "New Resource"}
        initialValues={
          selected || {
            category_id: "",
            title: "",
            body: "",
            image: "",
            link: "",
            tags: "",
          }
        }
        fields={[
          {
            name: "category_id",
            label: "Category",
            type: "select",
            options: categories.map((c) => ({
              value: c.id,
              label: c.name,
            })),
          },
          { name: "title", label: "Title", type: "text" },
          { name: "body", label: "Body", type: "textarea" },
          { name: "image", label: "Image URL", type: "text" },
          { name: "link", label: "External Link (optional)", type: "text" },
          {
            name: "tags",
            label: "Tags (comma separated)",
            type: "text",
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
