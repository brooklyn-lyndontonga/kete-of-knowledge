/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useAuthContext } from "../auth/auth-context"
import Sidebar from "../components/Sidebar"
import HelpDrawer from "../components/HelpDrawer"

import Dashboard from "../pages/Dashboard"
import WhakataukiPage from "../pages/WhakataukiPage"
import ReflectionTemplatesPage from "../pages/ReflectionTemplatesPage"
import ProfileSeedsPage from "../pages/ProfileSeedsPage"
import LearningResourcesPage from "../pages/LearningResourcesPage"
import ConditionsPage from "../pages/ConditionsPage"

export default function AdminLayout({ current, onNavigate }) {
  const { logout } = useAuthContext()
  const [helpOpen, setHelpOpen] = useState(false)

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
        return <Dashboard onNavigate={onNavigate} />
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-base-200">
      <Sidebar
        current={current}
        onNavigate={onNavigate}
        onLogout={logout}
        onHelpClick={() => setHelpOpen(true)}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          {renderPage()}
        </div>
      </main>

      <HelpDrawer
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
    </div>
  )
}
