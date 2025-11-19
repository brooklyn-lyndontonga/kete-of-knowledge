// server/server.js

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import routes from "./routes/index.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

// Mount all routes
app.use("/", routes)

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})

export default app
