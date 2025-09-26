import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetEtablissements() {
  const url = endpoints.etablissements.list;

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      etablissements: data?.etablissements || [],
    }),
    [data]
  );

  return memoizedValue;
}

export function useGetAllEtablissements() {
  const url = endpoints.etablissements.getAll;
  const { data, isLoading } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      etablissements: data?.etablissements || [],
      etablissementLoading: isLoading,
    }), [data]
  );

  return memoizedValue;
}

export function useGetEtablissement(slug) {
  const url = endpoints.etablissements.detail(slug);

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      etablissement: data?.etablissement || null,
      types: data?.types || [],
      simlairesEtablissment: data?.similairesEtablissement || [],
      avis: data?.avis || [],
      marquesPartenaires: data?.marquesPartenaires || [],
      loading: isLoading,
    }),
    [data]
  );

  console.log(data)

  return memoizedValue;
}

export const usePostEtablissementsAvis = async ({
  name,
  email,
  comment,
  ratings,
  id,
}) => {
  try {
    const url = endpoints.etablissements.avis;
    const params = { name, email, comment, ratings, id };

    const res = await poster(url, params);

    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la soumission de l'avis:", error);
    throw error;
  }

};

export function useGetFiltersEtablissements() {
    const url = endpoints.etablissements.filters;

    const { data, isLoading } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            villes: data?.region_villes || [],
            types: data?.types_etablissements || [],
            services: data?.services_equipements || [],
            filtersLoading: isLoading
        }),
        [data]
    ); 
    return memoizedValue;
}