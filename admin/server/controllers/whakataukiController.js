import {
  getAllWhakatauki,
  getDailyWhakatauki,
} from "../../../shared/models/whakataukiModel.js"

export async function listWhakatauki(req, res) {
  try {
    console.log("🧪 listWhakatauki hit")

    const data = await getAllWhakatauki()

    console.log("🧪 data from model:", data)

    res.json(data)
  } catch (err) {
    console.error("❌ Controller error (listWhakatauki):", err)
    res.status(500).json({ error: "Failed to fetch whakataukī" })
  }
}

export async function dailyWhakatauki(req, res) {
  try {
    console.log("🧪 dailyWhakatauki hit")

    const item = await getDailyWhakatauki()

    console.log("🧪 daily item:", item)

    res.json(item)
  } catch (err) {
    console.error("❌ Controller error (dailyWhakatauki):", err)
    res.status(500).json({ error: "Failed to fetch whakataukī" })
  }
}
