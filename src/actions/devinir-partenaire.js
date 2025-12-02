import { useMemo } from "react";
import useSWR from "swr";
import { endpoints, poster } from "src/utils/axios";


export const useExchangePoints = async (montant) => {
  try {
    const url = endpoints.fidelite.exchangePoints;
    const res = await poster(url, { montant });
    return res;
  } catch (error) {
    console.error("Erreur échange points:", error);
    throw error;
  }
};