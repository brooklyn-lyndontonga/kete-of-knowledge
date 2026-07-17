import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Auth0ProviderWithConfig from "./auth/auth0-provider"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  </StrictMode>
)
