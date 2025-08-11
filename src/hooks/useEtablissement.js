import { useEffect, useState } from "react";
import { fetchEtablissements } from "../api/data";

export function useEtablissement() {
  const [etablissements, setEtablissements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchEtablissements()
      .then((data) => {
        if (isMounted) {
          // Assure-toi que c'est bien un tableau
          setEtablissements(Array.isArray(data) ? data : []);
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

  return { etablissements, loading, error };
}
