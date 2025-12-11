/* eslint-disable no-undef */
// server/server.js
import app from "./app.js"
import cors from "cors"

// ----- CORS (must be BEFORE listen) -----
app.use(
  cors({
    origin: "*", // temporary for development and deployment
  })
)

// ----- SERVER -----
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
