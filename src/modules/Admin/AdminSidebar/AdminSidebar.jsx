import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AdminSidebar.module.scss";
import Collapse from "react-bootstrap/Collapse";

function AdminSidebar() {
  const [activeFooterItem, setActiveFooterItem] = useState(1);
  const navigate = useNavigate();
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
  return (
    <div className={style.sideBar}>
      <ul className={style.footer}>
        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 1 ? style.action : ""
            }`}
            onClick={handleThongTin}
          >
            Thông tin
          </li>
        </div>
        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 2 ? style.action : ""
            }`}
            onClick={() => handleFooterItem(2)}
          >
            Quản lý user
            <span className={activeFooterItem === 2 ? style.icon : ""}>
              <i className="bi bi-chevron-right"></i>
            </span>
          </li>
          <Collapse in={activeFooterItem === 2}>
            <ul className={style.listItem}>
              <li
                className={style.listItemDetail}
                onClick={() => navigate("user-list")}
              >
                Danh sách user
              </li>
              <li
                className={style.listItemDetail}
                onClick={() => navigate("add-user")}
              >
                Thêm user mới
              </li>
            </ul>
          </Collapse>
        </div>

        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 3 ? style.action : ""
            }`}
            onClick={() => handleFooterItem(3)}
          >
            Quản lý vị trí
            <span className={activeFooterItem === 3 ? style.icon : ""}>
              <i className="bi bi-chevron-right"></i>
            </span>
          </li>
          <Collapse in={activeFooterItem === 3}>
            <ul className={style.listItem}>
              <li
                className={style.listItemDetail}
                onClick={() => navigate("desc-list")}
              >
                Danh sách vị trí
              </li>
              <li
                className={style.listItemDetail}
                onClick={() => navigate("add-desc")}
              >
                Thêm vị trí mới
              </li>
            </ul>
          </Collapse>
        </div>

        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 4 ? style.action : ""
            }`}
            onClick={() => handleFooterItem(4)}
          >
            Quản lý phòng
            <span className={activeFooterItem === 4 ? style.icon : ""}>
              <i className="bi bi-chevron-right"></i>
            </span>
          </li>
          <Collapse in={activeFooterItem === 4}>
            <ul className={style.listItem}>
              <li
                onClick={() => {
                  navigate("room-list");
                }}
                className={style.listItemDetail}
              >
                Danh sách phòng
              </li>
              <li
                onClick={() => navigate("add-room")}
                className={style.listItemDetail}
              >
                Thêm phòng mới
              </li>
            </ul>
          </Collapse>
        </div>
        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 5 ? style.action : ""
            }`}
            onClick={handleHistory}
          >
            Quản lý đặt phòng
          </li>
        </div>
        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 6 ? style.action : ""
            }`}
            onClick={handleComment}
          >
            Quản lý bình luận
          </li>
        </div>
      </ul>
    </div>
  );
}

export default AdminSidebar;
