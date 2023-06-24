import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../../slices/userSlice";
import { Container } from "react-bootstrap";
import { removeUser } from "../../../slices/signUpSlice";
import swal from "sweetalert";
import Collapse from "react-bootstrap/Collapse";
import { Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./AdminSidebar.scss";

function AdminSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeFooterItem, setActiveFooterItem] = useState(1);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await swal({
      title: "Bạn có muốn đăng xuất!",
      text: "Nhấn Ok để tiếp tục!",
      icon: "warning",
      buttons: true,
    }).then((willSuccess) => {
      if (willSuccess) {
        dispatch(signout());
        dispatch(removeUser());
        localStorage.removeItem("user");
        navigate("/");
        swal({
          title: "Bạn đã đăng xuất thành công",
          text: "Nhấn Ok để tiếp tục!",
          icon: "success",
        });
      }
    });
  };
  const handleFooterItem = (itemId) => {
    setActiveFooterItem(itemId);
  };
  const handleThongTin = () => {
    handleFooterItem(1);
    navigate("/admin");
  };
  const handleHistory = () => {
    handleFooterItem(5);
    navigate("booking-list");
  };
  const handleComment = () => {
    handleFooterItem(6);
    navigate("comment-list");
  };
  useEffect(() => {
    if (location.pathname === "/admin/room-list") {
      setActiveFooterItem(4);
    }
    if (location.pathname === "/admin/user-list") {
      setActiveFooterItem(2);
    }
    if (location.pathname === "/admin/desc-list") {
      setActiveFooterItem(3);
    }
  }, []);
  return (
    <>
      <div className="sticky-top bg-white">
        <Container>
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav>
                <Nav.Item>
                  <Nav.Link onClick={handleThongTin}>
                    <i className="bi bi-person-circle fs-5 me-3"></i>
                    <span>Thông tin cá nhân</span>
                  </Nav.Link>
                </Nav.Item>

                <NavDropdown
                  title={
                    <>
                      <i className="bi bi-person-fill-check fs-5 me-3"></i>
                      <span className="me-4">Quản lý user</span>
                    </>
                  }
                  id="nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey="4.1"
                    onClick={() => navigate("user-list")}
                  >
                    Danh sách user
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => navigate("add-user")}
                  >
                    Thêm user mới
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <>
                      <i className="bi bi-geo-alt-fill fs-5 me-3"></i>
                      <span className="me-4">Quản lý vị trí</span>
                    </>
                  }
                  id="nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey="4.1"
                    onClick={() => navigate("desc-list")}
                  >
                    Danh sách vị trí
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => navigate("add-desc")}
                  >
                    Thêm vị trí mới
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <>
                      <i className="bi bi-house-check-fill fs-5 me-3"></i>
                      <span className="me-2">Quản lý phòng</span>
                    </>
                  }
                  id="nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey="4.1"
                    onClick={() => navigate("room-list")}
                  >
                    Danh sách phòng thuê
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => navigate("add-room")}
                  >
                    Thêm phòng thuê mới
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Item>
                  <Nav.Link onClick={handleHistory}>
                    <i className="bi bi-book fs-5 me-3"></i>
                    <span>Quản lý đặt phòng</span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link onClick={handleComment}>
                    <i className="bi bi-chat-dots fs-5 me-3"></i>
                    <span>Quản lý bình luận</span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link onClick={handleSignOut}>
                    <i className="bi bi-power fs-5 me-3"></i>
                    <span>Đăng xuất</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    </>
  );
}

export default AdminSidebar;
