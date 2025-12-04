/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import { fetchUserContacts } from "../api/userContacts";

export default function ContactsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const data = await fetchUserContacts();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "relationship", label: "Relationship" },
  ];

  function exportCSV() {
    const csvRows = [
      ["Name", "Phone", "Relationship"],
      ...items.map(i => [i.name, i.phone, i.relationship]),
    ];
    const blob = new Blob([csvRows.map(r => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "user_contacts.csv";
    a.click();
  }

  return (
    <div className="page">
      <h1>User Contacts</h1>

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
