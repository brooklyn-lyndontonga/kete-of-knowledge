import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"

import HomeContentPage from "./pages/HomeContentPage"
import SupportContactsPage from "./pages/SupportContactsPage"
import ResourceCategoriesPage from "./pages/ResourceCategoriesPage"
import ResourcesPage from "./pages/ResourcesPage"
import WhakataukiPage from "./pages/WhakataukiPage"
import ConditionsPage from "./pages/ConditionsPage"
import ReflectionTemplatesPage from "./pages/ReflectionTemplatesPage"
import SnapshotsPage from "./pages/SnapshotsPage"
import ProfileSeedsPage from "./pages/ProfileSeedsPage"

import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeContentPage /> },
      { path: "/support-contacts", element: <SupportContactsPage /> },
      { path: "/resource-categories", element: <ResourceCategoriesPage /> },
      { path: "/resources", element: <ResourcesPage /> },
      { path: "/whakatauki", element: <WhakataukiPage /> },
      { path: "/conditions", element: <ConditionsPage /> },
      { path: "/reflection-templates", element: <ReflectionTemplatesPage /> },
      { path: "/snapshots", element: <SnapshotsPage /> },
      { path: "/profile-seeds", element: <ProfileSeedsPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
