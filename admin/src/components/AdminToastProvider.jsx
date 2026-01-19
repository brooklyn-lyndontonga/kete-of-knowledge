/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react"
import "./AdminToastProvider.css"

const ToastContext = createContext()

export function AdminToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function showToast(message, type = "success") {
    const id = Date.now()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useAdminToast() {
  return useContext(ToastContext)
}
