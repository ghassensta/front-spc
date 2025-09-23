import { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetSidebar() {
    const url = endpoints.layout.sidebar;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            sidebar: data?.data || [],
        }),
        [data]
    );
    return memoizedValue;
}
export function useGetFooter() {
    const url = endpoints.layout.footer;

    const { data } = useSWR(url, fetcher, swrOptions);

    console.log("footer", data)

    const memoizedValue = useMemo(
        () => ({
            footer: data?.data || [],
        }),
        [data]
    );
    
    return memoizedValue;
}
export function useGetCarte() {
    const url = endpoints.layout.carte;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            carte: data?.data || [],
        }),
        [data]
    );

    return memoizedValue;
}
export function useGetProchainement() {
    const url = endpoints.layout.prochainement;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            prochainement: data?.data || [],
        }),
        [data]
    );

    return memoizedValue;
}

export function useGetMarques() {
    const url = endpoints.layout.marques;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            marques: data?.data || [],
        }),
        [data]
    );

    console.log("Marques data:", memoizedValue);

    return memoizedValue;
}

export const useLayout = () => {
    const { sidebar } = useGetSidebar();
    const { footer } = useGetFooter();
    const { carte } = useGetCarte();
    const { prochainement } = useGetProchainement();
    const { marques } = useGetMarques();
    return { sidebar, footer, carte, prochainement, marques };
}