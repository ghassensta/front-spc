import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetCategories() {
  const { data } = useSWR(endpoints.categories.list, fetcher, swrOptions);
  return useMemo(() => ({ categories: data?.categories || [] }), [data]);
}

// ─── Nouveau : accepte filters + page ───────────────────────────────────────
export function useGetSpaByCategory(slug, filters = {}, page = 1) {
  // On construit les query params — on ignore les valeurs null/undefined/""
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("per_page", 12);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value);
    }
  });

  // La clé SWR change à chaque nouveau filtre/page → re-fetch automatique
  const url = slug
    ? `${endpoints.categories.byCategory(slug)}?${params.toString()}`
    : null;

  const { data, isLoading, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true, // garde les données précédentes pendant le chargement → pas de flash blanc
  });

  return useMemo(() => ({
    spaList:      data?.produits    || [],
    pagination:   data?.pagination  || {},
    priceRange:   data?.price_range || { min: 0, max: 1000 },
    category:     data?.categorie   || {},
    catLoading:   isLoading,
    isFiltering:  isValidating && !!data, // filtre en cours mais données déjà présentes
  }), [data, isLoading, isValidating]);
}