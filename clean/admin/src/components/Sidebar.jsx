/* eslint-disable no-unused-vars */
export default function Sidebar({ current, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <h2>Kete Admin</h2>

      <nav>
        <button onClick={() => onNavigate("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => onNavigate("whakatauki")}>
          Whakataukī
        </button>

        <button onClick={() => onNavigate("reflectionTemplates")}>
          Reflection Templates
        </button>

        <button onClick={() => onNavigate("profileSeeds")}>
          Profile Seeds
        </button>

        <button onClick={() => onNavigate("learningResources")}>
          Learning Resources
        </button>

        <button onClick={() => onNavigate("conditions")}>
          Conditions
        </button>
      </nav>

      <button className="btn-logout" onClick={onLogout}>
        Log out
      </button>
    </aside>
  )
}
