/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"

const API_URL = "http://localhost:3000"

export default function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/whakatauki`)
      .then((r) => r.json())
      .then(setItems)
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>App View</h2>
      <ul>
        {items.map((w) => (
          <li key={w.id}>{w.text}</li>
        ))}
      </ul>
    </div>
  )
}
