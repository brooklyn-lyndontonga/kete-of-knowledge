import { useAuth } from "../auth/AuthContext"
import AdminRoutes from "./AdminRoutes"
import LoginPage from "../dashboard/AdminHome" // or your login component

export default function AdminApp() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <p>Loading…</p>

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <AdminRoutes />
}
