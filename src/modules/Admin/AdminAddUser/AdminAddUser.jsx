import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateUser } from "../../../slices/adminCreateUser";
import DatePicker from "react-datepicker";
import  "./AdminAddUser.scss";
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
  role: yup.string(),
  // .required("((*)Loại người dùng không được để trốn")
});
function AdminAddUser() {
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
  const { user, isLoading, error } = useSelector((state) => state.createUser);
  const [addUser, setAddUser] = useState(null);

  const onSubmit = async (value) => {
    const data = await dispatch(adminCreateUser(value));
    setAddUser(data);
  };
  const onError = (errors) => {
    console.log(errors);
  };
  if (addUser?.payload?.statusCode === 200) {
    swal({
      title: "Thêm người dùng mới thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        navigate("/admin/user-list");
      }
    });
  }

  useEffect(() => {
    setValue("birthday", dayjs(selectedDate).format("DD/MM/YYYY"));
  }, [selectedDate]);

  if (isLoading)
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <img src="img/loading.gif" alt="" />
      </div>
    );

  return (
    <div className="createUser">
      <h2>Thêm người dùng mới</h2>
      <div className="body">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="container mb-2">
            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Email</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Mật khẩu</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <spa className="col-2 text-end">Họ & tên</spa>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors?.name.message}
                  </p>
                )}
              </div>
            </div>
{/* 
            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Email</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div> */}

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Số điện thoại</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Loại người dùng</div>
              <div className="col-10">
                <select
                  className="form-control"
                  name="mySelect"
                  {...register("role")}
                >
                  <option value="USER">Khách hàng</option>
                  <option value="ADMIN">Quản trị</option>
                </select>
                {errors.role && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Ngày sinh</div>
              <div className="col-10">
                {/* <input
                  type="text"
                  className="w-100 form-control"
                  {...register("birthday")}
                >
                </input> */}
                <DatePicker
                    showIcon
                    selected={selectedDate}
                    maxDate={startDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="datePicker"
                  />

                {errors.birthday && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.birthday.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Giới tính</div>
              <div className="col-10">
                <select
                  className="form-control"
                  name="mySelect"
                  {...register("gender")}
                >
                  <option value={true}>Nam</option>
                  <option value={false}>Nữ</option>
                </select>
                {errors.gender && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-center">
              <button className="add" disabled={isLoading ? true : false}>
                Thêm người dùng
              </button>
              {error && (
                <p className="text-center fs-7 text-danger fst-italic">
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddUser;
