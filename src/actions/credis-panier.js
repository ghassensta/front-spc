// src/actions/credis-panier.js  (ou ton chemin exact)

import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function useGetCreditsPanier() {
  const url = endpoints.credits.get; 
  const { data, isLoading, isValidating, error } = useSWR(url, fetcher, swrOptions);

 

  const memoizedValue = useMemo(
    () => ({
      credits: Array.isArray(data?.credits)
        ? data.credits
        : Array.isArray(data?.data)
        ? data.data
        : [],
      loading: isLoading,
      validating: isValidating,
      error,
    }),
    [data, isLoading, isValidating, error]
  );

  return memoizedValue;
}