import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR, { mutate } from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

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

export function useGetWishlist() {
    const url = endpoints.wishlist.list;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            wishlist: data?.data || []
        }), [data]
    );

    return memoizedValue;
}