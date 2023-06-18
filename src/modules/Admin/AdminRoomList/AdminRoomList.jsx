import React, { useEffect, useState, useRef } from "react";
import "./AdminRoomList.scss";
import Pagination from "rc-pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getRoomListPage } from "../../../slices/roomListPage";
import { apiDeleteRoom } from "../../../apis/roomManagementAPI";
import { roomUpdated } from "../../../slices/updateRoomSlice";
import RoomForm from "../../RoomForm/RoomForm";

function AdminRoomList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const deleteRoom = useRef(null);

  //Search by name
  const handleInput = (evt) => {
    if (evt?.key == "Enter" || evt?.key == "Tab") {
      setSearchInput(evt?.target?.value);
    }
  };
  const { rooms, isLoading, error } = useSelector(
    (state) => state.roomListPage
  );
  const { updated } = useSelector((state) => state.updateRoom);
  useEffect(() => {
    dispatch(
      getRoomListPage({
        pageIndex: current,
        pageSize: 10,
        keyword: searchInput ? searchInput : null,
      })
    );
  }, [current, updated, searchInput, deleteRoom]);
  const [updateRoom, setUpdateRoom] = useState();
  const handleUpdateRoom = (index) => {
    setUpdateRoom(rooms?.data[index]);
    setShow(true);
    dispatch(roomUpdated(false));
  };
  const handleDeleteRoom = async (roomId, index) => {
    await swal({
      title: "Bạn có muốn xóa phòng thuê?",
      text: "Nhấn Ok để tiếp tục!",
      icon: "warning",
      buttons: true,
    }).then((willSuccess) => {
      if (willSuccess) {
        try {
          const data = apiDeleteRoom(roomId);
          //   setDeleteUser(data);
          deleteRoom.current = data;
          index === 0 && rooms?.totalRow % 10 === 1
            ? setCurrent(current - 1)
            : setCurrent(current);
          dispatch(
            getRoomListPage({
              pageIndex: current,
              pageSize: 10,
            })
          );
        } catch (error) {
          console.log(error);
        }
        swal({
          title: `Xóa phòng thuê thành công`,
          text: "Nhấn Ok để tiếp tục!",
          icon: "success",
        }).then((willSuccess) => {
          deleteRoom.current = null;
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
    <div className="roomManagement">
      <h2>Danh sách phòng thuê</h2>
      <div className="d-flex justify-content-around">
        <div className="input-group w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên phòng thuê và nhấn Enter..."
            name="inputValue"
            onKeyDown={handleInput}
          />
          <button
            className="button"
            onClick={() => navigate("/admin/add-room")}
          >
            Thêm phòng thuê mới
          </button>
        </div>
      </div>

      <div className="body">
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr className="th1">
                  <th scope="col" >#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên Phòng</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms?.data?.map((item, index) => {
                  return (
                    <tr key={index} className="th2">
                      <th>{index + 1 + (current - 1) * 10}</th>
                      <td>{item.id}</td>
                      <td>
                        <img src={item.hinhAnh} alt={item.id} />
                      </td>
                      <td>{item.tenPhong}</td>
                      <td>{item.moTa}</td>
                      <td>
                        <button
                          className="btn text-secondary me-1 border-warning mt-1"
                          onClick={() => handleUpdateRoom(index)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn text-danger border-success mt-1"
                          onClick={() => handleDeleteRoom(item.id, index)}
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
              total={Math.ceil(rooms.totalRow / 10)}
              current={current}
              pageSize={1}
              className="pagination2"
            />
          </div>
        </div>
      </div>
      <RoomForm
        onShow={show}
        handleShow={handleShow}
        onUpdateRoom={updateRoom}
      />
    </div>
  );
}

export default AdminRoomList;
