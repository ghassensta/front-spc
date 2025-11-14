import { useMemo } from "react";
import useSWR from "swr";
import { endpoints, fetcher } from "src/utils/axios";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function useGetBonAchats() {
  const url = endpoints.bonachats.list;

  const { data, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => ({
      bonachats: data?.credits || null, 
      loading: isLoading,
      validating: isValidating,
    }),
    [data, isLoading, isValidating]
  );
  return memoizedValue;
}