// src/app/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

// Pages
import AdminHome from "../dashboard/AdminHome"
import ConditionsPage from "../features/conditions/ConditionsPage"
import WhakataukiPage from "../features/whakatauki/WhakataukiPage"
import ResourcesPage from "../features/resources/ResourcesPage"
import SnapshotsPage from "../features/snapshots/SnapshotsPage"

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="whakatauki" element={<WhakataukiPage />} />
        <Route path="conditions" element={<ConditionsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="snapshots" element={<SnapshotsPage />} />
      </Route>
    </Routes>
  )
}
