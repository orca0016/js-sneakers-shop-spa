import { generateHttpClient } from "./client";
import { urls } from "./urls";

export const getUserInfo = async () => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.user.info);
  return response.data;
};
