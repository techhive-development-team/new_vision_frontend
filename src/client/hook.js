import { client } from "./client";
import { API_URLS } from "./url";

const getImagesById = async (id) => {
  const response = await client.exec(`${API_URLS.IMAGETYPE}/main/${id}`, {
    method: "get",
  });
  return response;
};

const useGetCourse = async () => {
  const response = await client.exec(`${API_URLS.COURSE}/front`, {
    method: "get",
  });
  return response;
};
export const hooks = { getImagesById, useGetCourse };
