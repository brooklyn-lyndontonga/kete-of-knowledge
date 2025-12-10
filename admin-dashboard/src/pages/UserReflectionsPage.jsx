/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { userReflectionsApi } from "../api/reflections"
import CrudTable from "../components/CrudTable"

export default function UserReflectionsPage() {
  const [items, setItems] = useState([])

  async function loadItems() {
    const data = await userReflectionsApi.list()
    setItems(data)
  }

  useEffect(() => {
    loadItems()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">User Reflections (Read Only)</h1>

      <CrudTable
        items={items}
        fields={["id", "user_id", "template_id", "created_at"]}
        readOnly
      />
    </div>
  )
}
