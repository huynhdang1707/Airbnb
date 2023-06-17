import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSidebar from "../../modules/Admin/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../modules/Admin/AdminHeader/AdminHeader";
import style from "./AdminLayout.module.scss"

function AdminLayout() {
  return (
    <div>
       <AdminHeader />
      <Row className={style.row1}>
        <Col sm={2} className={`${style.col2} px-0`}>
          <AdminSidebar />
        </Col>
        <Col sm={10} className={`${style.col10} px-0`}>
          <div className="">
           
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLayout;
