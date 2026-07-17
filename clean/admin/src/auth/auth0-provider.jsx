import { Auth0Provider } from "@auth0/auth0-react"

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

/**
 * Wraps children with Auth0Provider configured from Vite env vars.
 * Redirect callback lands back at the current origin (the admin panel URL).
 */
export default function Auth0ProviderWithConfig({ children }) {
  if (!domain || !clientId) {
    console.error(
      "❌ Auth0 env vars missing. Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID."
    )
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#e53e3e" }}>
        <h2>Auth0 Configuration Missing</h2>
        <p>
          Set <code>VITE_AUTH0_DOMAIN</code> and{" "}
          <code>VITE_AUTH0_CLIENT_ID</code> in your <code>.env</code> file.
        </p>
      </div>
    )
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(audience ? { audience } : {}),
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  )
}
