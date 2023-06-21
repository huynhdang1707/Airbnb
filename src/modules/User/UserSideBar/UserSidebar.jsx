import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import style from "./UserSidebar.module.scss";

function UserSidebar() {
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


  return   <div className={style.sideBar}>
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
  </ul>
</div>;
}

export default UserSidebar;
