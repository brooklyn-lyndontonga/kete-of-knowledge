import React from "react"
import { useAdminToast } from "../components/AdminToastProvider"

export default function SettingsPage() {
  const { showToast } = useAdminToast()

  function handleTestToast() {
    showToast("Settings saved!")
  }

  return (
    <div className="page-container">
      <h1>Settings</h1>

      <button className="btn-primary" onClick={handleTestToast}>
        Test Toast
      </button>

      <p>Admin settings will go here…</p>
    </div>
  )
}
