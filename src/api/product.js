import instance from './instance';

export const getProducts = async () => {
    const response = await instance.get('/products');
    return response;
};

export const getProduct = async (id) => {
    const response = await instance.get(`/products/${id}`);
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
    const response = await instance.get(`/bids/${id}`);
    return response;
};

export const getTestBids = async () => {
    const response = await instance.get('/bid');
    return response;
};
