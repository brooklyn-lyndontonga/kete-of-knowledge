/* eslint-disable no-unused-vars */
export default function Sidebar({ current, onNavigate, onLogout }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "whakatauki", label: "Whakataukī" },
    { id: "reflectionTemplates", label: "Reflection Templates" },
    { id: "profileSeeds", label: "Profile Seeds" },
    { id: "learningResources", label: "Learning Resources" },
    { id: "conditions", label: "Conditions" },
  ]

  return (
    <aside className="w-64 bg-base-100 shadow-xl flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="p-4 mb-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Kete Admin
          </h2>
        </div>

        <ul className="menu bg-base-100 w-full p-2 rounded-box gap-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={current === item.id ? "active" : ""}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-base-200">
        <button 
          className="btn btn-error btn-outline w-full gap-2" 
          onClick={onLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log out
        </button>
      </div>
    </aside>
  )
}
