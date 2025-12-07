/* eslint-disable react-hooks/exhaustive-deps */
 
// admin-dashboard/src/pages/LibraryResourcesPage.jsx
import React, { useEffect, useState } from "react"
import AdminTable from "../components/AdminTable"
import "./AdminTable.css"

const API = "http://localhost:3000/admin/resources"
const CAT_API = "http://localhost:3000/admin/resource-categories"

export default function LibraryResourcesPage() {
  const [resources, setResources] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadResources() {
    const res = await fetch(API)
    setResources(await res.json())
  }

  async function loadCategories() {
    const res = await fetch(CAT_API)
    setCategories(await res.json())
  }

  async function reloadAll() {
    setLoading(true)
    await Promise.all([loadResources(), loadCategories()])
    setLoading(false)
  }

  async function addResource(body) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    reloadAll()
  }

  async function updateResource(id, body) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    reloadAll()
  }

  async function deleteResource(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    reloadAll()
  }

  useEffect(() => {
    reloadAll()
  }, [reloadAll])

  return (
    <div className="page-container">
      <h1 className="page-title">Library Resources</h1>

      <AdminTable
        loading={loading}
        columns={[
          { key: "id", label: "ID", width: 60 },
          { key: "category_id", label: "Category ID" },
          { key: "title", label: "Title" },
          { key: "content", label: "Content" },
          { key: "image_url", label: "Image URL" },
        ]}
        data={resources}
        onAdd={addResource}
        onUpdate={updateResource}
        onDelete={deleteResource}
        helpers={{
          categories,
        }}
      />
    </div>
  )
}
