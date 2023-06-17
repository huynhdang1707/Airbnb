import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from "../../modules/UserInfo/UserInfo";
import style from "./UserInfoLayout.module.scss";

function UserInfoLayout() {
  const { userID } = useParams();
  const { user } = useSelector((state) => state.user);

  if (user) {
    return (
      <div className={`${style.cont}`}>
        <div className="">
          <h1 className="text-center my-4">
            Thông tin người dùng
          </h1>
          <UserInfo />
        </div>
      </div>
    );
  } else
    return (
      <div className="text-center text-danger">
        <h3>Vui lòng đăng nhập để đặt vé</h3>
      </div>
    );
}

export default UserInfoLayout;
