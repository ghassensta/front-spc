import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR, { mutate } from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};


export function useGetWishlist() {
    const url = endpoints.wishlist.list;

    const { data, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            wishlist: data?.data || [],
            loading: isLoading,
            validating: isValidating
        }), [data]
    );

    return memoizedValue;
}

export const useToggleWishlist= async(id) => {
    try {
        const url = endpoints.wishlist.toggle;

        const params = { produit_id : id };

        const res = await poster(url, params);
        mutate(endpoints.wishlist.list)
        return res
    } catch (error) {
        console.log(error)
    }
}
