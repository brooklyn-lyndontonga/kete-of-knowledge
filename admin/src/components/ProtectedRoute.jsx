/* eslint-disable no-undef */
export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()

  if (loading) return null
  if (!admin) return <Navigate to="/login" replace />

  return children
}
