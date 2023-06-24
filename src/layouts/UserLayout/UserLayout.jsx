import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../modules/Admin/AdminHeader/AdminHeader";
import UserSidebar from "../../modules/User/UserSideBar/UserSidebar";

function UserLayout() {
  const [toggle, setToggle] = useState(false);
  const Toggle = () =>{
    setToggle(!toggle)
  }
  return (
    <div>
        <Container fluid className="bg-bg-secondary min-vh-100">
        <AdminHeader toggle={toggle} Toggle={Toggle} />
        <UserSidebar />

        <Outlet Toggle={Toggle} />
      </Container>
    </div>
  );
}

export default UserLayout;
