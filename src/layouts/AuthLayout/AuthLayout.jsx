import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/Header/Header";
import style from "./AuthLayout.module.scss";

function AuthLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
