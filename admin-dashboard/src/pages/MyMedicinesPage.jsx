/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import { fetchUserMedicines } from "../api/myMedicines";

export default function MyMedicinesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const data = await fetchUserMedicines();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "dosage", label: "Dosage" },
    { key: "frequency", label: "Frequency" },
  ];

  function exportCSV() {
    const csvRows = [
      ["Name", "Dosage", "Frequency"],
      ...items.map(i => [i.name, i.dosage, i.frequency]),
    ];
    const blob = new Blob([csvRows.map(r => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "user_medicines.csv";
    a.click();
  }

  return (
    <div className="page">
      <h1>User Medicines</h1>

      <button className="outline-btn" onClick={exportCSV}>
        Export CSV
      </button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <AdminTable columns={columns} data={items} readOnly />
      )}
    </div>
  );
}
