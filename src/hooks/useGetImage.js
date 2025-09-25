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

export const useGetEducationPartnerInstitute = () => {
  const key = API_URLS.EDUCATION_PARTNER;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.getEducationPartnerInstitute()
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetEducationPartnerUniversity = () => {
  const key = API_URLS.EDUCATION_PARTNER;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.getEducationPartnerUniversity()
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetStudentReview = () => {
  const key = API_URLS.STUDENTREVIEW;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.getStudentReview()
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetCourseById = (id) => {
  const key = id ? [`${API_URLS.COURSE}/front/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.useGetCourseById(id)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetCountry = () => {
  const key = API_URLS.FUTURECOUNTRY;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    hooks.getFutureCountry()
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
