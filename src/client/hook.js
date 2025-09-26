import { client } from "./client";
import { API_URLS } from "./url";

const getImagesById = async (id) => {
  const response = await client.exec(`${API_URLS.IMAGETYPE}/main/${id}`, {
    method: "get",
  });
  return response;
};

const getEducationPartnerInstitute = async () => {
  const response = await client.exec(
    `${API_URLS.EDUCATION_PARTNER}/front/institute`,
    {
      method: "get",
    }
  );
  return response;
};

const getEducationPartnerUniversity = async () => {
  const response = await client.exec(
    `${API_URLS.EDUCATION_PARTNER}/front/university`,
    {
      method: "get",
    }
  );
  return response;
};

const useGetCourse = async () => {
  const response = await client.exec(`${API_URLS.COURSE}/front`, {
    method: "get",
  });
  return response;
};

const useGetCourseById = async (id) => {
  const response = await client.exec(`${API_URLS.COURSE}/front/${id}`, {
    method: "get",
  });
  return response;
};

const getStudentReview = async () => {
  const response = await client.exec(`${API_URLS.STUDENTREVIEW}`, {
    method: "get",
  });
  return response;
};

const getFutureCountry = async () => {
  const response = await client.exec(`${API_URLS.FUTURECOUNTRY}`, {
    method: "get",
  });
  return response;
};

const getHappenings = async () => {
  const response = await client.exec(`${API_URLS.HAPPENING}`, {
    method: "get",
  });
  return response;
}
export const getHappeningById = async (id) => {
  const response = await client.exec(`${API_URLS.HAPPENING}/${id}`, {
    method: "get",
  });
  return response;
};

export const getHappeningTypeById = async (id) => {
  const response = await client.exec(`${API_URLS.HAPPENINGTYPE}/${id}`, {
    method: "get",
  });
  return response;
};

export const getHappeningTypes = async () => {
  const response = await client.exec(`${API_URLS.HAPPENINGTYPE}`, {
    method: "get",
  });
  return response;
};
export const hooks = {
  getImagesById,
  useGetCourse,
  useGetCourseById,
  getFutureCountry,
  getEducationPartnerInstitute,
  getEducationPartnerUniversity,
  getStudentReview,
  getHappenings,
  getHappeningById,
  getHappeningTypes,
  getHappeningTypeById,
};
