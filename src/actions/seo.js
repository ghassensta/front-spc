import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetList() {
  const url = endpoints.pageseo.list;

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      pageseo: data?.data || [],
      pageseoLoading: isLoading,
    }),
    [data]
  );

  return memoizedValue;
}

export function useGetSeoPageDetail(slug) {
  const url = endpoints.pageseo.details(slug);

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      page: data?.data || null,
      loading: isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}


