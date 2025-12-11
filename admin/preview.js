/* eslint-disable no-undef */
import { spawn } from "child_process"

const port = process.env.PORT || 4173

console.log(`Starting preview on port ${port}...`)

const child = spawn(
  "vite",
  ["preview", "--port", port, "--host"],
  {
    stdio: "inherit",   // show logs directly
    shell: true         // needed so Windows/macOS resolves "vite" correctly
  }
)

child.on("close", (code) => {
  console.log(`Preview exited with code ${code}`)
})
