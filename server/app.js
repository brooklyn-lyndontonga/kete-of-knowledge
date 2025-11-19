// server/app.js
import express from "express"
import cors from "cors"

// ROUTES
import goalsRouter from "./routes/goals.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test root route
app.get("/", (req, res) => {
  res.send("Kete API is running 🚀")
})

// Mount route for /goals
app.use("/goals", goalsRouter)

export default app
