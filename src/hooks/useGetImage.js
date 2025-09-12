import useSWR from "swr";
import { hooks } from "../client/hook";
import { API_URLS } from "../client/url";

export const useGetImageById = (id) => {
  const key = id ? [`${API_URLS.IMAGE}/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.getImagesById(id)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetCourse = () => {
  const key = API_URLS.COURSE;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.useGetCourse()
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
