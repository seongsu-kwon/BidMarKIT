import instance from "./instance";

export const postQuestion = async (data) => {
  const response = await instance.post("/question", data);
  return response;
};

export const postAnswer = async (data) => {
  const response = await instance.post("/answer", data);
  return response;
};
