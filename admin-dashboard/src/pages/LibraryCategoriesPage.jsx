/* eslint-disable react-hooks/set-state-in-effect */
// admin-dashboard/src/pages/LibraryCategoriesPage.jsx
import React, { useEffect, useState } from "react"
import AdminTable from "../components/AdminTable"
import "./AdminTable.css"

const API = "http://localhost:3000/admin/resource-categories"

export default function LibraryCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadCategories() {
    setLoading(true)
    const res = await fetch(API)
    const data = await res.json()
    setCategories(data)
    setLoading(false)
  }

  async function addCategory(body) {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadCategories()
  }

  async function updateCategory(id, body) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    loadCategories()
  }

  async function deleteCategory(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    loadCategories()
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Library Categories</h1>

      <AdminTable
        loading={loading}
        columns={[
          { key: "id", label: "ID", width: 60 },
          { key: "name", label: "Category Name" },
          { key: "icon", label: "Icon" },
        ]}
        data={categories}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
      />
    </div>
  )
}
