import axios from 'axios';
const maNhom = "";

const axiosClient = axios.create({
    baseURL:"https://airbnbnew.cybersoft.edu.vn/api",
    headers:{
        TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjEwLzEwLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5Njg5NjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk3MDQzNjAwfQ.g_aUM-jnWQ1i_eCbjNfvNxudUdUPpfC36068g5o9Ung"
    },
})

// axiosClient.interceptors.request.use((config) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if(user) {
//         config.headers.Authorization = `Bearer ${}`
//     }
// })

export default axiosClient