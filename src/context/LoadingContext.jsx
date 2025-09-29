import React, { createContext, useState, useCallback, useMemo } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(
    () => setLoadingCount((prev) => prev + 1),
    []
  );
  const finishLoading = useCallback(
    () => setLoadingCount((prev) => Math.max(prev - 1, 0)),
    []
  );

  const value = useMemo(
    () => ({ loadingCount, startLoading, finishLoading }),
    [loadingCount, startLoading, finishLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
