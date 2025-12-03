import { paths } from "./router/paths";

export const CONFIG = {
  appName: "SPC",
  storageKey: import.meta.env.STORAGE_KEY || "spc_access_token",
  serverUrl: import.meta.env.SERVER_URL || "https://spc.emc1001.online/",
  frontUrl: import.meta.env.FRONT_URL || "https://front-spc.emc1001.online",
  stripePublicKey:"pk_test_51SV9rO8t0y3r1ZkE1Fcc7Kgdp4pTqyOBCrFYh37A8nkiaOympPOEamYSP7u4JwCb6eR9On6kKPdpNCnAR02rNLCW00VMVoaBdT",

  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.root,
  },
};
