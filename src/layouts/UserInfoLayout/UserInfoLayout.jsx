import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from "../../modules/UserInfo/UserInfo";
import style from "./UserInfoLayout.module.scss";

function UserInfoLayout() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const role = user.user.role;
  const location = useLocation();
  const handleClick = () => {
    navigate("/admin");
  };

  if (user) {
    return (
      <div className={`${style.cont}`}>
        <div className="">
          <h1 className="text-center py-4 bg-dark text-light ">
            Thông tin người dùng
          </h1>

          {role === "ADMIN" && location.pathname !== "/admin" ? (
            <div className="d-flex justify-content-end m-3">
              <button className={style.btn} onClick={handleClick}>
                Admin Page
              </button>
            </div>
          ) : null}
          <UserInfo />
        </div>
      </div>
    );
  } else
    return (
      <div className="text-center text-danger">
        <h3>Vui lòng đăng nhập để tiếp tục</h3>
      </div>
    );
}

export default UserInfoLayout;
