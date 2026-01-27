/* eslint-disable no-unused-vars */
import { useState } from "react"
import Sidebar from "../components/Sidebar"

import Dashboard from "../pages/Dashboard"
import WhakataukiPage from "../pages/WhakataukiPage"
import ReflectionTemplatesPage from "../pages/ReflectionTemplatesPage"
import ProfileSeedsPage from "../pages/ProfileSeedsPage"
import LearningResourcesPage from "../pages/LearningResourcesPage"
import ConditionsPage from "../pages/ConditionsPage"

export default function AdminLayout({ current, onNavigate, onLogout }) {
  function renderPage() {
    switch (current) {
      case "whakatauki":
        return <WhakataukiPage />
      case "reflectionTemplates":
        return <ReflectionTemplatesPage />
      case "profileSeeds":
        return <ProfileSeedsPage />
      case "learningResources":
        return <LearningResourcesPage />
      case "conditions":
        return <ConditionsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="admin-layout">
      <Sidebar
        current={current}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="admin-content">
        {renderPage()}
      </main>
    </div>
  )
}
