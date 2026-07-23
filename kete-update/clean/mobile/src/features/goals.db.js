import {
  insertRecord,
  listRecords,
  softDeleteRecord,
  updateRecord,
} from "../db/records"

export async function addGoal({ title, description = "" }) {
  return insertRecord("goals", { title, description, active: 1 })
}

export async function getGoals() {
  return listRecords("goals", { orderBy: "created_at DESC" })
}

export async function toggleGoal(id, active) {
  return updateRecord("goals", id, { active: active ? 1 : 0 })
}

export async function deleteGoal(id) {
  return softDeleteRecord("goals", id)
}
