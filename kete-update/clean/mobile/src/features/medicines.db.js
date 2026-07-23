import {
  insertRecord,
  listRecords,
  softDeleteRecord,
  updateRecord,
} from "../db/records"

export async function addMedicine({
  name,
  type = "",
  dosage = "",
  notes = "",
}) {
  return insertRecord("medicines", { name, type, dosage, notes, active: 1 })
}

export async function getMedicines() {
  return listRecords("medicines", { orderBy: "active DESC, name ASC" })
}

export async function updateMedicine({
  id,
  name,
  type = "",
  dosage = "",
  notes = "",
}) {
  return updateRecord("medicines", id, { name, type, dosage, notes })
}

export async function toggleMedicine(id, active) {
  return updateRecord("medicines", id, { active: active ? 1 : 0 })
}

export async function deleteMedicine(id) {
  return softDeleteRecord("medicines", id)
}
