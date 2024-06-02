import axios from "axios";
import axiosInstance from "./axiosInstance";

export const login = async (data) => {
  const response = await axiosInstance.post("/login", data);
  return response;
};

export const register = async (data) => {
  const response = await axiosInstance.post("/member", data);
  return response;
};

export const postFCMToken = async (data) => {
  //   const response = await axios.post(
  //     "http://34.64.122.221:8000/postFCMToken",
  //     data
  //   );
  const response = await axiosInstance.post("/postFCMToken", data);
  return response;
};
