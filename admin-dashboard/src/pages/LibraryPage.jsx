import React from "react";
import { Link } from "react-router-dom";

export default function LibraryPage() {
  return (
    <div className="page-container">
      <h1>Library Management</h1>
      <p>Select what you want to manage:</p>

      <div className="grid-links">
        <Link className="admin-tile" to="/library-categories">
          📚 Manage Categories
        </Link>

        <Link className="admin-tile" to="/library-resources">
          📘 Manage Resources
        </Link>
      </div>
    </div>
  );
}
