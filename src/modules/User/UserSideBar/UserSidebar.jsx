import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import style from "./UserSidebar.module.scss";
import { useSelector } from "react-redux";

function UserSidebar() {
  const location = useLocation();
  const [activeFooterItem, setActiveFooterItem] = useState(1);
  const navigate = useNavigate();
  const handleFooterItem = (itemId) => {
    setActiveFooterItem(itemId);
  };
  const handleThongTin = () => {
    handleFooterItem(1);
    navigate("/user");
  };
  const handleHistory = () => {
    handleFooterItem(2);
    navigate("booking-list");
  };
  const handleComment = () => {
    handleFooterItem(3);
    navigate("comment-list");
  };
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/user/booking-list") {
      setActiveFooterItem(2);
    }
  }, []);

  return (
    <div className={style.sideBar}>
      <div className={style.userPage}>
        <span>Xin chào, tôi là {user?.user?.name}.</span>
      </div>
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
            onClick={handleHistory}
          >
            Phòng đã đặt
          </li>
        </div>

        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 3 ? style.action : ""
            }`}
            onClick={handleComment}
          >
            Bình luận của bạn
          </li>
        </div>
      </ul>
    </div>
  );
}

export default UserSidebar;
