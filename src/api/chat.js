import axiosInstance from "./axiosInstance";
import instance from "./instance";

export const getChatRooms = async (data) => {
  const { pageNum, size } = data;
  const response = await instance
    .get(`/chatRooms?pageNum=${pageNum}&size=${size}`)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
    });

  return response;
};
