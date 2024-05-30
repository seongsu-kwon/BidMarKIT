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

export const putTradeCheck = async (data) => {
    const { roomId, checkType } = data;
    const response = await instance
        .put(`/chatRooms/${roomId}/check/${checkType}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};

// export const putTradeFailure = async (data) => {
//     const { productId } = data;
//     const response = await instance
//         .put(`/products/${productId}/failure`)
//         .then((res) => res)
//         .catch((err) => {
//             console.error(err);
//         });

//     return response;
// };

// export const putTradeSuccess = async (data) => {
//     const { productId } = data;
//     const response = await instance
//         .put(`/products/${productId}/success`)
//         .then((res) => res)
//         .catch((err) => {
//             console.error(err);
//         });

//     return response;
// };
