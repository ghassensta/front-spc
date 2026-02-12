import { paths } from "./router/paths";

export const CONFIG = {
  appName: "SPC",
  storageKey: import.meta.env.STORAGE_KEY || "spc_access_token",
  serverUrl: import.meta.env.SERVER_URL || "http://127.0.0.1:8000",
  frontUrl: import.meta.env.FRONT_URL || "http://localhost:5173",
  stripePublicKey:"pk_live_51QeJF4GwtKvSfuznebGHydYapVWdAloNicXA7RRxP7inFBZDGMJYEBz0r06ccrnjpuSkkSJelECA020KWqNfgL3B00IRrALodW",

  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.root,
  },
};
