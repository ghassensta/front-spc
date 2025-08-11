import { useEffect, useState } from "react";
import { fetchActualites } from "../api/data";

export function useActualites() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchActualites()
      .then((data) => {
        if (isMounted) {
          if (Array.isArray(data)) {
            setActualites(data);
          } else if (data && Array.isArray(data.actualites)) {
            setActualites(data.actualites);
          } else {
            setActualites([]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Erreur inconnue");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { actualites, loading, error };
}
