import whakatauki from "../data/whakatauki.json"

export function getRandomWhakatauki() {
  if (!Array.isArray(whakatauki) || whakatauki.length === 0) {
    return null
  }

  const index = Math.floor(Math.random() * whakatauki.length)
  return whakatauki[index]
}
