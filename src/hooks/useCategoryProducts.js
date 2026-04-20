import { useState, useRef, useCallback, useEffect } from "react";
import { useGetSpaByCategory } from "src/actions/categories";

export function useCategoryProducts(slug) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    region_id:             null,
    type_etablissement_id: null,
    formule_id:            null,
    min_price:             null,
    max_price:             null,
  });

  // Filtres prix avec debounce — évite un appel API à chaque touche
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const priceTimer = useRef(null);

  // Reset page + filtres quand on change de catégorie
  useEffect(() => {
    setPage(1);
    const empty = { region_id: null, type_etablissement_id: null, formule_id: null, min_price: null, max_price: null };
    setFilters(empty);
    setDebouncedFilters(empty);
  }, [slug]);

  const handleSelectFilter = useCallback((key) => (value) => {
    const next = (prev) => ({ ...prev, [key]: value || null });
    setFilters(next);
    setDebouncedFilters(next); // select → immédiat, pas besoin de debounce
    setPage(1);
  }, []);

  const handlePriceFilter = useCallback((key, value) => {
    const parsed = value !== "" ? parseFloat(value) : null;
    setFilters(prev => ({ ...prev, [key]: parsed })); // met à jour le slider/input local immédiatement
    clearTimeout(priceTimer.current);
    priceTimer.current = setTimeout(() => {
      setDebouncedFilters(prev => ({ ...prev, [key]: parsed })); // déclenche l'appel API après 400ms
      setPage(1);
    }, 400);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // SWR utilise debouncedFilters → pas d'appel API pendant la frappe prix
  const swrResult = useGetSpaByCategory(slug, debouncedFilters, page);

  return {
    ...swrResult,
    filters,        // état local (pour les sliders)
    page,
    handleSelectFilter,
    handlePriceFilter,
    handlePageChange,
  };
}