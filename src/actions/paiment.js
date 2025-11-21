// src/actions/paiement.js
import { useMemo } from "react";
import { endpoints, poster } from "src/utils/axios";
import useSWR from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

export function usePaymentSession(items, expediteur) {
  const url = endpoints.paiment.createSession; // corrigé "paiement" -> "paiment" selon ton endpoints

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
    const res = await poster(endpoints.paiment.createSession, payload);
    return res; // { sessionId, publicKey, ... }
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement :", error);
    throw error;
  }
};

export const paymentSuccess = async (sessionId) => {
  if (!sessionId) throw new Error("sessionId requis pour succès paiement.");

  try {
    const res = await poster(`${endpoints.paiment.success}?session_id=${sessionId}`);
    return res;
  } catch (error) {
    console.error("Erreur lors du succès du paiement :", error);
    throw error;
  }
};

export const paymentCancel = async (sessionId) => {
  if (!sessionId) throw new Error("sessionId requis pour annulation paiement.");

  try {
    const res = await poster(`${endpoints.paiment.cancel}?session_id=${sessionId}`);
    return res;
  } catch (error) {
    console.error("Erreur lors de l'annulation du paiement :", error);
    throw error;
  }
};
