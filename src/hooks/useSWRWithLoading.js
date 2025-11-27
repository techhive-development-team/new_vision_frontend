import useSWR from "swr";
import { useContext, useEffect, useRef } from "react";
import LoadingContext from "@/context/LoadingContext";

export const useSWRWithLoading = (key, fetcher) => {
  const { startLoading, finishLoading } = useContext(LoadingContext);
  const loadingStartedRef = useRef(false);

  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  useEffect(() => {
    if (key && !loadingStartedRef.current) {
      startLoading(key);
      loadingStartedRef.current = true;
    }

    return () => {
      if (key && loadingStartedRef.current) {
        finishLoading(key);
        loadingStartedRef.current = false;
      }
    };
  }, [key, startLoading, finishLoading]);

  useEffect(() => {
    if (key && (data || error) && loadingStartedRef.current) {
      finishLoading(key);
      loadingStartedRef.current = false;
    }
  }, [data, error, key, finishLoading]);

  return { data, error, isLoading, mutate };
};
