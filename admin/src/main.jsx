import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import AdminRoutes from "./app/AdminRoutes"

// Providers
import { AuthProvider } from "./auth/AuthContext"
import { AdminToastProvider } from "./components/AdminToastProvider"

// Global styles
import "./styles/admin.tokens.css"
import "./styles/admin.base.css"
import "./styles/admin.layout.css"
import "./styles/admin.components.css"
import "./styles/admin.utilities.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminToastProvider>
        <BrowserRouter>
          <AdminRoutes />
        </BrowserRouter>
      </AdminToastProvider>
    </AuthProvider>
  </React.StrictMode>
)
