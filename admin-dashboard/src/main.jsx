 
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AdminLayout from "./layout/AdminLayout"
import ErrorBoundary from "./components/ErrorBoundary"
import { ToastProvider } from "./components/ui/ToastProvider"

import ConditionsPage from "./pages/ConditionsPage"
import ContactsPage from "./pages/ContactsPage"
import LibraryPage from "./pages/LibraryPage"
import MedicinesPage from "./pages/MedicinesPage"
import WhakataukiPage from "./pages/WhakataukiPage"
import GoalsPage from "./pages/GoalsPage"
import SymptomsPage from "./pages/SymptomsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      // optional dashboard: { index: true, element: <DashboardPage /> },

      { path: "conditions", element: <ConditionsPage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "whakatauki", element: <WhakataukiPage /> },
      { path: "medicines", element: <MedicinesPage /> },
      { path: "contacts", element: <ContactsPage /> },
      { path: "goals", element: <GoalsPage /> },
      { path: "symptoms", element: <SymptomsPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </ErrorBoundary>
)
