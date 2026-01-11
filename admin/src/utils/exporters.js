// ---------- JSON ----------
export function exportJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  })

  downloadBlob(blob, filename)
}

// ---------- CSV ----------
export function exportCSV(data, filename) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No data to export")
  }

  const headers = Object.keys(data[0])
  const rows = data.map((row) =>
    headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
  )

  const csv = [headers.join(","), ...rows].join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  downloadBlob(blob, filename)
}

// ---------- Shared ----------
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
