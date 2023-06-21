import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { descUpdated, updateDesc } from "../../slices/updateDescSlice";
import style from "./DescForm.module.scss";
import UploadImage from "../UploadImgage/UploadImage";

const schema = yup.object({
  tenViTri: yup.string().required("(*)Tên vị trí không được để trống"),
  tinhThanh: yup.string().required("(*)Tỉnh thành không được để trống"),
  quocGia: yup.string().required("(*)Quốc gia không được để trống"),
  hinhAnh: yup.string(),
});

function DescForm({ onShow, handleShow, onUpdateDesc }) {
  const dispatch = useDispatch();
  //upload
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(null);
  const [id2, setId2] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUp, setImageUp] = useState(null);
  const handleUpload = (id, img, kw) => {
    setShow(true);
    setId2(id);
    setImage(img);
    setKey(kw);
  };

  const handleShow2 = (value) => {
    setShow(value);
  };
  //
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
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const handleUploaded = (hinhAnh) => {
    setImageUp(hinhAnh);
    setValue("hinhAnh", hinhAnh);
  };
  const { updated, desc, error, isLoading } = useSelector(
    (state) => state.updateDesc
  );
  const onSubmit = async (value) => {
    const data = await dispatch(updateDesc(value));
    if (data?.payload?.statusCode === 200) {
      swal({
        title: `Cập nhật vị trí thành công`,
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
      }).then((willSuccess) => {
        if (willSuccess) {
          handleShow(!onShow);
        }
      });
    }
    dispatch(descUpdated(data));
  };
  const onErr = (error) => {
    console.log(error);
  };
  useEffect(() => {
    if (onUpdateDesc) {
      if (updated) {
        reset({
          id: desc?.id,
          tenViTri: desc?.tenViTri,
          tinhThanh: desc?.tinhThanh,
          quocGia: desc?.quocGia,
          hinhAnh: imageUp ? imageUp : desc?.hinhAnh,
        });
      } else {
        reset({
          id: onUpdateDesc?.id,
          tenViTri: onUpdateDesc?.tenViTri,
          tinhThanh: onUpdateDesc?.tinhThanh,
          quocGia: onUpdateDesc?.quocGia,
          hinhAnh:
            getValues("hinhAnh") !== ""
              ? getValues("hinhAnh") !== onUpdateDesc?.hinhAnh && !imageUp
                ? onUpdateDesc?.hinhAnh
                : getValues("hinhAnh")
              : onUpdateDesc?.hinhAnh,
        });
      }
    }
  }, [onUpdateDesc, imageUp]);
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
      {show ? null : (
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
                <span className="input-group-text">Tên vị trí</span>
                <input
                  className="form-control"
                  placeholder="Tên vị trí"
                  {...register("tenViTri")}
                />
              </div>
              {errors.tenViTri && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                  {errors.tenViTri.message}
                </p>
              )}

              <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Tỉnh thành</span>
                <input
                  className="form-control"
                  rows="3"
                  {...register("tinhThanh")}
                  placeholder="Tỉnh thành"
                />
              </div>
              {errors.tinhThanh && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                  {errors.tinhThanh.message}
                </p>
              )}
              <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Quốc gia</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quốc gia"
                  {...register("quocGia")}
                />
              </div>
              {errors.quocGia && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                  {errors.quocGia.message}
                </p>
              )}

              <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Hình ảnh</span>
                <img
                  style={{ maxWidth: "100px" }}
                  src={imageUp ? imageUp : watch("hinhAnh")}
                  alt=""
                />
                <input
                  value={imageUp ? imageUp : watch("hinhAnh")}
                  type="text"
                  className="form-control"
                  placeholder="Hình ảnh"
                  {...register("hinhAnh")}
                />
              </div>
              {errors.hinhAnh && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                  {errors.hinhAnh.message}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                className={style.btn2}
                onClick={() =>
                  handleUpload(getValues("id"), getValues("hinhAnh"), "desc")
                }
                type="button"
              >
                Upload ảnh
              </button>
              <button type="submit" className={`${style.btnn}`}>
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
      )}
      <UploadImage
        handleUploaded={handleUploaded}
        onShoww={show}
        handleShow={handleShow2}
        onId={id2}
        onImg={image}
        onKey={key}
      />
    </>
  );
}

export default DescForm;
