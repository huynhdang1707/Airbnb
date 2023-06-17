import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getInfoUser } from "../../slices/infoUserSlice";
import style from "./UserInfo.module.scss";

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
});

function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [err, setErr] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: null,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      avatar: "",
      gender: null,
      role: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const { infoUser, isLoading, error } = useSelector((state) => state.infoUser);
  useEffect(() => {
    dispatch(getInfoUser(user?.user?.id));
  }, [user?.user?.id]);
  const onSubmit = async (value) => {};
  useEffect(() => {
    reset({
      id: infoUser.id,
      password: infoUser?.password,
      name: infoUser?.name,
      email: infoUser?.email,
      phone: infoUser?.phone,
      role: infoUser?.role,
      avatar: infoUser?.avatar,
      birthday: infoUser?.birthday,
      gender: infoUser.gender,
    });
  }, [infoUser]);
  const onErrer = (err) => {
    console.log(err);
  };
  if (err || error) {
    navigate("/*");
  }
  if (isLoading)
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <img
          src={"/img/loading.gif"}
          className="img-fluid"
          style={{ height: "100px", width: "100px" }}
        />
      </div>
    );

  return (
    <>
      <div className={style.infoUser}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className={style.right}>
                <table className={style.table}>
                  <tbody>
                    <tr>
                      <td scope="col">ID:</td>
                      <td scope="col" className="fs-4 fw-bolder">
                        {infoUser?.id}
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">Họ tên:</td>
                      <td scope="col">{infoUser?.name}</td>
                    </tr>
                    <tr>
                      <td scope="col">Email:</td>
                      <td scope="col" className="fs-5 fst-italic text-danger">
                        {infoUser?.email}
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">Mật khẩu:</td>
                      <td scope="col">{infoUser?.password}</td>
                    </tr>
                    <tr>
                      <td scope="col">Phone :</td>
                      <td scope="col">{infoUser?.phone}</td>
                    </tr>
                    <tr>
                      <td scope="col">Loại người dùng:</td>
                      <td scope="col">{infoUser?.role}</td>
                    </tr>
                    <tr>
                      <td scope="col">Ảnh đại diện:</td>
                      <img src={infoUser?.avatar} alt={infoUser?.id} />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-6">
              <div
                className={style.left}
                onClick={() => setShow(infoUser?.id ? true : false)}
              >
                <i class="bi bi-pencil-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-pink-primary" closeButton>
          <Modal.Title className="text-header-border-color">
            Cập nhật thông tin
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
          <Modal.Body className={style.formBody}>
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">ID</span>
              <input
                type="text"
                className="form-control"
                disabled
                placeholder="ID"
                {...register("id")}
              />
            </div>
            {errors.id && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.id.message}
              </p>
            )}
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Mật khẩu</span>
              <input
                type={passShow ? "text" : "password"}
                className="form-control"
                placeholder="Mật khẩu"
                {...register("password")}
              />
              <div
                className="input-group-text"
                onClick={() => setPassShow(!passShow)}
              >
                {passShow ? (
                  <i class="bi bi-eye-slash"></i>
                ) : (
                  <i class="bi bi-eye"></i>
                )}
              </div>
            </div>
            {errors.password && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.password.message}
              </p>
            )}
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Họ và tên</span>
              <input
                type="text"
                className="form-control"
                placeholder="Họ và tên"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.name.message}
              </p>
            )}
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Email</span>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.email.message}
              </p>
            )}
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Số điện thoại</span>
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.phone.message}
              </p>
            )}
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Loại người dùng</span>
              <select
                type="text"
                className="form-control"
                placeholder="Mã loại người dùng"
                {...register("role")}
              >
                <option value="ADMIN">Quản trị</option>
                <option value="USER">Khách hàng</option>
              </select>
            </div>
            {errors.role && (
              <p className="fs-7 text-danger fst-italic">
                {errors.role.message}
              </p>
            )}
             <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Ảnh đại diện</span>
              <input
                type="text"
                className="form-control"
                placeholder="Avatar"
                {...register("avatar")}
              />
            </div>
            {errors.avatar && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.avatar.message}
              </p>
            )}
             <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Ngày sinh</span>
              <input
                type="text"
                className="form-control"
                placeholder="Ngày sinh"
                {...register("birthday")}
              />
            </div>
            {errors.birthday && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.birthday.message}
              </p>
            )}
             <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Giới tính</span>
              <select
                type="text"
                className="form-control"
                placeholder="Giới tính"
                {...register("gender")}
              >
                <option value={true}>Nam</option>
                <option value={false}>Nữ</option>
              </select>
            </div>
            {errors.gender && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.gender.message}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className={`btn ${style.btn}`}>
              Cập nhật
            </button>
          </Modal.Footer>
          {err && (
            <div className="fs-7 text-danger fst-italic text-center mb-3">
              {err}
            </div>
          )}
        </form>
      </Modal>
    </>
  );
}

export default UserInfo;
