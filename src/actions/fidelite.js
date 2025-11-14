import { useMemo } from "react";
import useSWR from "swr";
import { endpoints, fetcher, poster } from "src/utils/axios";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function useGetPointsFidelite() {
  const url = endpoints.fidelite.get;

  const { data, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      points: data?.data || null, 
      loading: isLoading,
      validating: isValidating,
    }),
    [data, isLoading, isValidating]
  );

  return memoizedValue;
}

export const useExchangePoints = async (montant) => {
  try {
    const url = endpoints.fidelite.exchangePoints;
    const res = await poster(url, { montant });
    return res;
  } catch (error) {
    console.error("Erreur échange points:", error);
    throw error;
  }
};