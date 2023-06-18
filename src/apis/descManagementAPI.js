import axiosClient from "./axiosClient";

//Lấy danh sách vị trí theo trang
export const apiGetDescListPage = async (value) => {
  const payload = { ...value };
  const { data } = await axiosClient.get("/vi-tri/phan-trang-tim-kiem", {
    params: payload,
  });
  return data;
};

//Thêm vị trí
export const apiCreateDesc = async (desc) => {
  const { data } = await axiosClient.post("/vi-tri", desc);
  return data;
};

//Xóa vị trí
export const apiDeleteDesc = async (descId) => {
  const { data } = await axiosClient.delete(`/vi-tri/${descId}`);
  return data;
};

//update vị trí
export const apiUpdateDesc = async (value) => {
  const { data } = await axiosClient.put(`/vi-tri/${value.id}`, value);
  return data;
};

//upload hình ảnh vị trí
export const apiUploadDescImg = async (value) => {
    const data = await axiosClient.post("/vi-tri/upload-hinh-vitri",{
        params: {
            maViTri: value.maViTri,
          }
    });
    return data;
  };
