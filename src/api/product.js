import axiosInstance from './axiosInstance';
import instance from './instance';

export const getProducts = async (data) => {
    const { pageNum, size } = data;
    const response = await axiosInstance
        .get(`/products/${pageNum}/${size}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};

export const getProduct = async (id) => {
    const response = await axiosInstance
        .get(`/products/${id}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });
    return response;
};

export const bidProduct = async (data) => {
    const response = await instance.post('bid', data);
    return response;
};

export const autoBidProduct = async (data) => {
    const response = await instance.post('auto-bid', data);
    return response;
};

export const purchaseProduct = async (data) => {
    const response = await instance.post('purchase', data);
    return response;
};

export const getBids = async (id) => {
    const response = await axiosInstance
        .get(`/bids/${id}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });
    return response;
};

export const getTestBids = async () => {
    const response = await instance.get('/bid');
    return response;
};
