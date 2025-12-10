import React from "react"

export default function AdminModal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          maxWidth: "90vw",
        }}
      >
        {children}

        <button
          onClick={onClose}
          style={{ marginTop: "20px", width: "100%" }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
