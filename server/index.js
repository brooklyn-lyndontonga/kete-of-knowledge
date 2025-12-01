// server/index.js
import http from "http"
import app from "./app.js"

const PORT = 3000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`🚀 Unified API running at http://localhost:${PORT}`)
})
