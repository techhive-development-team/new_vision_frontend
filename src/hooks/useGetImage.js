import { useSWRWithLoading } from "./useSWRWithLoading";
import { hooks } from "../client/hook";
import { API_URLS } from "../client/url";

export const useGetImageById = (id) => {
  const key = id ? [`${API_URLS.IMAGE}/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.getImagesById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetCourse = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    API_URLS.COURSE,
    () => hooks.useGetCourse()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetEducationPartnerInstitute = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    `${API_URLS.EDUCATION_PARTNER}/front/institute`,
    () => hooks.getEducationPartnerInstitute()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetEducationPartnerUniversity = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    `${API_URLS.EDUCATION_PARTNER}/front/university`,
    () => hooks.getEducationPartnerUniversity()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetStudentReview = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    API_URLS.STUDENTREVIEW,
    () => hooks.getStudentReview()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetStudentReviewById = (id) => {
  const key = id ? [`${API_URLS.STUDENTREVIEW}/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.getStudentReviewById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetCourseById = (id) => {
  const key = id ? [`${API_URLS.COURSE}/front/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.useGetCourseById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetCountry = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    API_URLS.FUTURECOUNTRY,
    () => hooks.getFutureCountry()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetHappenings = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    API_URLS.HAPPENING,
    () => hooks.getHappenings()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetHappeningById = (id) => {
  const key = id ? [`${API_URLS.HAPPENING}/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.getHappeningById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetHappeningTypeById = (id) => {
  const key = id ? [`${API_URLS.HAPPENINGTYPE}/${id}`] : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.getHappeningTypeById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};
