import { useEffect, useState } from "react";
import { fetchSectionCarte } from "src/api/data";

/**
 * Hook personnalisé pour récupérer la section Carte
 */
export function useSectionCarte() {
  const [sectionCarte, setSectionCarte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchSectionCarte();
        if (isMounted) {
          setSectionCarte(data); // un seul objet attendu
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { sectionCarte, loading, error };
}
