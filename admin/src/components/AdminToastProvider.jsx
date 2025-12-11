/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

const AdminToastContext = createContext()

export function AdminToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function showToast(message, type = "success") {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
    <AdminToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded text-white shadow ${
              t.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </AdminToastContext.Provider>
  )
}

export function useAdminToast() {
  return useContext(AdminToastContext)
}
