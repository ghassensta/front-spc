import axios from "axios";
import { get } from "lodash";
import { CONFIG } from "src/config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl || "http://127.0.0.1:8000",
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
  axios
    .get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(CONFIG.storageKey)}`,
      },
    })
    .then((res) => res.data);

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
    console.error("Failed to patch:", error);
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
    edit: "/api/auth/profile",
  },
  categories: {
    list: "/api/categories",
    byCategory: (category) => `/api/produits/by-categories/${category}`,
  },
  etablissements: {
    list: "/api/etablissements",
    getAll: "/api/all-etablissements",
    detail: (slug) => `/api/etablissements/${slug}`,
    avis: "/api/auth/etablissements/avis",
    filters: "/api/filters/etablissements",
  },
  actualites: {
    list: "/api/actualites",
    detail: (slug) => `/api/actualites/${slug}`,
    getLast: "/api/last-actualites",
  },
  product: {
    list: "/api/produit",
    detail: (slug) => `/api/produit/${slug}`,
    avis: "/api/auth/produit/avis",
  },
  orders: {
    list: "/api/commandes",
    detail: (id) => `/api/auth/commandes/${id}`,
    myOrders: "/api/auth/mes-commandes",
  },
  layout: {
    sidebar: "/api/menu-sidebar",
    footer: "/api/menu-footer",
    carte: "/api/section-carte",
    prochainement: "/api/section-prochainement-disponible",
    marques: "/api/marques-partenaires",
  },
  wishlist: {
    toggle: "/api/auth/wishlists",
    list: "/api/auth/wishlists",
  },
  parrainage: {
    get: "/api/auth/parrainage",
    sendEmails: "/api/auth/send-invites",
  },
  aide: {
    services: "/api/services",
    mymessages: "/api/auth/messages",
    messages: (id) => `/api/auth/messages/${id}`,
  },
  fidelite: {
    get: "/api/auth/points-fidelite",
    exchangePoints: "/api/auth/fidelite/echange",
  },
  forms: {
    partenaire: "/api/send-partenaire",
    entreprise: "/api/send-entreprise",
    marques: "/api/send-marques",
  },
  bonachats: {
    list: "/api/auth/credits",
  },
  search: {
    locations: "/api/search/locations",
    serviceOrCategorie: "/api/search/services-categories",
    produits: "/api/search", 
  },

  homesections:{
    get:"/api/homepage/sections"
  },

  credits:{
    get:"/api/auth/credits-panier"
  }
};
