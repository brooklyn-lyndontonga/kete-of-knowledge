export default function AdminHome() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-grid">
        <div className="card dashboard-stat">
          <div className="dashboard-stat__value">42</div>
          <div className="dashboard-stat__label">Total Users</div>
        </div>

        <div className="card dashboard-stat">
          <div className="dashboard-stat__value">18</div>
          <div className="dashboard-stat__label">Resources</div>
        </div>

        <div className="card dashboard-stat">
          <div className="dashboard-stat__value">9</div>
          <div className="dashboard-stat__label">Conditions</div>
        </div>
      </div>
    </div>
  )
}
