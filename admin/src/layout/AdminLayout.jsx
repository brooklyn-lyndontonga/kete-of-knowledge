import React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function AdminLayout() {
  const { pathname } = useLocation()

  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/whakatauki", label: "Whakataukī" },
    { path: "/conditions", label: "Conditions" },
    { path: "/resources", label: "Resources" },
    { path: "/snapshots", label: "Snapshots" },
    { path: "/settings", label: "Settings" },
  ]

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h1 className="admin-title">Kete Admin</h1>

        <nav className="admin-nav">
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

      {/* Main content */}
      <main className="admin-main">
        {/* Header (mirrors app ScreenHeader) */}
        <header className="admin-header">
          <span className="admin-header__path">
            {pathname === "/" ? "Dashboard" : pathname.replace("/", "")}
          </span>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
