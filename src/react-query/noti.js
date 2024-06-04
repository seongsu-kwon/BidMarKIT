import { getNotification } from "api/noti";
import { useQuery } from "react-query";

export const useGetNotification = () => {
  const { data, isLoading, isError } = useQuery(["notifications"], () =>
    getNotification()
  );

  console.log("data", data?.data);

  return { notifications: data?.data, isLoading, isError };
};
