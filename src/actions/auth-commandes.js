import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function useGetAuthOrders() {
  const url = endpoints.orders.myOrders;

  const { data, isLoading, isValidating, error } = useSWR(url, fetcher, swrOptions);


  const memoizedValue = useMemo(
    () => ({
      orders: Array.isArray(data?.commandes) ? data.commandes : [],
      loading: isLoading,
      validating: isValidating,
      error,
    }),
    [data, isLoading, isValidating, error]
  );

  return memoizedValue;
}