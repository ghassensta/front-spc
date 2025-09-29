// Updated aide.js
import { useMemo } from "react";
import { endpoints, fetcher, poster } from "src/utils/axios";
import useSWR, { mutate } from "swr";

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetServices() {
  const url = endpoints.aide.services;

  const { data, error, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      services: data?.services || [],
      servicesError: error,
      servicesLoading: isLoading,
      servicesValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetMessages() {
  const url = endpoints.aide.mymessages;

  const { data, error, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      messages: data?.messages || [],
      messagesError: error,
      messagesLoading: isLoading,
      messagesValidating: isValidating
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetMessage(id) {
  const url = id ? endpoints.aide.messages(id) : null;

  const { data, error, isLoading, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      messages: data?.messages || [],
      messagesError: error,
      messagesLoading: isLoading,
      messagesValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export const sendSupport = async (data) => {
  try {
    const url = endpoints.aide.mymessages;

    const params = { service: data.service, title: data.title, description: data.description };

    const res = await poster(url, params);

    mutate(endpoints.aide.mymessages);

    return res;
  } catch (error) {
    console.error("Error lors de création une ticket support", error);
    throw error;
  }
};

export const sendMessage = async (data) => {
  try {
    const url = endpoints.aide.messages(data.id);

    const params = { text: data.text, type: data.type, sender: data.sender };

    const res = await poster(url, params);

    mutate(endpoints.aide.messages(data.id));
    mutate(endpoints.aide.mymessages);

    return res;
  } catch (error) {
    console.error("Error lors d'envoi du message dans ce ticket",error);
    throw error;
  }
};