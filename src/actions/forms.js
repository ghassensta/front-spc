import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";

export const sendDevenirPartenaire = async (data) => {
  try {
    const url = endpoints.emails.devenirpartenair;

    const params = {...data};

    const res = await poster(url, params);

    return res;
  } catch (error) {

    throw error;
  }
};

export const sendEntreprise = async (data) => {
  try {
    const url = endpoints.emails.solutionCe;

    const params = {...data};

    const res = await poster(url, params);

    return res;
  } catch (error) {

    throw error;
  }
};

export const sendMarques = async (data) => {
  try {
    const url = endpoints.emails.collaboration;

    const params = { ...data };

    const res = await poster(url, params);

    return res;
  } catch (error) {

    throw error;
  }
};

export const sendMessage = async (data) => {
  try {
    const url = endpoints.emails.ContactMail;

    const params = {...data};

    const res = await poster(url, params);

    return res;
  } catch (error) {

    throw error;
  }
}
