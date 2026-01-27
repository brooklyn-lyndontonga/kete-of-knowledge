export default function LoginPage({ onLogin }) {
  return (
    <div className="login-page">
      <h1>Kete Admin</h1>

      <button
        className="btn btn-primary"
        onClick={onLogin}
      >
        Enter Admin
      </button>
    </div>
  )
}
