import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSidebar from "../../modules/Admin/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../modules/Admin/AdminHeader/AdminHeader";

function AdminLayout() {
  return (
    <div>
       <AdminHeader />
      <Row style={{marginRight:"0px"}}>
        <Col sm={2} className="px-0">
          <AdminSidebar />
        </Col>
        <Col sm={10} className="px-0">
          <div className="">
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLayout;
