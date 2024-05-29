import axiosInstance from './axiosInstance';
import instance from './instance';

export const getProducts = async (data) => {
    const { pageNum, size } = data;
    const response = await axiosInstance
        .get(`/products?pageNum=${pageNum}&size=${size}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};

export const getSuggestProducts = async (data) => {
    const { pageNum, size } = data;
    const response = await instance
        .get(`/suggest/products?pageNum=${pageNum}&size=${size}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};

export const getProduct = async (id) => {
    const response = await instance
        .get(`/products/${id}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });
    return response;
};

export const bidProduct = async (data) => {
    console.log('넘어온 api 데이터', data);
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

export const getSaleHistories = async (data) => {
    const { status, pageNum, size } = data;
    const response = await instance
        .get(`/sale?state=${status}&pageNum=${pageNum}&size=${size}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};

export const getPurchaseHistories = async (data) => {
    const { pageNum, size } = data;
    const response = await instance
        .get(`/purchase?pageNum=${pageNum}&size=${size}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};
