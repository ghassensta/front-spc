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

export async function sendWishlistByEmail(email, message = "") {
  if (!email || !email.trim()) {
    throw new Error("L'adresse email est requise");
  }

  try {
    const res = await poster(endpoints.wishlist.shareProduct, {
      email,
      message: message.trim(),
    });

    return res;
  } catch (error) {
    console.error("Erreur envoi wishlist par email :", error);
    throw error.response?.data?.message || error.message || "Échec de l'envoi";
  }
}
