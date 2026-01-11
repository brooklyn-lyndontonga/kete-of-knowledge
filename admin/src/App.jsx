// admin/src/App.jsx
import React from "react"
import { Outlet } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"

export default function App() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
