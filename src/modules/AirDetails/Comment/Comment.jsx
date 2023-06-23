import React, { useEffect, useRef, useState } from "react";
import "./Comment.scss";
import { apiGetCommentListRoomId } from "../../../apis/commentManagementAPI";
import { useDispatch, useSelector } from "react-redux";
import { commentUpdated } from "../../../slices/updateCommentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getCommentList } from "../../../slices/commentListSlice";
import swal from "sweetalert";
import { updateComment } from "../../../slices/updateCommentSlice";
import { apiDeleteComment } from "../../../apis/commentManagementAPI";

const schema = yup.object({
  noiDung: yup.string().required("(*)Nội dung không được để trống"),
  saoBinhLuan: yup.number(),
});

function Comment({ roomId, cmted }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [send, setSend] = useState(false);
  const [indexx, setIndexx] = useState(null);
  const { user } = useSelector((state) => state.user);
  const inputRef = useRef();
  const today = new Date();
  const tmr = new Date();
  const [total, setTotal] = useState(null);
  tmr.setDate(today.getDate() + 2);
  const [updateComment1, setUpdateComment] = useState(null);
  const deleteComment = useRef(null);
  const [idDel, setIdDel] = useState(null);
  const [deleteCmt, setDeleteCmt] = useState(null);
  const [deletedCmt, setDeletedCmt] = useState(null);
  const [flagDel, setFlagDel] = useState(false);
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
      noiDung: "",
      saoBinhLuan: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const {
    updated,
    comment,
    error: err,
    isLoading: isLoad,
  } = useSelector((state) => state.updateComment);

  const [idCmt, setIdCmt] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const data = await dispatch(getCommentList());
      const cmtHaveId = data?.payload.filter(
        (item) =>
          item.maPhong == roomId &&
          item.maNguoiBinhLuan === user?.user?.id &&
          item.noiDung === updateComment1?.noiDung &&
          item.ngayBinhLuan === updateComment1?.ngayBinhLuan
      );
      const cmtDelId = data?.payload.filter(
        (item) =>
          item.maPhong == roomId &&
          item.maNguoiBinhLuan === user?.user?.id &&
          item.noiDung === deleteCmt?.noiDung &&
          item.ngayBinhLuan === deleteCmt?.ngayBinhLuan
      );
      setIdCmt(cmtHaveId[0]?.id);

      setIdDel(cmtDelId[0]?.id);
    };
    fetch();
  }, [updateComment1, deleteCmt, deletedCmt, flagDel]);
  useEffect(() => {
    if (updateComment1) {
      if (updated) {
        reset({
          noiDung: updateComment1?.noiDung,
          saoBinhLuan: comment?.saoBinhLuan,
        });
      } else {
        reset({
          noiDung: updateComment1?.noiDung,
          saoBinhLuan: updateComment1?.saoBinhLuan,
        });
      }
    }
  }, [updateComment1, updated, cancel]);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await apiGetCommentListRoomId(roomId);
        setComments(data.content?.reverse());
        setIsLoading(false);

        if (data.content) {
          let sum = 0;
          data.content?.forEach((obj) => {
            if (obj.hasOwnProperty("saoBinhLuan")) {
              sum += obj.saoBinhLuan;
            }
          });
          setTotal(sum);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetch();
  }, [roomId, updated, deleteComment, cmted, deletedCmt]);
  const handleUpdateComment = (index) => {
    if (inputRef.current && inputRef.current.key === index) {
      inputRef.current.focus();
    }
    setCancel(true);
    setIndexx(index);
    setUpdateComment(comments[index]);
  };

  const handleDeleteComment = async (index) => {
    setDeleteCmt(comments[index]);
    setFlagDel(!flagDel);
    //
    await swal({
      title: "Bạn có muốn xóa đánh giá?",
      text: "Nhấn Ok để tiếp tục!",
      icon: "warning",
      buttons: true,
    }).then((willSuccess) => {
      setFlagDel(!flagDel);
      if (idDel) {
        if (willSuccess) {
          const fetch = async () => {
            try {
              const data = await apiDeleteComment(idDel);
              setDeletedCmt(data);
              deleteComment.current = data;
            } catch (error) {
              console.log(error);
            }
          };
          fetch();
          if (deletedCmt) {
            swal({
              title: `Xóa đánh giá thành công`,
              text: "Nhấn Ok để tiếp tục!",
              icon: "success",
            }).then((willSuccess) => {
              deleteComment.current = null;
            });
          }
        }
      }
    });
    //
  };
  const handleCancelComment = (index) => {
    setCancel(false);
    setIndexx(index);
    setSend(false);
  };
  const handleChange = (evt) => {
    setSend(true);
    console.log("a");
  };
  //
  const onSubmit = async (value) => {
    const value1 = {
      ...value,
      id: idCmt,
      maPhong: roomId,
      ngayBinhLuan: updateComment1?.ngayBinhLuan,
      maNguoiBinhLuan: user?.user?.id,
      saoBinhLuan: updateComment1?.saoBinhLuan,
      noiDung: getValues("noiDung"),
    };
    const data = await dispatch(updateComment(value1));
    if (data?.payload?.statusCode === 200) {
      swal({
        title: `Cập nhật đánh giá thành công`,
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
      }).then((willSuccess) => {
        if (willSuccess) {
          setCancel(false);
        }
      });
    }
    dispatch(commentUpdated(data));
  };
  const onErr = (error) => {
    console.log(error);
  };
  const handleUpdateSendComment = (index) => {
    // setValue("noiDung", inputRef.current.value);
  };
  if (isLoading || isLoad)
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
      <div>
        <div className="mx-2 mt-3">
          <h4 className=" d-inline-flex align-items-center ms-2">
            <div className="d-inline-flex align-items-center">
              Rate:{" "}
              {(comments?.length > 0
                ? total / comments?.length
                : 0 / 5
              ).toFixed(1)}
            </div>
            <div className="d-inline-flex align-items-center ms-1 pb-1">
              <i style={{ fontSize: "1.2rem" }} className="bi bi-star-fill"></i>
            </div>
          </h4>
        </div>
      </div>
      {comments?.length > 0 ? (
        comments?.map((item, index) => {
          const ngay = new Date(item.ngayBinhLuan);
          const show =
            user?.user?.name === item.tenNguoiBinhLuan &&
            user?.user?.avatar === item.avatar
              ? true
              : false;
          return (
            <div key={index} className="userComment">
              <div className="mx-3 mt-3">
                <span className="me-2">
                  <img src={item?.avatar} alt="" className="hinhAnh" />
                </span>
                <span>{item?.tenNguoiBinhLuan}</span>
              </div>
              <div className="mx-4 mt-1">
                <div>
                  {item.saoBinhLuan >= 1 && item.saoBinhLuan <= 5 && (
                    <>
                      {[...Array(item.saoBinhLuan)].map((_, index) => (
                        <i key={index} className="bi bi-star-fill"></i>
                      ))}
                      {[...Array(5 - item.saoBinhLuan)].map((_, index) => (
                        <i key={index} className="bi bi-star"></i>
                      ))}
                    </>
                  )}
                </div>
                <div style={{ fontSize: "0.8rem" }}>{`${
                  ngay.getDate() < 10 ? "0" + ngay.getDate() : ngay.getDate()
                }/${
                  ngay.getMonth() + 1 < 10
                    ? "0" + (ngay.getMonth() + 1)
                    : ngay.getMonth() + 1
                }/${ngay.getFullYear()}`}</div>
                <div className="noiDung mt-3 pb-2">
                  {cancel && indexx === index ? (
                    <>
                      <form onSubmit={handleSubmit(onSubmit, onErr)}>
                        <textarea
                          className="form-control"
                          type="text"
                          ref={inputRef}
                          key={index}
                          onChange={(e) => {
                            setValue("noiDung", e.target.value);
                            handleChange();
                          }}
                          {...register("noiDung")}
                        />
                        {/* send &&*/}
                        {
                          <button
                            type="submit"
                            className="btn sendButton text-success border-transparent"
                            onClick={() => handleUpdateSendComment(index)}
                          >
                            <i class="bi bi-send"></i>
                          </button>
                        }
                      </form>
                      {errors.noiDung && (
                        <p className="ms-3 fs-7 text-danger fst-italic">
                          {errors.noiDung.message}
                        </p>
                      )}
                    </>
                  ) : (
                    item.noiDung
                  )}
                </div>
              </div>
              {show ? (
                <div className="userButton">
                  {cancel && indexx === index ? (
                    <button
                      className="btn text-warning border-transparent"
                      onClick={() => handleCancelComment(index)}
                    >
                      <i class="bi bi-x-square"></i>
                    </button>
                  ) : (
                    <button
                      className="btn text-primary border-transparent"
                      onClick={() => handleUpdateComment(index)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                  <button
                    className="btn text-danger border-transparent"
                    onClick={() => handleDeleteComment(index)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <div className="mx-3 mt-2">
          <div>Chưa có đánh giá</div>
        </div>
      )}
    </>
  );
}

export default Comment;
