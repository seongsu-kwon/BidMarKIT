import axiosInstance from './axiosInstance';
import instance from './instance';

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

export const getChatRoom = async (roomId) => {
    const response = await instance
        .get(`/chatRooms/${roomId}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};
