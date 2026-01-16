import AsyncStorage from "@react-native-async-storage/async-storage"
import whakatauki from "../data/whakatauki.json"

const STORAGE_KEY = "daily-whakatauki"

export async function getDailyWhakatauki() {
  const today = new Date().toISOString().slice(0, 10)

  const stored = await AsyncStorage.getItem(STORAGE_KEY)
  if (stored) {
    const parsed = JSON.parse(stored)
    if (parsed.date === today) return parsed.item
  }

  const item =
    whakatauki[Math.floor(Math.random() * whakatauki.length)]

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: today, item })
  )

  return item
}
