export async function getHomeSummary(req, res) {
  try {
    res.json({
      symptoms: {
        latest: {
          symptom: "Headache",
          severity: 7,
          date: "2026-01-18",
        },
      },
      notes: {
        latest: {
          title: "Rough day",
          date: "2026-01-18",
        },
      },
      medicines: {
        activeCount: 2,
      },
      checklist: {
        todayCount: 3,
      },
    })
  } catch (err) {
    console.error("Home summary error", err)
    res.status(500).json({ error: "Failed to load home summary" })
  }
}
