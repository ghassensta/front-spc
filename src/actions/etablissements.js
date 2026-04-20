import { useMemo } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { endpoints, fetcher, poster } from "src/utils/axios";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

// ─── Hook simple (inchangé) ───────────────────────────────────────────────────
export function useGetEtablissements() {
  const url = endpoints.etablissements.list;
  const { data } = useSWR(url, fetcher, swrOptions);
  return useMemo(() => ({ etablissements: data?.etablissements || [] }), [data]);
}

// ─── Hook pagination infinie + filtres serveur ────────────────────────────────
export function useGetAllEtablissementsInfinite(filters = {}) {
  /**
   * La clé change dès qu'un filtre change → SWR repart de la page 1 automatiquement.
   * previousPageData === null  : on est sur la page 1
   * previousPageData.pagination.has_more === false : plus de pages
   */
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.pagination?.has_more) return null;

    const params = new URLSearchParams({ page: pageIndex + 1 });
    if (filters.region_id)  params.set("region_id",  filters.region_id);
    if (filters.type_id)    params.set("type_id",    filters.type_id);
    if (filters.service_id) params.set("service_id", filters.service_id);

    return `${endpoints.etablissements.getAll}?${params.toString()}`;
  };

  const { data, isLoading, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateFirstPage: false, revalidateOnFocus: false }
  );

  return useMemo(() => {
    const etablissements = data ? data.flatMap((d) => d.etablissements ?? []) : [];
    const lastPage       = data?.[data.length - 1];
    const pagination     = lastPage?.pagination ?? {};

    return {
      etablissements,
      etablissementLoading: isLoading,
      isLoadingMore: isValidating && !isLoading,
      hasMore: pagination.has_more ?? false,
      total:   pagination.total   ?? 0,
      loadMore: () => setSize((s) => s + 1),
    };
  }, [data, isLoading, isValidating, setSize]);
}

// ─── Détail établissement ─────────────────────────────────────────────────────
export function useGetEtablissement(slug) {
  const url = endpoints.etablissements.detail(slug);
  const { data, isLoading, error } = useSWR(url, fetcher, swrOptions);

  return useMemo(
    () => ({
      etablissement:          data?.etablissement        || null,
      types:                  data?.types                || [],
      simlairesEtablissment:  data?.similairesEtablissement || [],
      avis:                   data?.avis                 || [],
      marquesPartenaires:     data?.marquesPartenaires   || [],
      loading: isLoading,
      error,
    }),
    [data, isLoading, error]
  );
}

// ─── Avis (inchangé) ──────────────────────────────────────────────────────────
export const usePostEtablissementsAvis = async ({ name, email, comment, ratings, id }) => {
  const res = await poster(endpoints.etablissements.avis, { name, email, comment, ratings, id });
  return res;
};

// ─── Filtres (inchangé) ───────────────────────────────────────────────────────
export function useGetFiltersEtablissements() {
  const url = endpoints.etablissements.filters;
  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  return useMemo(
    () => ({
      villes:        data?.region_villes        || [],
      types:         data?.types_etablissements  || [],
      services:      data?.services_equipements  || [],
      formules:      data?.formules              || [],
      filtersLoading: isLoading,
    }),
    [data]
  );
}