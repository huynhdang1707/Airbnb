import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import signupReducer from "./slices/signUpSlice";
import infoUserSlice from "./slices/infoUserSlice";
import userListPageSlice from "./slices/userListPageSlice";
import updateUserSlice from "./slices/updateUserSlice";
import adminCreateUser from "./slices/adminCreateUser";
import roomListPageSlice from "./slices/roomListPage";
import updateRoomSlice from "./slices/updateRoomSlice";
import adminCreateRoom from "./slices/adminCreateRoom";

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    infoUser: infoUserSlice,
    userListPage: userListPageSlice,
    updateUser: updateUserSlice,
    createUser: adminCreateUser,
    roomListPage: roomListPageSlice,
    updateRoom: updateRoomSlice,
    createRoom: adminCreateRoom,
  },
});

export default store;
