import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userCreateBooking } from "../../../slices/userCreateBooking";
import "./UserBooking.scss";

function UserBooking() {
  const { booking, isLoading, error } = useSelector(
    (state) => state.createBooking
  );
  const schema = yup.object({
    maPhong: yup.number(),
    ngayDen: yup.string().required("(*)Ngày đến không được để trống"),
    ngayDi: yup.string().required("(*)Quốc gia không được để trống"),
    soLuongKhach: yup
      .number()
      .max(
        booking.soLuongKhach,
        `Số lượng khách không vượt quá lượng khách tối đa: ${booking.soLuongKhach}`
      )
      .min(1, "Số lượng khách ít nhất là 1")
      .typeError("Số lượng khách phair là 1 số"),
    maNguoiDung: yup.number(),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      maPhong: null,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 0,
      maNguoiDung: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const {
    user,
    isLoading: isLoading1,
    error: error1,
  } = useSelector((state) => state.user);
  console.log(user?.user);
  useEffect(() => {
    const den = new Date(booking?.ngayDen);
    const di = new Date(booking?.ngayDi);
    reset({
      // id: booking?.id,
      maPhong: booking?.maPhong,
      ngayDen: den,
      ngayDi: di,
      soLuongKhach: booking?.soLuongKhach,
      maNguoiDung: user?.user?.id,
    });
  }, []);
  const [addBooking, setAddBooking] = useState(null);
  const onSubmit = async (value) => {
    const newValue = {
      ...value,
      ngayDen: booking.ngayDen,
      ngayDi: booking.ngayDi,
    };
    const data = await dispatch(userCreateBooking(newValue));
    setAddBooking(data);
  };
  const onError = (errors) => {
    console.log(errors);
  };
  if (addBooking?.payload?.statusCode === 201) {
    swal({
      title: "Đặt phòng thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        navigate("/user/booking-list");
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
    <div className="createUser">
      <div className="body">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="container mb-2">
            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Tên người dùng</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  value={user?.user?.name}
                />
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Tên Phòng</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  value={booking?.tenPhong}
                />
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <spa className="col-2 text-end">Hình phòng</spa>
              <div className="col-10">
                <img
                  style={{ maxWidth: "150px" }}
                  src={booking?.hinhPhong}
                  alt={booking?.tenPhong}
                />
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Số lượng khách</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("soLuongKhach")}
                />
                {errors.soLuongKhach && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.soLuongKhach.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Ngày nhận phòng</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("ngayDen")}
                />
                {errors.ngayDen && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.ngayDen.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Ngày trả phòng</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("ngayDi")}
                />
                {errors.ngayDi && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.ngayDi.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center">
              <button className="add" disabled={isLoading ? true : false}>
                Đặt phòng
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

export default UserBooking;
