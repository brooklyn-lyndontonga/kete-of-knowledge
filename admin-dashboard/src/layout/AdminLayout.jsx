import { Link, Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold mb-6">Kete Admin</h1>

        <nav className="space-y-2">
          <Link className="block hover:underline" to="/conditions">Conditions</Link>
          <Link className="block hover:underline" to="/library">Library</Link>
          <Link className="block hover:underline" to="/whakatauki">Whakataukī</Link>
          <Link className="block hover:underline" to="/medicines">Medicines</Link>
          <Link className="block hover:underline" to="/contacts">Contacts</Link>
          <Link className="block hover:underline" to="/goals">Goals</Link>
          <Link className="block hover:underline" to="/symptoms">Symptoms</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
