import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetCategories() {
    const url = endpoints.categories.list; 

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            categories: data?.categories || [],
        }),
        [data]
    );

    return memoizedValue
}

export function useGetSpaByCategory(category) {
    const url = `${endpoints.categories.byCategory(category)}`; 

    const { data, isLoading } = useSWR(url, fetcher, swrOptions);
    const memoizedValue = useMemo(
        () => ({
            spaList: data?.produits || [],
            catLoading: isLoading,
            category: data?.categorie || [],
        }),
        [data]
    );
    
    return memoizedValue
}