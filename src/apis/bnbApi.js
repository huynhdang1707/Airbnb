import axiosClient from "./axiosClient";

export const apiPhongThue = async (id) => {
    const {data} = await axiosClient.get('/phong-thue', {
        params: {
            id:id,
        }
    });
    return data;
}
