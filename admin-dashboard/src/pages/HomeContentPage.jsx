import React, { useEffect, useState } from "react";
import { api } from "../api/client";

export default function HomeContentPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(setStats)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Overview</h1>

      {!stats && <p>Loading...</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">Resources: {stats.resources}</div>
          <div className="stat-card">Categories: {stats.categories}</div>
          <div className="stat-card">Whakataukī: {stats.whakatauki}</div>
          <div className="stat-card">Conditions: {stats.conditions}</div>
          <div className="stat-card">Support Contacts: {stats.support}</div>
          <div className="stat-card">Snapshots: {stats.snapshots}</div>
        </div>
      )}
    </div>
  );
}
