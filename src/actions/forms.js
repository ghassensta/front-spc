import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";

export const sendDevenirPartenaire = async (data) => {
  try {
    const url = endpoints.forms.partenaire;

    const params = {...data};

    const res = await poster(url, params);

    return res;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const sendEntreprise = async (data) => {
  try {
    const url = endpoints.forms.entreprise;

    const params = {...data};

    const res = await poster(url, params);

    return res;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const sendMarques = async (data) => {
  try {
    const url = endpoints.forms.marques;

    const params = { ...data };

    const res = await poster(url, params);

    return res;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const sendMessage = async (data) => {
  try {
    const url = endpoints.forms.contact;

    const params = {...data};

    const res = await poster(url, params);

    return res;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
