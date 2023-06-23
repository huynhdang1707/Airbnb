import React from "react";
import "./AdminHeader.scss"

function AdminHeader({Toggle}) {
  return (
    <nav className="navbar navbar-expand-sm navbar-white bg-white px-3">
        <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
    </nav>
  );
}

export default AdminHeader;
