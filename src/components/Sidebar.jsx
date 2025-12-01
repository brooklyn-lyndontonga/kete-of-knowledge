/* eslint-disable react/react-in-jsx-scope */
import { NavLink } from "react-router-dom"

const navItems = [
  { path: "conditions", label: "Conditions" },
  { path: "library", label: "Library" },
  { path: "whakatauki", label: "Whakataukī" },
  { path: "medicines", label: "Medicines" },
  { path: "contacts", label: "Contacts" },
  { path: "goals", label: "Goals" },
  { path: "symptoms", label: "Symptoms" },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-full">
      <div className="p-6 text-xl font-bold">Admin</div>

      <nav className="px-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm transition ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
