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
  const url = endpoints.credits.get; // → /api/auth/credits-panier

  const { data, isLoading, isValidating, error } = useSWR(url, fetcher, swrOptions);

  // ========== DEBUG CRÉDITS ==========
  console.group("useGetCreditsPanier - Debug");
  console.log("URL appelée :", url);
  console.log("isLoading :", isLoading);
  console.log("isValidating :", isValidating);
  console.log("error :", error);
  console.log("data brute (réponse complète) :", data);
  console.log("Crédits trouvés (data?.credits ou data?.data) :", data?.credits || data?.data);
  console.log("Est-ce un tableau ?", Array.isArray(data?.credits || data?.data));
  console.groupEnd();
  // ====================================

  const memoizedValue = useMemo(
    () => ({
      // La plupart des backends renvoient soit data.credits, soit data.data
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