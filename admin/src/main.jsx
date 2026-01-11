// admin/src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import App from "./App"

// Pages
import LoginPage from "./pages/LoginPage"
import HomeContentPage from "./pages/HomeContentPage"
import SupportContactsPage from "./pages/SupportContactsPage"
import ResourceCategoriesPage from "./pages/ResourceCategoriesPage"
import ResourcesPage from "./pages/ResourcesPage"
import WhakataukiPage from "./pages/WhakataukiPage"
import ConditionsPage from "./pages/ConditionsPage"
import ReflectionTemplatesPage from "./pages/ReflectionTemplatesPage"
import SnapshotsPage from "./pages/SnapshotsPage"
import ProfileSeedsPage from "./pages/ProfileSeedsPage"

// Providers
import { AuthProvider } from "./auth/AuthContext"
import { AdminToastProvider } from "./components/AdminToastProvider"

// Guards
import ProtectedRoute from "./components/ProtectedRoute"

import "./index.css"

const router = createBrowserRouter([
  // -------------------------
  // PUBLIC
  // -------------------------
  {
    path: "/login",
    element: <LoginPage />,
  },

  // -------------------------
  // PROTECTED ADMIN
  // -------------------------
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomeContentPage /> },
      { path: "support-contacts", element: <SupportContactsPage /> },
      { path: "resource-categories", element: <ResourceCategoriesPage /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "whakatauki", element: <WhakataukiPage /> },
      { path: "conditions", element: <ConditionsPage /> },
      { path: "reflection-templates", element: <ReflectionTemplatesPage /> },
      { path: "snapshots", element: <SnapshotsPage /> },
      { path: "profile-seeds", element: <ProfileSeedsPage /> },
      { path: "/exports", element: <ExportsPage />},
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminToastProvider>
        <RouterProvider router={router} />
      </AdminToastProvider>
    </AuthProvider>
  </React.StrictMode>
)
