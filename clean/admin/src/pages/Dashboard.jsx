import SnapshotsOverview from "../components/Snapshots"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted">
          Overview of app content and recent activity.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-medium mb-2">Recent Activity</h2>
        <SnapshotsOverview />
      </section>
    </div>
  )
}
