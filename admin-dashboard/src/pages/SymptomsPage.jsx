/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import { fetchUserSymptoms } from "../api/userSymptoms";

export default function SymptomsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const data = await fetchUserSymptoms();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const columns = [
    { key: "date", label: "Date" },
    { key: "symptom", label: "Symptom" },
    { key: "severity", label: "Severity (1–5)" },
    { key: "notes", label: "Notes" },
  ];

  function exportCSV() {
    const csvRows = [
      ["Date", "Symptom", "Severity", "Notes"],
      ...items.map(i => [
        i.date,
        i.symptom,
        i.severity,
        i.notes?.replace(/,/g, ";") || "",
      ]),
    ];
    const blob = new Blob([csvRows.map(r => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "user_symptoms.csv";
    a.click();
  }

  return (
    <div className="page">
      <h1>User Symptoms</h1>

      <button className="outline-btn" onClick={exportCSV}>
        Export CSV
      </button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <AdminTable 
          columns={columns}
          data={items}
          readOnly
        />
      )}
    </div>
  );
}
