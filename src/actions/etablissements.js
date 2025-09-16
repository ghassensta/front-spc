import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetEtablissements() {
    const url = endpoints.etablissements.list;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            etablissements: data?.etablissements || [],
        }),
        [data]
    );

    return memoizedValue;
}

export function useGetEtablissement(slug) {
    const url = endpoints.etablissements.detail(slug);

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            etablissement: data?.etablissement || null,
        }),
        [data]
    );

    return memoizedValue;
}

export function usePostEtablissementsAvis() {
    const url = endpoints.etablissements.avis;

    const { data } = useSWR(url, poster, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            avis: data?.avis || []
        }),
        [data]
    );

    return memoizedValue;
}