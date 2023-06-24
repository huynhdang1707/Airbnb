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
    handleHideNavbar();
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
  const handleHideNavbar = () => {
    if (window.innerWidth <= 992) {
      const navbarCollapse = document.getElementById("navbar-nav");
      const navbarToggle = document.querySelector(".navbar-toggler");

      navbarCollapse.classList.remove("show");
      navbarToggle.classList.add("collapsed");
    }
  };
  const handleFooterItem = (itemId) => {
    setActiveFooterItem(itemId);
  };
  const handleThongTin = () => {
    handleHideNavbar();
    handleFooterItem(1);
    navigate("/admin");
  };
  const handleHistory = () => {
    handleHideNavbar();
    handleFooterItem(5);
    navigate("booking-list");
  };
  const handleComment = () => {
    handleHideNavbar();
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
      <div className=" divvvvvvv2 bg-white">
        <Container>
          <Navbar expand="xl">
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="flex-column">
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
                    onClick={() => {
                      navigate("user-list");
                      handleHideNavbar();
                    }}
                  >
                    Danh sách user
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => {
                      navigate("add-user");
                      handleHideNavbar();
                    }}
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
                    onClick={() => {
                      navigate("desc-list");
                      handleHideNavbar();
                    }}
                  >
                    Danh sách vị trí
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => {
                      navigate("add-desc");
                      handleHideNavbar();
                    }}
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
                    onClick={() => {
                      navigate("room-list");
                      handleHideNavbar();
                    }}
                  >
                    Danh sách phòng thuê
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => {
                      navigate("add-room");
                      handleHideNavbar();
                    }}
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

      <div className="divvvvvvv1 sticky-top bg-white">
        <Container>
          <Navbar expand="xl">
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
                    onClick={() => {
                      navigate("user-list");
                      handleHideNavbar();
                    }}
                  >
                    Danh sách user
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => {
                      navigate("add-user");
                      handleHideNavbar();
                    }}
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
                    onClick={() => {
                      navigate("desc-list");
                      handleHideNavbar();
                    }}
                  >
                    Danh sách vị trí
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => {
                      navigate("add-desc");
                      handleHideNavbar();
                    }}
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
                    onClick={() => {
                      navigate("room-list");
                      handleHideNavbar();
                    }}
                  >
                    Danh sách phòng thuê
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={() => {
                      navigate("add-room");
                      handleHideNavbar();
                    }}
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
