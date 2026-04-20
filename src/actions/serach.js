// src/hooks/serach.js
import { useState, useEffect, useRef } from "react";
import { endpoints, fetcher } from "src/utils/axios";

export const useLocationSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      const q = query.trim();

      try {
        const [locRes, srvRes] = await Promise.all([
          fetcher(`${endpoints.search.locations}?q=${encodeURIComponent(q)}`).catch(() => []),
          fetcher(`${endpoints.search.serviceOrCategorie}?q=${encodeURIComponent(q)}`).catch(() => []),
        ]);

        const locations = Array.isArray(locRes)
          ? locRes.map(l => ({ ...l, type: "location", key: `loc-${l.label}` }))
          : [];

        const services = Array.isArray(srvRes)
          ? srvRes.map(s => ({
              ...s,
              type: s.type || "service", // Important : garder le type du backend
              key: `srv-${s.id || s.slug || s.label}`,
            }))
          : [];

        setSuggestions([...locations, ...services].slice(0, 10));
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  return { query, setQuery, suggestions, loading };
};

export const useServiceCategoriesSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Toujours appeler l'API, même si q vide → retourne les catégories
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const q = query.trim();
        const url = q
          ? `${endpoints.search.serviceOrCategorie}?q=${encodeURIComponent(q)}`
          : `${endpoints.search.serviceOrCategorie}`;

        const res = await fetcher(url);

        const items = Array.isArray(res)
          ? res.map(item => ({
              ...item,
              type: item.type || "category", // produit ou category
              key: `srv-${item.id || item.slug || item.label}`,
            }))
          : [];

        setSuggestions(items.slice(0, 10));
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  return { query, setQuery, suggestions, loading };
};

export const useSearchProduits = (catSlug, villeSlug, options = {}) => {
  const { page = 1, per_page = 12 } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!catSlug && !villeSlug) {
        setData({ results: [], total: 0, current_page: 1, last_page: 1 });
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Construire l'URL avec les paramètres de pagination
        let url = endpoints.search.produits;
        if (catSlug) url += `/${catSlug}`;
        if (villeSlug) url += `/${villeSlug}`;
        
        // Ajouter les paramètres de pagination
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: per_page.toString()
        });
        
        const res = await fetcher(`${url}?${params.toString()}`);
        setData(res);
      } catch (err) {
        setError(err.message || "Erreur de chargement");
        setData({ results: [], total: 0, current_page: 1, last_page: 1 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [catSlug, villeSlug, page, per_page]);

  return { data, loading, error };
};
