// server/index.js
import http from "http"
import app from "./app.js"

const PORT = 3000

const server = http.createServer(app)

// 🔑 THIS IS THE CRITICAL CHANGE
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Unified API running at http://0.0.0.0:${PORT}`)
})
