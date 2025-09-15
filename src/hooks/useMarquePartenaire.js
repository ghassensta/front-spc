import { useEffect, useState } from "react";
import { fetchMarquePartenaire } from "../api/data";

export function useMarquePartenaires() {
  const [marques, setMarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetchMarquePartenaire();
        // Assure-toi que la structure est correcte
        const data =
          response?.data?.extra_data?.logos && Array.isArray(response.data.extra_data.logos)
            ? response.data.extra_data.logos
            : [];

        if (isMounted) {
          setMarques(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { marques, loading, error };
}
