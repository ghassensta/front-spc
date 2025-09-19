import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
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
      avis: data?.avis || [],
    }),
    [data]
  );

  return memoizedValue;
}

export const usePostProductAvis = async ({
  name,
  email,
  comment,
  ratings,
  id,
}) => {
  try {
    const url = endpoints.product.avis;
    const params = { name, email, comment, ratings, type_produit_id: id };
    const res = await poster(url, params);

    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la soumission de l'avis:", error);
    throw error;
  }
};
