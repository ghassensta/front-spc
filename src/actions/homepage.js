import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR, { mutate } from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};


export function useGetHomePage() {
    const url = endpoints.homesections.get;

    const { data, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            sections: data?.data || [],
            loading: isLoading,
            validating: isValidating
        }), [data]
    );
   // console.log("useGetHomePage data:", data);
    return memoizedValue;
}

