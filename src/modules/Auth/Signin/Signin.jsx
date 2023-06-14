import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import style from "./SignIn.module.scss";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { signin } from "../../../slices/userSlice";
import swal from "sweetalert";
import queryString from "query-string";

function Signin() {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { user, isLoading, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(signin(data));
  };
  const onError = (error) => {
    console.log(error);
  };
  const handleSignUpRedirect = () => {
    // Lấy giá trị redirectUrl từ query parameters
    const redirectUrl = location.state?.redirectUrl;
    navigate("/signup", { state: { redirectUrl } });
  };

  if (user) {
    // const url = searchParams.get("redirectUrl") || "/";
    // console.log(url);
    swal({
      title: "Bạn đã đăng nhập thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        const redirectUrl = location.state?.redirectUrl;
        navigate(redirectUrl || "/");
      }
    });
  }

  if (isLoading)
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <img src="img/loading.gif" alt="" />
      </div>
    );

  return (
    <div className={`bg-dark p-5 ${style.auth}`}>
      <div className="w-50 m-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <InputGroup className="mb-2">
            <InputGroup.Text className="row col-4 mx-1">Email</InputGroup.Text>
            <Form.Control
              {...register("email", {
                required: {
                  value: true,
                  message: "(*)Email không được để trống",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "(*)Email không đúng định dạng",
                },
              })}
            />
          </InputGroup>
          {errors.email && (
            <p className="ms-3 fs-7 text-danger fst-italic">
              {errors.email.message}
            </p>
          )}
          <InputGroup className="mb-2">
            <InputGroup.Text className="row col-4 mx-1">
              Mật khẩu
            </InputGroup.Text>
            <Form.Control
              type={passShow ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "(*)Mật khẩu không được để trống",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "(*)Mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự hoa, thường và ký tự đặc biệt.",
                },
              })}
            />
            <div
              className={`input-group-text ${style.cursor}`}
              onClick={() => setPassShow(!passShow)}
            >
              {passShow ? (
                <i class="bi bi-eye-slash"></i>
              ) : (
                <i class="bi bi-eye"></i>
              )}
            </div>
          </InputGroup>
          {errors.password && (
            <p className="ms-3 fs-7 text-danger fst-italic">
              {errors.password.message}
            </p>
          )}
          <div className="w-100 pt-2">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className="w-100">
                <button
                  type="submit"
                  className={`${style.btnPrimary} w-100`}
                  disabled={isLoading ? true : false}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
            <div className="ms-4 text-end">
              <a href="#" className={style.quenPass}>
                Quên mật khẩu?
              </a>
            </div>
            <div className="ms-4 text-end">
              <a
                className={style.quenPass}
                // onClick={() => navigate("/signup")}
                onClick={handleSignUpRedirect}
                disabled={isLoading ? true : false}
              >
                Đăng ký thành viên mới.
              </a>
            </div>
            {error && (
              <p className="text-center fs-7 text-danger fst-italic">{error}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
