import { useEffect, useState } from "react";
import { fetchMenuFooter } from "src/api/data";

/**
 * Hook personnalisé pour récupérer les menus du footer
 */
export function useMenuFooter() {
  const [menus, setMenus] = useState({
    settings: [],
    footer_about: [],
    footer_pro: [],
    social_links: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchMenuFooter();
        if (isMounted) {
          // data est déjà structuré avec footer_about, footer_pro et social_links
          setMenus({
            settings: data.settings ?? [],
            footer_about: data.footer_about ?? [],
            footer_pro: data.footer_pro ?? [],
            social_links: data.social_links ?? [],
          });
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

  return { menus, loading, error };
}
