import { useEffect, useState } from "react";
import { fetchMarquePartenaire } from "../api/data";

export function useMarquePartenaires() {
  const [marques, setMarques] = useState([]); // cohérence nommage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchMarquePartenaire()
      .then((data) => {
        if (isMounted) {
          setMarques(Array.isArray(data) ? data : []); // cohérence ici aussi
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { marques, loading, error };
}
