// Minimal request-body validation for admin write routes.
//
// Prevents crashes like `title.slice(0, 30)` throwing a TypeError (→ 500)
// when a required field is missing, and returns a clean 400 instead.
//
// Usage in a route file:
//   import { requireFields } from "../middleware/validate.js"
//   router.post("/", requireFields("title"), createCondition)
//   router.put("/:id", requireFields("title"), updateCondition)

export function requireFields(...fields) {
  return (req, res, next) => {
    const body = req.body || {}

    const missing = fields.filter((field) => {
      const value = body[field]
      return value === undefined || value === null || (typeof value === "string" && !value.trim())
    })

    if (missing.length) {
      return res.status(400).json({
        error: `Missing required field${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`,
      })
    }

    return next()
  }
}
