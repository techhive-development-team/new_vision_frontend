import { useSWRWithLoading } from "./useSWRWithLoading";
import { hooks } from "../client/hook";
import { API_URLS } from "../client/url";

export const useGetImageById = (id) => {
  const key = id ? `${API_URLS.IMAGE}/${id}` : null;
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
    `${API_URLS.STUDENTREVIEW}/front`,
    () => hooks.getStudentReview()
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetStudentReviewById = (id) => {
  const key = id ? `${API_URLS.STUDENTREVIEW}/front/${id}` : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.getStudentReviewById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetCourseById = (id) => {
  const key = id ? `${API_URLS.COURSE}/front/${id}` : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.useGetCourseById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetCountry = () => {
  const { data, error, isLoading, mutate } = useSWRWithLoading(
    `${API_URLS.FUTURECOUNTRY}/front`,
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
  const key = id ? `${API_URLS.HAPPENING}/${id}` : null;
  const { data, error, isLoading, mutate } = useSWRWithLoading(key, () =>
    hooks.getHappeningById(id)
  );
  return { data: data?.data, error, isLoading, mutate };
};

export const useGetHappeningTypeById = (id, page = 1, limit = 6) => {
  const offset = (page - 1) * limit;
  const key = id ? `${API_URLS.HAPPENING}/front/type/${id}?offset=${offset}&limit=${limit}` : null;

  const { data, error, isLoading } = useSWRWithLoading(
    key,
    () => hooks.getHappeningTypeById(id, { offset, limit }),
    { keepPreviousData: false }
  );

  return {
    data: data?.data || {},
    total: data?.meta?.total || 0,
    isLoading,
    error,
  };
};
