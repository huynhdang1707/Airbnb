import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSidebar from "../../modules/Admin/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../modules/Admin/AdminHeader/AdminHeader";
import "./AdminLayout.scss";

function AdminLayout() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="content">
      <div className="divvvvvvv2">
        <Container fluid className="bg-bg-secondary min-vh-100">
          <Row>
            {toggle && (
              <Col className=" col-4 col-md-2 bg-white vh-100 position-fixed">
                <AdminSidebar />
              </Col>
            )}
            {toggle && <Col className="col-4 col-md-2"></Col>}
            <Col className="px-3">
              <AdminHeader />
              <AdminHeader  />
              <div className="mt-2">
                <Outlet  />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="divvvvvvv1">
        <Container fluid className="bg-bg-secondary min-vh-100">
          <AdminHeader toggle={toggle} Toggle={Toggle} />
          <AdminSidebar />

          <Outlet Toggle={Toggle} />
        </Container>
      </div>
    </div>
  );
}

export default AdminLayout;
