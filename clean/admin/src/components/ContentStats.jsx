import { useEffect, useState } from "react"
import {
  fetchWhakatauki,
  fetchReflectionTemplates,
  fetchProfileSeeds,
  fetchConditions,
} from "../api/content.api"

export default function ContentStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchWhakatauki(),
      fetchReflectionTemplates(),
      fetchProfileSeeds(),
      fetchConditions(),
    ]).then(([w, r, p, c]) => {
      setStats({
        whakatauki: w.length,
        templates: r.length,
        seeds: p.length,
        conditions: c.length,
      })
    })
  }, [])

  if (!stats) return <p className="text-muted">Loading content…</p>

  return (
    <div className="card">
      <h2>Content Overview</h2>

      <ul>
        <li>Whakataukī: {stats.whakatauki}</li>
        <li>Reflection prompts: {stats.templates}</li>
        <li>Profiles: {stats.seeds}</li>
        <li>Conditions: {stats.conditions}</li>
      </ul>
    </div>
  )
}
