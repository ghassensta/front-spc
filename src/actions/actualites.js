import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetNews() {
  const url = endpoints.actualites.list;

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      actualites: data?.actualites || [],
      categories: data?.categories || [],
      actualitesLoading: isLoading,
    }),
    [data]
  );

  return memoizedValue;
}

export function useGetNewsDetail(slug) {
  const url = endpoints.actualites.detail(slug);

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      actualite: data?.data || null,
      Loading: isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function useGetLastNews(limit = 3) {
  const url = endpoints.actualites.getLast;

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      actualites: data?.actualites || [],
    }),
    [data]
  );

  return memoizedValue;
}

export function useGetActualitezBySlug(slug) {
  const url = endpoints.actualites.getByCategoriesSlug(slug);
  const { data, isLoading } = useSWR(url, fetcher, swrOptions);
  return useMemo(
    () => ({
      actualites: data?.blogs || [],
      categories: data?.categorie || [],
      actualitesLoading: isLoading,
    }),
    [data, isLoading]
  );
}
