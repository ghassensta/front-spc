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

    console.log(data)

    const memoizedValue = useMemo(
        () => ({
            actualites: data?.actualites || [],
            actualitesLoading: isLoading
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
