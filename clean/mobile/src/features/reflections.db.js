import { insertRecord, listRecords, softDeleteRecord } from "../db/records"

/**
 * Saves a reflection against the day's prompt. `prompt` is stored as free
 * text (so the entry still reads correctly even if the template later
 * changes) and `promptId` keeps a reference back to the template.
 */
export async function addReflection({ prompt = "", promptId = null, response }) {
  return insertRecord("reflections", {
    prompt,
    prompt_id: promptId,
    response,
    logged_at: new Date().toISOString(),
  })
}

/**
 * Live reflections, newest first. Tombstoned rows are excluded by
 * listRecords, so deleted entries don't reappear.
 */
export async function getReflections() {
  return listRecords("reflections", { orderBy: "id DESC" })
}

/**
 * Tombstones the reflection so the delete syncs to the server and any
 * other device, matching every other feature module.
 */
export async function deleteReflection(id) {
  return softDeleteRecord("reflections", id)
}
