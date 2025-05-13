import { urls } from "./urls";
import { generateHttpClient } from "./client";

export const getAllPRoducts = async (query) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.products.sneaker+query);
  return response.data;
};
export const getAllBrands = async () => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.products.brand);
  return response.data;
};