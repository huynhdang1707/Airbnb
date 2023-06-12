import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import signupReducer from "./slices/signUpSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
  },
});

export default store;
