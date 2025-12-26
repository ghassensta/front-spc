import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR, { mutate } from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetProducts() {
  const url = endpoints.product.list;

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      porductsLoading: isLoading,
    }),
    [data]
  );

  return memoizedValue;
}

export function useGetProduct(slug) {
  const url = endpoints.product.detail(slug);

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product || null,
      avis: data?.avis || [],
      like: data?.inWishlist,
      productLoading: isLoading,
      etablissement: data?.etablissement || {},
      servicesEquipements: data?.servicesEquipements || [],
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
  slug
}) => {
  try {
    const url = endpoints.product.avis;
    const params = { name, email, comment, ratings, type_produit_id: id };
    const res = await poster(url, params);

    mutate(endpoints.product.detail(slug))

    return res;
  } catch (error) {
    throw error;
  }
};
