import { useMemo, useEffect, useCallback } from "react";

// import  { endpoints } from "src/data/axios";

import { AuthContext } from "../auth-context";
import { useSetState } from "../../../hooks/use-set-state";
import { setSession } from "./utils";
import { CONFIG } from "src/config-global";
import axios, { endpoints } from "src/utils/axios";


// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(CONFIG.storageKey);

      if (!accessToken) {
        setState({ user: null, loading: false });
        return;
      }

      setSession(accessToken);

      const res = await axios.get(endpoints.auth.me);

      const user = res.data;

      setState({ user: { ...user, accessToken }, loading: false });
    } catch (error) {
      // Nettoyer le token invalide
      localStorage.removeItem(CONFIG.storageKey);
      setState({ user: null, loading: false });
    }
  }, []);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
          }
        : null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}