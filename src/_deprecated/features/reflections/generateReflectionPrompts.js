export function generateReflectionPrompts(insights = []) {
  if (!insights.length) return []

  const prompts = []

  insights.forEach((insight) => {
    switch (insight.type) {
      case "repeat":
        prompts.push({
          id: "repeat",
          prompt:
            "When you’ve noticed this coming up recently, what else has been present around that time?",
        })
        break

      case "recent":
        prompts.push({
          id: "recent",
          prompt:
            "What’s been happening in your days lately that might be worth acknowledging?",
        })
        break

      case "condition":
        prompts.push({
          id: "condition",
          prompt:
            "How does this condition show up for you in day-to-day life, beyond symptoms?",
        })
        break

      default:
        break
    }
  })

  // De-duplicate & cap
  const unique = Array.from(
    new Map(prompts.map((p) => [p.id, p])).values()
  )

  return unique.slice(0, 2)
}
