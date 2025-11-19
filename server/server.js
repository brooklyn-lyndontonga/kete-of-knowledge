/* eslint-disable no-undef */
// server/server.js
import "dotenv/config"
import app from "./app.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
