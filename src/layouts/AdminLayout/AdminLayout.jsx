import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSidebar from "../../modules/Admin/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../modules/Admin/AdminHeader/AdminHeader";

function AdminLayout() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <Container fluid className="bg-bg-secondary min-vh-100">
        <AdminHeader toggle={toggle} Toggle={Toggle} />
        <AdminSidebar />

        <Outlet Toggle={Toggle} />
      </Container>
    </div>
  );
}

export default AdminLayout;
