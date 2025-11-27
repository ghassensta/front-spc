import { paths } from "./router/paths";

export const CONFIG = {
  appName: "SPC",
  storageKey: import.meta.env.STORAGE_KEY || "spc_access_token",
  serverUrl: import.meta.env.SERVER_URL || "http://127.0.0.1:8000",
  frontUrl: import.meta.env.FRONT_URL || "http://localhost:5173",
  stripePublicKey:"pk_test_51SV9rO8t0y3r1ZkE1Fcc7Kgdp4pTqyOBCrFYh37A8nkiaOympPOEamYSP7u4JwCb6eR9On6kKPdpNCnAR02rNLCW00VMVoaBdT",
  // frontUrl: import
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.root,
  },
};
