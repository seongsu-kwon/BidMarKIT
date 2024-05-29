import { atom, selector, selectorFamily } from "recoil";
import axiosInstance from "api/axiosInstance";
import instance from "api/instance";

export const allItemsPreviewState = selectorFamily({
  key: "allItemsPreviewState",
  get: (count) => async () => {
    const { content } = await axiosInstance
      .get("/products?pageNum=0&size=8")
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
      });

    console.log("COUNT", count);

    const results = [];

    while (content.length) {
      results.push(content.splice(0, count));
    }
    return results;
  },
});

export const suggestItemsPreviewState = selectorFamily({
  key: "suggestItemsPreviewState",
  get: (count) => async () => {
    if (localStorage.getItem("accessToken") === null) return [];
    const { content } = await instance
      .get("/suggest/products?pageNum=0&size=8")
      .then((res) => res.data)
      .catch((err) => {
        return {
          content: [],
        };
      });

    console.log("COUNT", count);

    const results = [];

    while (content.length) {
      results.push(content.splice(0, count));
    }
    return results;
  },
});
