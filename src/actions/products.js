import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetProducts() {
    const url = endpoints.product.list; 

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            products: data?.products || [],
        }),
        [data]
    );

    return memoizedValue;
}

export function useGetProduct(slug) {
    const url = endpoints.product.detail(slug);

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            product: data?.product || null,
        }),
        [data]
    );

    return memoizedValue;
}

export function usePostProductAvis() {
    const url = endpoints.product.avis;

    const { data } = useSWR(url, poster, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            avis: data?.avis || [],
        }),
        [data]
    );

    return memoizedValue;
}