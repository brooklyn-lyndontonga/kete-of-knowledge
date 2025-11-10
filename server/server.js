/* eslint-disable no-undef */
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB, initTables } from "./db/init.js"
import routes from "./routes/index.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const db = await connectDB()
await initTables(db)

// make db available in routes
app.use((req, res, next) => { req.db = db; next() })
app.use("/api", routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))

export default app


