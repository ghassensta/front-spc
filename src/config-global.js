import { paths } from "./router/paths";

export const CONFIG = {
  appName: "SPC",
  storageKey: import.meta.env.STORAGE_KEY || "spc_access_token",
  serverUrl: import.meta.env.SERVER_URL || "http://127.0.0.1:8000",
  frontUrl: import.meta.env.FRONT_URL || "front-spc.emc1001.online",
  // frontUrl: import
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.root,
  },
};
