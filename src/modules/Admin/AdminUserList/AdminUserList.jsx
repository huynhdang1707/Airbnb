import React, { useEffect, useState, useRef } from "react";
import "./AdminUserList.scss";
import Pagination from "rc-pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getUserListPage } from "../../../slices/userListPageSlice";
import { apiDeleteUser } from "../../../apis/userManagementAPI";
import { userUpdated } from "../../../slices/updateUserSlice";
import UserForm from "../../UserForm/UserForm";

function AdminUserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const deleteUser = useRef(null);

  //Search by name
  const handleInput = (evt) => {
    if (evt?.key == "Enter" || evt?.key == "Tab") {
      setSearchInput(evt?.target?.value);
    }
  };

  const { users, isLoading, error } = useSelector(
    (state) => state.userListPage
  );
  const { updated } = useSelector((state) => state.updateUser);
  useEffect(() => {
    dispatch(
      getUserListPage({
        pageIndex: current,
        pageSize: 10,
        keyword: searchInput ? searchInput : null,
      })
    );
  }, [current, updated, searchInput, deleteUser]);
  const [updateUser, setUpdateUser] = useState();
  const handleUpdateUser = (index) => {
    setUpdateUser(users?.data[index]);
    setShow(true);
    dispatch(userUpdated(false));
  };

  const handleDeleteUser = async (userId, index) => {
    await swal({
      title: "Bạn có muốn xóa người dùng?",
      text: "Nhấn Ok để tiếp tục!",
      icon: "warning",
      buttons: true,
    }).then((willSuccess) => {
      if (willSuccess) {
        try {
          const data = apiDeleteUser(userId);
          //   setDeleteUser(data);
          deleteUser.current = data;
          index === 0 && users?.totalRow % 10 === 1
            ? setCurrent(current - 1)
            : setCurrent(current);
          dispatch(
            getUserListPage({
              pageIndex: current,
              pageSize: 10,
            })
          );
        } catch (error) {
          console.log(error);
        }
        swal({
          title: `Xóa người dùng thành công`,
          text: "Nhấn Ok để tiếp tục!",
          icon: "success",
        }).then((willSuccess) => {
          deleteUser.current = null;
        });
      }
    });
  };
  const PaginationChange = (page) => {
    setCurrent(page);
  };
  const handleShow = (value) => {
    setShow(value);
  };
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
    <div className="userManagement">
      <h2>Danh sách người dùng</h2>
      <div className="d-flex justify-content-around">
        <div className="input-group w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên người dùng và nhấn Enter..."
            name="inputValue"
            onKeyDown={handleInput}
          />
          <button
            className="button"
            onClick={() => navigate("/admin/add-user")}
          >
            Thêm người dùng mới
          </button>
        </div>
      </div>

      <div className="body">
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr className="th1">
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Loại người dùng</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.map((item, index) => {
                  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
                  return (
                    <tr key={index} className="th2">
                      <th>{index + 1 + (current - 1) * 10}</th>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender ? "Nam" : "Nữ"}</td>
                      <td>{regex.test(item.birthday) ? item.birthday : ""}</td>
                      <td>{item.phone}</td>
                      <td>
                        {item.role === "ADMIN" ? "Quản trị" : "Khách hàng"}
                      </td>
                      <td>
                        <button
                          className="btn text-secondary me-1 border-warning"
                          onClick={() => handleUpdateUser(index)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn text-danger border-success"
                          onClick={() => handleDeleteUser(item.id, index)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              onChange={PaginationChange}
              total={Math.ceil(users.totalRow / 10)}
              current={current}
              pageSize={1}
              className="pagination1"
            />
          </div>
        </div>
      </div>
      <UserForm
        onShow={show}
        handleShow={handleShow}
        onUpdateUser={updateUser}
      />
    </div>
  );
}

export default AdminUserList;
