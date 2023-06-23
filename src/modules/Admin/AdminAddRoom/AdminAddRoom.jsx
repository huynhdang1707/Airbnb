import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateRoom } from "../../../slices/adminCreateRoom";
import "./AdminAddRoom.scss";


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

function AdminAddRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      tenPhong: "",
      khach: null,
      phongNgu: null,
      giuong: null,
      phongTam: null,
      moTa: "",
      giaTien: null,
      mayGiat: null,
      banLa: null,
      tivi: null,
      dieuHoa: null,
      wifi: null,
      bep: null,
      doXe: null,
      hoBoi: null,
      banUi: null,
      maViTri: null,
      hinhAnh: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const { room, isLoading, error } = useSelector((state) => state.createRoom);
  const [addRoom, setAddRoom] = useState(null);
  const [issloading, setIssLoading] = useState(null);
  const onSubmit = async (value) => {
    const data = await dispatch(adminCreateRoom(value));
    setAddRoom(data);
  };
 
  const onError = (errors) => {
    console.log(errors);
  };
  if (addRoom?.payload?.statusCode === 201) {
    swal({
      title: "Thêm phòng thuê mới thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        navigate("/admin/room-list");
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
    <>
    <div>
      <Container>
        <h2 className="tieuDePT">Thêm phòng thuê mới</h2>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("id")}
                    placeholder="ID"
                  />
                  {errors.id && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.id.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("tenPhong")}
                    placeholder="Tên phòng"
                  />
                  {errors.tenPhong && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.tenPhong.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <textarea
                    className="form-control w-100"
                    rows="3"
                    {...register("moTa")}
                    placeholder="Mô tả"
                  >
                    {getValues("moTa")}
                  </textarea>
                  {errors.moTa && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.moTa.message}
                    </p>
                  )}       
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("giaTien")}
                    placeholder="Giá tiền"
                  />
                  {errors.giaTien && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.giaTien.message}
                    </p>
                  )}        
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("khach")}
                    placeholder="Khách"
                  />
                  {errors.khach && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.khach.message}
                    </p>
                )}       
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="form-control"
                    {...register("phongNgu")}
                    placeholder="Phòng ngủ"
                  />
                  {errors?.phongNgu && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors?.phongNgu.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("giuong")}
                    placeholder="Giường"
                  />
                  {errors.giuong && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.giuong.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("phongTam")}
                    placeholder="Phòng tắm"
                  />
                  {errors.phongTam && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.phongTam.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("mayGiat")}
                  >
                    <option value="">Máy giặt</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.mayGiat && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.mayGiat.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("banLa")}
                  >
                    <option value="">Bàn là</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.banLa && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.banLa.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("tivi")}
                  >
                    <option value="">Tivi</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.tivi && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.tivi.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                  className="form-control"
                  name="mySelect"
                  {...register("dieuHoa")}
                >
                  <option value="">Điều hòa</option>
                  <option value={true}>Có</option>
                  <option value={false}>Không</option>
                </select>
                {errors.dieuHoa && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.dieuHoa.message}
                  </p>
                )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("wifi")}
                  >
                    <option value="">Wifi</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.wifi && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.wifi.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("bep")}
                  >
                    <option value="">Bếp</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.bep && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.bep.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("doXe")}
                  >
                    <option value="">Đỗ xe</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.doXe && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.doXe.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("hoBoi")}
                  >
                    <option value="">Hồ bơi</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.hoBoi && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.hoBoi.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <select
                    className="form-control"
                    name="mySelect"
                    {...register("banUi")}
                  >
                    <option value="">Bàn ủi</option>
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </select>
                  {errors.banUi && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.banUi.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <input
                    type="text"
                    className="w-100 form-control"
                    {...register("maViTri")}
                    placeholder="Mã vị trí"
                  />
                  {errors.maViTri && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.maViTri.message}
                    </p>
                  )}
            </div>
            <div className="mt-2">
              <input
                    placeholder="Hình ảnh (URL)"
                    type="text"
                    className="w-100 form-control"
                    {...register("hinhAnh")} 
                  />
                  {errors.hinhAnh && (
                    <p className="ms-3 fs-7 text-danger fst-italic">
                      {errors.hinhAnh.message}
                    </p>
                  )}
            </div>
            <div className="text-end taoMoi">
              <button className="add" disabled={isLoading ? true : false}>
                Thêm phòng thuê
              </button>
              {error && (
                <p className="text-center fs-7 text-danger fst-italic">
                  {error}
                </p>
              )}
            </div>
        </form>
      </Container>
    </div>
  </>
  );
}

export default AdminAddRoom;
