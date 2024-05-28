import axiosInstance from './axiosInstance';

export const getSuggestSearch = async (data) => {
    const { keyword } = data;

    const response = await axiosInstance
        .get(`/suggest/keywords?keyword=${keyword}`)
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};

export const getSearchProducts = async (data) => {
    const { keyword, pageNum, size } = data;

    console.log('searchapi검색어', keyword);

    const response = await axiosInstance
        .get(
            `/search/products?keyword=${keyword}&pageNum=${pageNum}&size=${size}`
        )
        .then((res) => res)
        .catch((err) => {
            console.error(err);
        });

    return response;
};
