/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

const API_URL = "http://localhost:3000"

function App() {
  const [items, setItems] = useState([])
  const [text, setText] = useState("")

  async function load() {
    const res = await fetch(`${API_URL}/whakatauki`)
    setItems(await res.json())
  }

  async function create() {
    await fetch(`${API_URL}/whakatauki`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        translation: "",
        explanation: "",
      }),
    })
    setText("")
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Clean Admin – Whakatauki</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Whakatauki"
      />
      <button onClick={create}>Save</button>

      <ul>
        {items.map((w) => (
          <li key={w.id}>{w.text}</li>
        ))}
      </ul>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
