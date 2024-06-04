import instance from "./instance";

export const getNotification = async () => {
  const response = await instance
    .get(`/alarmlog`)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
    });

  return response;
};
