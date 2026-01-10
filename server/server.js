/* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// // server/server.js
// import app from "./app.js"

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`)
// })

import express, { json } from 'express'
const app = express()

app.use(json())

// ... other route imports
import reflectionTemplatesRoutes from './routes/reflectionTemplates'

app.use('/api/reflection-templates', reflectionTemplatesRoutes)

// error handler, etc.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
