import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../modules/Admin/AdminHeader/AdminHeader";
import UserSidebar from "../../modules/User/UserSideBar/UserSidebar";

function UserLayout() {
  return (
    <div>
      <AdminHeader />
      <Row style={{ marginRight: "0px" }}>
        <Col sm={2} className="px-0">
          <UserSidebar />
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

export default UserLayout;
