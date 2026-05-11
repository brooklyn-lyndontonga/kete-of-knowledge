import { PrismaClient } from "@prisma/client"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// In Prisma v7, connection URLs are passed during instantiation
// if not utilizing the newer Accelerate features.
const DB_PATH = process.env.SQLITE_DB_PATH || path.join(__dirname, "database.db")

let prisma

export function getPrisma() {
  if (!prisma) {
    process.env.DATABASE_URL = `file:${DB_PATH}`
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
