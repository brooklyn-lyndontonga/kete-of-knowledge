import { useEffect, useMemo, useState } from "react"
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

  // Inactivity auto-logout (30 minutes of no activity)
  useEffect(() => {
    if (!loggedIn) return

    let timeoutId

    function resetTimer() {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        console.warn("Session timed out due to inactivity.")
        handleLogout()
      }, 30 * 60 * 1000)
    }

    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"]
    events.forEach((evt) => {
      window.addEventListener(evt, resetTimer)
    })

    // Initialize the timer
    resetTimer()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      events.forEach((evt) => {
        window.removeEventListener(evt, resetTimer)
      })
    }
  }, [loggedIn])

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
