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
        <Row>
          {!toggle &&<Col className=" col-4 col-md-2 bg-white vh-100 position-fixed">
            <UserSidebar />
          </Col>}
          {!toggle && <Col className="col-4 col-md-2"></Col>}
          <Col className="px-3">
            <AdminHeader Toggle={Toggle} />
            <Outlet Toggle={Toggle}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserLayout;
