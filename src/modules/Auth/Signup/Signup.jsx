import React, { useState, useEffect } from "react";
import style from "./Signup.module.scss";
import { Modal, Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { signup } from "../../../slices/signUpSlice";
import { signin } from "../../../slices/userSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object({
  email: yup
    .string()
    .required("(*)Email không được để trống")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "(*)Email không đúng định dạng"
    ),
  password: yup
    .string()
    .required("(*)Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "(*)Mật khẩu phải có ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số"
    ),
    rePassword: yup.string()
    .oneOf([yup.ref('password'), null], '(*)Mật khẩu không khớp')
    .required('(*)Vui lòng nhập lại mật khẩu'),
  name: yup.string().required("(*)Họ tên không được để trống"),
  phone: yup
    .string()
    .required("(*)Số điện thoại không được để trống.")
    .matches(
      /^0[1-9]\d{8,}$/,
      "(*)Số điện thoại phải là dãy số bắt đầu là 0 và ít nhất 10 chữ số"
    ),
  birthday: yup.string().required("(*)Ngày sinh không được để trống"),
  gender: yup.boolean().required("(*)Gới tính không được để trống"),
});

function Signup() {
  const dayjs = require("dayjs");
  const [passShow, setPassShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
      phone: "",
      birthday: "",
      gender: null,
      role: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    setValue('birthday', dayjs(selectedDate).format('DD/MM/YYYY'));
},[selectedDate]);

  const { user, isLoading, error } = useSelector((state) => state.signup);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(signup(data));
  };

  const onError = (error) => {
    console.log(error);
  };

  user &&
    swal(
      "Chúc mừng bạn đã đăng ký thành công!",
      "You clicked the button!",
      "success"
    );
  if (user) {
    const userSignin = {
      email: user.email,
      password: user.password,
    };
    dispatch(signin(userSignin));
    navigate(`/`);
  }
  if (isLoading)
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <img src="img/loading.gif" alt="" />
      </div>
    );
  return (
    <div className="bg-dark p-5">
      <div className="w-50 m-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Modal.Body>
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Email
              </InputGroup.Text>
              <Form.Control
                {...register("email")}
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
                {...register("password")}
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
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Nhập lại mật khẩu
              </InputGroup.Text>
              <Form.Control
                type={passShow ? "text" : "password"}
                {...register("rePassword")}
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
            {errors.rePassword && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.rePassword.message}
              </p>
            )}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Họ và tên
              </InputGroup.Text>
              <Form.Control
                {...register("name")}
              />
            </InputGroup>
            {errors.name && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.name.message}
              </p>
            )}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Số điện thoại
              </InputGroup.Text>
              <Form.Control
                {...register("phone")}
              />
            </InputGroup>
            {errors.phone && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.phone.message}
              </p>
            )}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Ngày sinh
              </InputGroup.Text>
              <div className={`col-8 form-control ${style.date}`}>
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  maxDate={startDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="datePicker"
                />
              </div>
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Giới tính
              </InputGroup.Text>
              
                <select  className="col-8 form-control" name="" {...register("gender")}>
                  <option value={true}>Nam</option>
                  <option value={false}>Nữ</option>
                </select>
              
            </InputGroup>
            {errors.gender && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.gender.message}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer className="w-100 justify-content-end">
            <div className="w-100 mt-2 ">
              <button
                type="submit"
                className={`${style.btnPrimary} w-100`}
                disabled={isLoading ? true : false}
              >
                Đăng ký
              </button>
            </div>
            <div className="ms-4 text-end">
              <a onClick={() => navigate("/signin")}
               disabled={isLoading ? true : false}
               className={style.login}>Đã có tài khoản, đăng nhập.</a>
            </div>
            
          </Modal.Footer>
          {error && (
            <p className="text-center fs-7 text-danger fst-italic">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
