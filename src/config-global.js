import { paths } from "./router/paths";

export const CONFIG = {
  appName: "SPC",
  storageKey: import.meta.env.STORAGE_KEY || "spc_access_token",
  serverUrl: import.meta.env.SERVER_URL || "https://spc.emc1001.online",
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.root,
  },
};
