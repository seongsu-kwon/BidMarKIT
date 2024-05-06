import axiosInstance from './axiosInstance';

export const login = async (data) => {
    const response = await axiosInstance.post('/login', data);
    return response;
};

export const register = async (data) => {
    const response = await axiosInstance.post('/member', data);
    return response;
};
