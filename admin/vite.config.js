import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // required for Railway preview
  },
  preview: {
    host: true,
    allowedHosts: [
      "kofk-admin-production.up.railway.app",
      "*.railway.app"
    ],
    port: 4173,
  },
})
