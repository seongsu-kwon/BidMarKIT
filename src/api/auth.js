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
  const response = await axios.post(
    // "http://34.64.122.221:8000/postFCMToken",
    // "http://35.216.48.190:8000/postFCMToken",
    "https://cloudrunpushserver-l72tmny6da-du.a.run.app/postFCMToken",
    data
  );

  return response;
};
