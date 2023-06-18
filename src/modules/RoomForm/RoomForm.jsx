import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { roomUpdated, updateRoom } from "../../slices/updateRoomSlice";
import style from "./RoomForm.module.scss";
import { number } from "yargs";

const schema = yup.object({
  tenPhong: yup.string().required("(*)Tên phòng không được để trống"),
  khach: yup.number().required("(*)Lượng khách không được để trống"),
  phongNgu: yup.number().required("(*)Số phòng ngủ không được để trống"),
  giuong: yup.number().required("(*)Số giường không được để trống"),
  phongTam: yup.number().required("(*)Số phòng tắm không được để trống"),
  moTa: yup.string().required("(*)Mô tả không được để trống"),
  giaTien: yup.number().required("(*)Giá tiền không được để trống"),
  mayGiat: yup.boolean(),
  banLa: yup.boolean(),
  tivi: yup.boolean(),
  dieuHoa: yup.boolean(),
  wifi: yup.boolean(),
  bep: yup.boolean(),
  doXe: yup.boolean(),
  hoBoi: yup.boolean(),
  banUi: yup.boolean(),
  maViTri: yup.number().required("(*)Mã vị trí không được để trống"),
  hinhAnh: yup.string(),
});
function RoomForm({ onShow, handleShow, onUpdateRoom }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: null,
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: null,
      hinhAnh: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const { updated, room, error, isLoading } = useSelector(
    (state) => state.updateRoom
  );
  const onSubmit = async (value) => {
    console.log(value);
    const data = await dispatch(updateRoom(value));
    console.log(data);
    dispatch(roomUpdated(data));
  };
  const onErr = (error) => {
    console.log(error);
  };
  useEffect(() => {
    if (onUpdateRoom) {
      if (updated) {
        reset({
          id: room?.id,
          tenPhong: room?.tenPhong,
          khach: room?.khach,
          phongNgu: room?.phongNgu,
          giuong: room?.giuong,
          phongTam: room?.phongTam,
          moTa: room?.moTa,
          giaTien: room?.giaTien,
          mayGiat: room?.mayGiat,
          banLa: room?.banLa,
          tivi: room?.tivi,
          dieuHoa: room?.dieuHoa,
          wifi: room?.wifi,
          bep: room?.bep,
          doXe: room?.doXe,
          hoBoi: room?.hoBoi,
          banUi: room?.banUi,
          maViTri: room?.maViTri,
          hinhAnh: room?.hinhAnh,
        });
      } else {
        reset({
          id: onUpdateRoom?.id,
          tenPhong: onUpdateRoom?.tenPhong,
          khach: onUpdateRoom?.khach,
          phongNgu: onUpdateRoom?.phongNgu,
          giuong: onUpdateRoom?.giuong,
          phongTam: onUpdateRoom?.phongTam,
          moTa: onUpdateRoom?.moTa,
          giaTien: onUpdateRoom?.giaTien,
          mayGiat: onUpdateRoom?.mayGiat,
          banLa: onUpdateRoom?.banLa,
          tivi: onUpdateRoom?.tivi,
          dieuHoa: onUpdateRoom?.dieuHoa,
          wifi: onUpdateRoom?.wifi,
          bep: onUpdateRoom?.bep,
          doXe: onUpdateRoom?.doXe,
          hoBoi: onUpdateRoom?.hoBoi,
          banUi: onUpdateRoom?.banUi,
          maViTri: onUpdateRoom?.maViTri,
          hinhAnh: onUpdateRoom?.hinhAnh,
        });
      }
    }
  }, [onUpdateRoom]);
  if (room?.statusCode === 200) {
    swal({
      title: `Cập nhật phòng thuê thành công`,
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        handleShow(!onShow);
      }
    });
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
    <Modal
      show={onShow}
      onHide={() => handleShow(!onShow)}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header className="bg-pink-primary" closeButton>
        <Modal.Title className="text-header-border-color">
          Cập nhật thông tin
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit, onErr)}>
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
            <span className="input-group-text">Tên phòng</span>
            <input
              className="form-control"
              placeholder="Tên phòng"
              {...register("tenPhong")}
            />
          </div>
          {errors.tenPhong && (
            <p className="ms-3 fs-7 text-danger fst-italic">
              {errors.tenPhong.message}
            </p>
          )}

          <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Mô tả</span>
            <textarea className="form-control" rows="3" {...register("moTa")}  placeholder="Tên phòng">
                {getValues("moTa")}
                </textarea>
          </div>
          {errors.moTa && (
            <p className="ms-3 fs-7 text-danger fst-italic">
              {errors.moTa.message}
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
            <p className="fs-7 text-danger fst-italic">{errors.role.message}</p>
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
        {error && (
          <div className="fs-7 text-danger fst-italic text-center mb-3">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
}

export default RoomForm;
