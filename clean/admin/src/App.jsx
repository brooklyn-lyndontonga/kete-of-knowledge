import { useMemo, useState } from "react"
import AdminLayout from "./layouts/AdminLayout"
import LoginPage from "./pages/LoginPage"
import { loginAdmin } from "./api/auth.api"

export default function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("admin_token") || ""
  )
  const [page, setPage] = useState("dashboard")

  const loggedIn = useMemo(() => Boolean(token), [token])

  async function handleLogin(email, password) {
    const data = await loginAdmin(email, password)
    localStorage.setItem("admin_token", data.token)
    setToken(data.token)
  }

  function handleLogout() {
    localStorage.removeItem("admin_token")
    setToken("")
  }

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <AdminLayout
      current={page}
      onNavigate={setPage}
      onLogout={handleLogout}
    />
  )
}
