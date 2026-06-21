import { getPrisma } from "../db/prisma.js"

/**
 * Log an audit action to the database.
 * @param {string} action - e.g. "CREATE", "UPDATE", "DELETE"
 * @param {string} tableName - e.g. "whakatauki", "conditions"
 * @param {number|string} recordId - The ID of the affected record
 * @param {string} details - Human-readable details about the action
 * @param {string} performedBy - Email of the admin user who performed the action
 */
export async function logAudit(action, tableName, recordId, details, performedBy = "Admin") {
  try {
    const prisma = getPrisma()
    await prisma.audit_logs.create({
      data: {
        action,
        tableName,
        recordId: Number(recordId) || 0,
        details,
        performedBy: performedBy || "Admin",
      },
    })
    console.log(`📝 [Audit Log] ${action} on ${tableName} (ID: ${recordId}): ${details} by ${performedBy}`)
  } catch (err) {
    console.error("❌ Failed to log audit activity:", err)
  }
}
