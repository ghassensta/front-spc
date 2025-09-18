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

export function useGetEtablissement(slug) {
  const url = endpoints.etablissements.detail(slug);

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      etablissement: data?.etablissement || null,
      types: data?.types || [],
      simlairesEtablissment: data?.simlairesEtablissment || [],
    }),
    [data]
  );

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
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    throw error;
  }

};