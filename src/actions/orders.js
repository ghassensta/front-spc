import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetOrders() {
    const url = endpoints.orders.list;
    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            orders: data?.commandes || [],
        }),
        [data]
    );
    return memoizedValue;
}

export function useGetMyOrders() {
    const url = endpoints.orders.myOrders;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        ()=> ({
            orders: data?.commandes || []
        }),
        [data]
    );
    return memoizedValue
}

export function useGetOrder(id) {
    const url = endpoints.orders.detail(id);
    
    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            order: data?.data || null,
        }),
        [data]
    );

    return memoizedValue;
}
