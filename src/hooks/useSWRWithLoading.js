import useSWR from "swr";

export const useSWRWithLoading = (key, fetcher) => {
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  return { data, error, isLoading, mutate };
};
