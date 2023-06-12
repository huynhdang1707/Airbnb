import axios from "axios";
import axiosClient from "./axiosClient";

export const apiSignIn = async (value) => {
  const { data } = await axiosClient.post("/auth/signin", value);
  return data;
};

export const apiSignUp = async (value) => {
  const { data } = await axiosClient.post("/auth/signup", value);
  return data;
};
