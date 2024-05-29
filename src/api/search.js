import axiosInstance from "./axiosInstance";

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
  const { keyword, category, sort, state, pageNum, size } = data;

  console.log("searchapi검색어", keyword);
  console.log("searchapi카테고리", category);

  let req =
    keyword !== ""
      ? `/search/products?keyword=${keyword}&category=${category}&sort=${sort}&state=${state}&pageNum=${pageNum}&size=${size}`
      : `/search/products?category=${category}&sort=${sort}&state=${state}&pageNum=${pageNum}&size=${size}`;

  const response = await axiosInstance
    .get(req)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
    });

  return response;
};
