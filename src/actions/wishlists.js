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
      validating: isValidating,
    }),
    [data]
  );

  return memoizedValue;
}

export const useToggleWishlist = async (id) => {
  try {
    if (id === undefined || id === null) {
      throw new Error("Missing produit_id for wishlist toggle");
    }
    const url = endpoints.wishlist.toggle;

    const params = { produit_id: id };

    const res = await poster(url, params);
    mutate(endpoints.wishlist.list);
    return res;
  } catch (error) {
    throw error;
  }
};

export async function getIsWishlisted(id) {
  try {
    const url = endpoints.wishlist.list;
    const res = await fetcher(url);

    return res?.data.some((item) => item.id === id) || false;
  } catch (error) {
    return false;
  }
}
