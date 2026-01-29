import AsyncStorage from "@react-native-async-storage/async-storage"

// --------------------
// Generic helpers
// --------------------
export async function getCached(key) {
  try {
    const value = await AsyncStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (err) {
    console.warn("Cache read failed:", key, err)
    return null
  }
}

export async function setCached(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn("Cache write failed:", key, err)
  }
}
