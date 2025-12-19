import { useMemo } from "react";
import { endpoints, poster, fetcher } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function usePaymentSession(items, expediteur) {
  const url = endpoints.paiement.createSession; // Corrected to "paiement" assuming standard French spelling; adjust if your endpoints use "paiment"

  const { data, error, isLoading, isValidating } = useSWR(
    items && items.length > 0 ? [url, { items, expediteur }] : null,
    async ([url, payload]) => {
      const res = await poster(url, payload);
      return res;
    },
    swrOptions
  );

  return useMemo(
    () => ({
      session: data || null,
      error,
      loading: isLoading,
      validating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
}

export const createPaymentSession = async (items, expediteur) => {
  if (!items || items.length === 0) throw new Error("Aucun article à payer.");
  if (!expediteur) throw new Error("Expéditeur non défini.");

  try {
    const payload = { items, expediteur };
    const res = await poster(endpoints.paiement.createSession, payload);
    return res; // { sessionId, publicKey, ... }
  } catch (error) {
    throw error;
  }
};

export const paymentSuccess = async (sessionId) => {
  if (!sessionId) throw new Error("sessionId requis pour succès paiement.");

  try {
    const res = await fetcher([
      `${endpoints.paiment.success}?session_id=${sessionId}`,
    ]);
    return res;
  } catch (error) {
    throw error;
  }
};

export const paymentCancel = async (sessionId) => {
  if (!sessionId) throw new Error("sessionId requis pour annulation paiement.");

  try {
    const res = await fetcher([
      `${endpoints.paiment.cancel}?session_id=${sessionId}`,
    ]);
    return res;
  } catch (error) {
    throw error;
  }
  
};
