import { useEffect, useState } from "react"
import { fetchConditions, fetchLearningResources, fetchWhakatauki } from "../api/content.api"
import SnapshotsOverview from "../components/Snapshots"

export default function Dashboard() {
  const [stats, setStats] = useState({
    conditions: 0,
    resources: 0,
    whakatauki: 0
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const [conditions, resources, whakatauki] = await Promise.all([
          fetchConditions(),
          fetchLearningResources(),
          fetchWhakatauki()
        ])
        setStats({
          conditions: conditions?.length || 0,
          resources: resources?.length || 0,
          whakatauki: whakatauki?.length || 0
        })
      } catch (error) {
        console.error("Failed to load dashboard stats", error)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-base-content/60">
          Welcome back. Here&apos;s an overview of your app&apos;s content.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="stats shadow w-full bg-base-100 mb-8">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Conditions</div>
          <div className="stat-value text-primary">{stats.conditions}</div>
          <div className="stat-desc">Manage via Conditions tab</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Resources</div>
          <div className="stat-value text-secondary">{stats.resources}</div>
          <div className="stat-desc">Files and links</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title">Whakatauākī</div>
          <div className="stat-value">{stats.whakatauki}</div>
          <div className="stat-desc">Daily reflections</div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-medium mb-2">Recent Activity</h2>
        <SnapshotsOverview />
      </section>
    </div>
  )
}
