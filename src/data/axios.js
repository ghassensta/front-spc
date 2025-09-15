import axios from "axios";
import { CONFIG } from "../config-global";
import { STORAGE_KEY } from "../constants";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl || "http://127.0.0.1:8000/api/",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------
export const blobFetcher = (url) =>
  axios.get(url, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
    },
  }).then((res) => res.data);
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// POST
export const poster = async (url, data = {}, config = {}) => {
  try {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to post:", error);
    throw error;
  }
};

// PUT
export const putter = async (url, data = {}, config = {}) => {
  try {
    const res = await axiosInstance.put(url, data, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to put:", error);
    throw error;
  }
};

// DELETE
export const deleter = async (url, config = {}) => {
  try {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to delete:", error);
    throw error;
  }
};

// PATCH (optional)
export const patcher = async (url, data = {}, config = {}) => {
  try {
    const res = await axiosInstance.patch(url, data, config);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to patch:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: "/api/auth/me",
    signIn: "/api/auth/login",
    signUp: "/api/auth/register",
    logout: "/api/auth/logout",
  },
  orders: {
    submit: "/api/create-checkout-session",
    getMine: "/api/orders",
    all: "/api/orders/all",
    get: (id) => `/api/order/${id}`,
    delete: (id) => `/api/order/${id}`,
    changeStatus: (id) => `/api/order/change-status/${id}`,
    invoice: (ref) => `/api/invoice/${ref}`,
  },
  users: {
    updateMe: "/api/update-me",
    changePassword: "/api/change-password",
    all: "/api/users",
    get: (id) => `/api/users/${id}`,
    delete: (id) => `/api/users/${id}`,
    sendMessage: `/api/users/send-message`,
  },
  cards: {
    profile: (id) => `/api/profile/${id}`,
    getMine: "/api/cards",
    submit: "/api/submit-card",
    all: "/api/cards/all",
    delete: (id) => `/api/cards/${id}`,
    changeStatus: (id) => `/api/cards/change-status/${id}`,
  },
  products: {
    getAll: "/api/products",
    get: (id) => `/api/products/${id}`,
    delete: (id) => `/api/products/${id}`,
    add: "/api/products",
    edit: (id) => `/api/products/${id}`
  },
};