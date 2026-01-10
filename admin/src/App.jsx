// import React from "react"
// import { Outlet } from "react-router-dom"
// import AdminLayout from "./layout/AdminLayout"

// export default function App() {
//   return (
//     <AdminLayout>
//       <Outlet />
//     </AdminLayout>
//   )
// }

// admin/src/App.jsx
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./auth/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import DashboardHome from "./pages/DashboardHome"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardHome />} />
            {/* Add more protected admin pages here if you want */}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
