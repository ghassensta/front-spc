import { useEffect, useState } from "react";
import { fetchMenuSidebar } from "src/api/data";
/**
 * Hook personnalisé pour récupérer les menus de la sidebar
 */
export function useMenuSidebar() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchMenuSidebar();
        if (isMounted) {
          setMenus(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { menus, loading, error };
}