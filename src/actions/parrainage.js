import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR, { mutate } from "swr";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetParrainage() {
    const url = endpoints.parrainage.get;

    const { data } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            filleuls: data?.filleuls || [],
            total_filleuls: data?.total_filleuls || 0
        }),
        [data]
    );

    return memoizedValue;
}

export const useSendInvites = async(data) => {
    try {
        const url = endpoints.parrainage.sendEmails;

        const params = { emails: data.emails, link: data.referralLink };

        const res = await poster(url, params)

        mutate(endpoints.parrainage.get);

        return res;
    } catch (error) {
        return error
    }
}
