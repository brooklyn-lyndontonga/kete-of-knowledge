import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveItem(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error("❌ Failed to save", key, e)
  }
}

export async function loadItem(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    console.error("❌ Failed to load", key, e)
    return fallback
  }
}
