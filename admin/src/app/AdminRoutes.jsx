import { Routes, Route } from "react-router-dom"

import Login from "../auth/Login"
import ProtectedRoute from "../components/ProtectedRoute"
import AdminLayout from "../layout/AdminLayout"
import AdminHome from "../dashboard/AdminHome"

import ConditionsPage from "../features/conditions/ConditionsPage"
import WhakataukiPage from "../features/whakatauki/WhakataukiPage"
import ResourcesPage from "../features/resources/ResourcesPage"
import SnapshotsPage from "../features/snapshots/SnapshotsPage"

export default function AdminRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="conditions" element={<ConditionsPage />} />
        <Route path="whakatauki" element={<WhakataukiPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="snapshots" element={<SnapshotsPage />} />
      </Route>
    </Routes>
  )
}
    