// src/actions/cartes-cadeaux.js (fichier corrigé)

import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function useGetCarteCadeaux() {
  const url = endpoints.cartes.get;

  const { data, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      cartes: data?.data || [],
      loading: isLoading,
      validating: isValidating,
    }),
    [data, isLoading, isValidating]
  );

  return memoizedValue;
}


export async function createPersonalizedCarteCadeaux(prix) {
  if (!prix || isNaN(prix) || prix < 1 || prix > 1000) {
    throw new Error("Montant invalide : doit être un nombre entre 1 et 1000 €.");
  }

  const url = endpoints.cartes.personalize;

  try {
    const response = await poster(url, { prix });

    if (!response || !response.success || !response.data) {
      throw new Error(response?.message || "Échec de la création de la carte personnalisée.");
    }

    return response.data; 
  } catch (error) {
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors || {};
      const prixErrors = validationErrors.prix || ["Le champ prix est requis ou invalide."];
      throw new Error(prixErrors.join(" "));
    }

    throw error; 
  }
}
