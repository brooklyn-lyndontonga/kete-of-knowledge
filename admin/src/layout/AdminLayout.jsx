import React from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import "./AdminLayout.css"

export default function AdminLayout() {
  const { pathname } = useLocation()

  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/reflection-templates", label: "Reflection Templates" },
    { path: "/snapshots", label: "Progress Snapshots" },
    { path: "/profile-seeds", label: "Profile Seeds" },

    { path: "/resources", label: "Resources" },
    { path: "/resource-categories", label: "Resource Categories" },
    { path: "/conditions", label: "Conditions" },
    { path: "/support-contacts", label: "Support Contacts" },

    { path: "/whakatauki", label: "Whakataukī" },

    { path: "/exports", label: "Exports" },
  ]

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <h1 className="admin-title">Kete Admin</h1>

        <nav>
          {menu.map((m) => {
            const isActive =
              pathname === m.path || pathname.startsWith(m.path + "/")

            return (
              <Link
                key={m.path}
                to={m.path}
                className={`admin-link ${isActive ? "active" : ""}`}
              >
                {m.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">Kete Admin</div>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
