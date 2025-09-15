// src/hooks/useProchainementDisponible.js
import { useEffect, useState } from "react";
import { fetchProchainementDisponible } from "src/api/data";

export function useSectionProchainementDisponible() {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await fetchProchainementDisponible();
        if (isMounted) setSection(data);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return { section, loading, error };
}
