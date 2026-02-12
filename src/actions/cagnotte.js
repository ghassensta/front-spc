// src/actions/cagnotte.js

import { endpoints, poster,fetcher } from "src/utils/axios";
import useSWR from "swr";

export const createCagnotte = async (data) => {
  try {
    const url = endpoints.cagnottes.create;

    const response = await poster(url, data);

    return response.data; // important
  } catch (error) {
    throw error?.response?.data || error;
  }
};


export const getCagnotte = async (slug) => {
  try {
    const url = endpoints.cagnottes.getBySlug(slug);
    const data = await fetcher(url);
    return data;
  } catch (error) {
    if (error?.status === 404) {
      throw new Error("Cagnotte introuvable");
    }
    console.error("Erreur getCagnotte:", error);
    throw new Error("Erreur lors du chargement de la cagnotte");
  }
};

export const contribuerCagnotte = async (cagnotteId, data) => {
  try {
    const url = endpoints.cagnottes.contribute(cagnotteId);
    const response = await poster(url, data);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
