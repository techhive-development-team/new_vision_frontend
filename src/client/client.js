import { baseUrl } from "./url";

const exec = async (endPoint, config) => {
  const headers = {
    "content-type": "application/json",
  };
  const response = await fetch(`${baseUrl}${endPoint}`, {
    ...config,
    headers: {
      ...headers,
      ...config?.headers,
    },
  });
  return await response.json();
};

export const client = { exec };
