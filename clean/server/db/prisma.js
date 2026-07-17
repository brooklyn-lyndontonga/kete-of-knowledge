import { PrismaClient } from "@prisma/client"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const defaultDbPath =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "../data/database.db")
    : fs.existsSync(path.join(__dirname, "database.db"))
    ? path.join(__dirname, "database.db")
    : path.join(__dirname, "../data/database.db")

const DB_PATH = process.env.SQLITE_DB_PATH || defaultDbPath

let prisma

export function getPrisma() {
  if (!prisma) {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    process.env.SQLITE_DATABASE_URL = `file:${DB_PATH}`
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${DB_PATH}`,
        },
      },
    })
    console.log("🔺 Prisma Client Initialized")
  }
  return prisma
}

// Example usage to migrate an existing route:
// const prisma = getPrisma()
// const users = await prisma.app_users.findMany()
