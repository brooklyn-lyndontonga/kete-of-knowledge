import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = "dev_admin_secret"
const TOKEN_EXPIRY = "7d"

const ADMIN_USER = {
  id: 1,
  email: "admin@kete.nz",
  passwordHash: bcrypt.hashSync("admin123", 10),
  name: "Kete Admin",
}

// POST /api/admin/login
export async function loginAdmin(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" })
  }

  if (email !== ADMIN_USER.email) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const passwordOk = await bcrypt.compare(
    password,
    ADMIN_USER.passwordHash
  )

  if (!passwordOk) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: ADMIN_USER.id, email: ADMIN_USER.email },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  )

  res.json({
    token,
    admin: {
      id: ADMIN_USER.id,
      email: ADMIN_USER.email,
      name: ADMIN_USER.name,
    },
  })
}

// GET /api/admin/me
export async function getAdminMe(req, res) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" })
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    res.json({
      id: decoded.id,
      email: decoded.email,
      name: ADMIN_USER.name,
    })
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}
