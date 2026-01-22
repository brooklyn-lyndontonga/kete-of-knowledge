import { AuthProvider } from "./auth/AuthContext"
import AdminApp from "./app/AdminApp"
import "./App.css"

export default function App() {
  return (
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  )
}
