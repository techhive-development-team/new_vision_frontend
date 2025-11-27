import useSWR from "swr";
import { useContext, useEffect } from "react";
import LoadingContext from "@/context/LoadingContext";

export const useSWRWithLoading = (key, fetcher) => {
  const { startLoading, finishLoading } = useContext(LoadingContext);

  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  useEffect(() => {
    if (key) {
      startLoading(key);
    }

    return () => {
      if (key) {
        finishLoading(key);
      }
    };
  }, [key]);

  useEffect(() => {
    if (key && (data || error)) {
      finishLoading(key);
    }
  }, [data, error, key]);

  return { data, error, isLoading, mutate };
};
