import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"
import AdminLayout from "../layout/AdminLayout"

// Dashboard
import DashboardHome from "../dashboard/AdminHome"

// Features
import WhakataukiPage from "../features/whakatauki/WhakataukiPage"
import ConditionsPage from "../features/conditions/ConditionsPage"
import SymptomsPage from "../features/symptoms/SymptomsPage"
import ResourcesPage from "../features/resources/ResourcesPage"
import ResourceCategoriesPage from "../features/resourceCategories/ResourceCategoriesPage"
import ProfileSeedsPage from "../features/profileSeeds/ProfileSeedsPage"
import ReflectionTemplatesPage from "../features/reflectionTemplates/ReflectionTemplatesPage"
import SnapshotsPage from "../features/snapshots/SnapshotsPage"
import SupportContactsPage from "../features/supportContacts/SupportContactsPage"
import ContactsPage from "../features/contacts/ContactsPage"
import GoalsPage from "../features/goals/GoalsPage"
import MyMedicinesPage from "../features/myMedicines/MyMedicinesPage"
import UserReflectionsPage from "../features/userReflections/UserReflectionsPage"
import HomeContentPage from "../features/homeContent/HomeContentPage"

// Auth / misc
import LoginPage from "../pages/LoginPage"
import SettingsPage from "../pages/SettingsPage"
import ExportPage from "../pages/ExportPage"

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Admin */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<DashboardHome />} />

        {/* Core content */}
        <Route path="whakatauki" element={<WhakataukiPage />} />
        <Route path="conditions" element={<ConditionsPage />} />
        <Route path="symptoms" element={<SymptomsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="resource-categories" element={<ResourceCategoriesPage />} />

        {/* User data */}
        <Route path="profile-seeds" element={<ProfileSeedsPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="medicines" element={<MyMedicinesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="support-contacts" element={<SupportContactsPage />} />
        <Route path="snapshots" element={<SnapshotsPage />} />
        <Route path="user-reflections" element={<UserReflectionsPage />} />

        {/* Templates & config */}
        <Route
          path="reflection-templates"
          element={<ReflectionTemplatesPage />}
        />
        <Route path="home-content" element={<HomeContentPage />} />

        {/* Utilities */}
        <Route path="exports" element={<ExportPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
