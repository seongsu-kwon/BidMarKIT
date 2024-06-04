import { postQuestion, postAnswer } from "../api/qna";
import { useMutation } from "react-query";

export const usePostQuestion = () => {
  return useMutation((data) => postQuestion(data), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const usePostAnswer = () => {
  return useMutation((data) => postAnswer(data), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
