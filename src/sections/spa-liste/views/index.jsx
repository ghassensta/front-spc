import React, { useState, useEffect, useRef, useCallback } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import Select from "react-select";
import { useTranslation } from "src/context/translation-context";
import { useGetAllEtablissementsInfinite } from "src/actions/etablissements";
import ButtonLink from "src/components/button-link/ButtonLink";
import TrustBar from "src/components/trust-bar/TrustBar.jsx";
import SectionHeader from "src/components/section-header/SectionHeader";
import { FaMapMarkerAlt, FaSpa } from "react-icons/fa";
import { MdTune } from "react-icons/md";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    minHeight: "48px",
    backgroundColor: "transparent",
    
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    
    fontSize: "0.875rem",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111",
    
    fontSize: "0.875rem",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    marginTop: "4px",
    zIndex: 9999,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? GOLD
      : state.isFocused
        ? "#f3ebdd"
        : "white",
    color: "#333",
    
    fontSize: "0.875rem",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    padding: "0 8px",
  }),
};

export default function CategoriesPageView({
  villes = [],
  types = [],
  services = [],
  filterLoading,
}) {
  const [filters, setFilters] = useState({
    region_id: null,
    type_id: null,
    service_id: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const { translateSync } = useTranslation();

  const {
    etablissements,
    etablissementLoading,
    isLoadingMore,
    hasMore,
    total,
    loadMore,
  } = useGetAllEtablissementsInfinite(filters);
  console.log("etablissements", etablissements);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoadingMore) loadMore();
    },
    [hasMore, isLoadingMore, loadMore],
  );

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });
    if (loaderRef.current) observerRef.current.observe(loaderRef.current);
    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  const typeOptions = types.map((t) => ({
    value: t.id,
    label: translateSync(t.name),
  }));
  const villeOptions = villes.map((v) => ({
    value: v.id,
    label: translateSync(v.name),
  }));
  const serviceOptions = services.map((s) => ({
    value: s.id,
    label: translateSync(s.name),
  }));
  const handleSelectChange = (name) => (selected) =>
    setFilters((prev) => ({ ...prev, [name]: selected?.value ?? null }));

  if (filterLoading) return <FiltersSkeleton />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" >
      {/* ── Titre ── */}
      <SectionHeader
        label="Spa & Prestige Collection"
        title="Nos expériences"
        asH1
      />
      <h2
        className="mb-8 font-light text-2xl md:text-3xl text-[#b8955a] text-center max-w-3xl mx-auto"
      >
        {translateSync(
          "Une collection choisie avec soin, pour celles et ceux en quête d'exception.",
        )}
      </h2>

      {/* ── Bouton AFFINEZ VOTRE RECHERCHE ── */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
          style={{
            backgroundColor: showFilters ? GOLD : "#f0ece4",
            color: showFilters ? "#fff" : "#666",
            letterSpacing: "0.1em",
            
            border: `1px solid ${showFilters ? GOLD : "#e0d8cc"}`,
          }}
        >
          <MdTune className="text-sm" />
          {translateSync("Affinez votre recherche")}
        </button>
      </div>

      {/* ── Filtres ── */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {/* Ville - pays */}
          <div
            className="flex items-center gap-2 rounded-lg border bg-white"
            style={{ borderColor: "#e0d8cc" }}
          >
            <FaMapMarkerAlt className="ml-3 shrink-0" style={{ color: GOLD }} />
            <Select
              instanceId="select-region"
              styles={customStyles}
              placeholder={translateSync("Où souhaitez-vous aller ?")}
              options={villeOptions}
              value={
                villeOptions.find((o) => o.value === filters.region_id) ?? null
              }
              onChange={handleSelectChange("region_id")}
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
              className="flex-1"
            />
          </div>

          {/* Type d'expérience */}
          <div
            className="flex items-center gap-2 rounded-lg border bg-white"
            style={{ borderColor: "#e0d8cc" }}
          >
            <FaSpa className="ml-3 shrink-0" style={{ color: GOLD }} />
            <Select
              instanceId="select-etablissement"
              styles={customStyles}
              placeholder={translateSync("Quel type d'expérience ?")}
              options={typeOptions}
              value={
                typeOptions.find((o) => o.value === filters.type_id) ?? null
              }
              onChange={handleSelectChange("type_id")}
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
              className="flex-1"
            />
          </div>

          {/* Vos envies */}
          <div
            className="flex items-center gap-2 rounded-lg border bg-white"
            style={{ borderColor: "#e0d8cc" }}
          >
            <MdTune
              className="ml-3 shrink-0 text-base"
              style={{ color: GOLD }}
            />
            <Select
              instanceId="select-service"
              styles={customStyles}
              placeholder={translateSync("Vos envies")}
              options={serviceOptions}
              value={
                serviceOptions.find((o) => o.value === filters.service_id) ??
                null
              }
              onChange={handleSelectChange("service_id")}
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
              className="flex-1"
            />
          </div>
        </div>
      )}

      {/* ── Compteur ── */}
      {!etablissementLoading && total > 0 && (
        <p
          className="text-xs text-center text-gray-400 mb-8"
          style={{ fontFamily: FONT }}
        >
          {etablissements.length} / {total} {translateSync("établissements")}
        </p>
      )}

      {/* ── Grille ── */}
      {etablissementLoading ? (
        <CategoriesSkeleton />
      ) : etablissements.length === 0 ? (
        <p
          className="text-center py-12 text-gray-500"
          style={{ fontFamily: FONT }}
        >
          {translateSync("Aucun résultat trouvé.")}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 px-3">
            {etablissements.map((card) => (
              <SpaCard
                key={card.id}
                to={paths.spa.details(card.slug)}
                title={card.nom}
                image={card.image_avant}
                description={card.description_avant}
                location={[card.ville, card.pays].filter(Boolean).join(", ")}
                remise_offres={card.remise_offres}
                prix_offres={card.prix_offres}
              />
            ))}
          </div>

          {/* Scroll infini */}
          <div
            ref={loaderRef}
            className="h-16 flex items-center justify-center mt-8"
          >
            {isLoadingMore && (
              <svg
                className="animate-spin h-8 w-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {!hasMore && !isLoadingMore && etablissements.length > 0 && (
              <p className="text-xs text-gray-400" style={{ fontFamily: FONT }}>
                {translateSync("Tous les établissements sont affichés.")}
              </p>
            )}
          </div>
        </>
      )}

      <TrustBar />
      <ButtonLink to={paths.main} text="Accueil" className="mt-4" />
    </div>
  );
}
