import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./AdminLayout.css"

export default function AdminLayout({ children }) {
  const { pathname } = useLocation()

  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/support-contacts", label: "Support Contacts" },
    { path: "/resource-categories", label: "Resource Categories" },
    { path: "/resources", label: "Resources" },
    { path: "/whakatauki", label: "Whakatauki" },
    { path: "/conditions", label: "Conditions" },
    { path: "/reflection-templates", label: "Reflection Templates" },
    { path: "/snapshots", label: "Progress Snapshots" },
    { path: "/profile-seeds", label: "Profile Seeds" },
  ]

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <h1 className="admin-title">Kete Admin</h1>

        <nav>
          {menu.map((m) => (
            <Link
              key={m.path}
              to={m.path}
              className={`admin-link ${pathname === m.path ? "active" : ""}`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">Admin Dashboard</div>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}
