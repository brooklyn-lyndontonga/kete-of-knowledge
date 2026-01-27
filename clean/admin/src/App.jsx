import { useState } from "react"
import AdminLayout from "./layouts/AdminLayout"
import LoginPage from "./pages/LoginPage"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true) // TEMP bypass
  const [page, setPage] = useState("dashboard")

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />
  }

  return (
    <AdminLayout
      current={page}
      onNavigate={setPage}
      onLogout={() => setLoggedIn(false)}
    />
  )
}
