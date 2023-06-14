import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import signupReducer from "./slices/signUpSlice";
import infoUserSlice from "./slices/infoUserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    infoUser: infoUserSlice,
  },
});

export default store;
