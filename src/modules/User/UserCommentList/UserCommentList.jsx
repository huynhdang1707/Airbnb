import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentList } from "../../../slices/commentListSlice";
import "./UserCommentList.scss";
import swal from "sweetalert";
import { Navigate, useNavigate } from "react-router-dom";

function UserCommentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { comments, isLoading, error } = useSelector(
    (state) => state.commentList
  );
  const [commentList, setCommentList] = useState(null);
  useEffect(() => {
    const xxx = comments?.filter(
      (it) => it?.maNguoiBinhLuan === user?.user?.id
    );
    setCommentList(xxx);

    const fetch = async () => {
      const data = await dispatch(getCommentList());
    };
    fetch();
  }, []);
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
    <div className="commentManagement">
      <h2>Danh sách bình luận của bạn</h2>

      <div className="body">
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr className="th1">
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Mã phòng</th>
                  {/* <th scope="col">Mã người dùng</th> */}
                  <th scope="col">Ngày bình luận</th>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Số sao đánh giá</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commentList?.map((item, index) => {
                  const ngay = new Date(item.ngayBinhLuan);
                  return (
                    <tr key={index} className="th2">
                      <th>{index + 1}</th>
                      <td>{item.id}</td>
                      <td>{item.maPhong}</td>
                      {/* <td>{item.maNguoiBinhLuan}</td> */}
                      <td>{`${
                        ngay.getDate() < 10
                          ? "0" + ngay.getDate()
                          : ngay.getDate()
                      }/${
                        ngay.getMonth() + 1 < 10
                          ? "0" + (ngay.getMonth() + 1)
                          : ngay.getMonth() + 1
                      }/${ngay.getFullYear()}`}</td>
                      <td>{item.noiDung}</td>
                      <td>{item.saoBinhLuan}</td>
                      <td>
                        {/* <button
                        className="btn text-secondary me-1 border-warning mt-1"
                        onClick={() => handleUpdateComment(index)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button> */}
                        <button
                          className="btn text-danger border-success mt-1"
                          onClick={() =>
                            navigate(`/phong-thue/${item.maPhong}`)
                          }
                        >
                          <i class="bi bi-box-arrow-right"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCommentList;
