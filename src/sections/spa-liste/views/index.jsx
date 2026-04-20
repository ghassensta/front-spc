import React, { useState, useEffect, useRef, useCallback } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import ButtonIcon from "src/components/button-icon/button-icon";
import Select from "react-select";
import { useTranslation } from "src/context/translation-context";
import { useGetAllEtablissementsInfinite } from "src/actions/etablissements";

// ─── Styles react-select ──────────────────────────────────────────────────────
const customStyles = {
  control:     (base) => ({
    ...base,
    border: "none",
    borderRadius: "0.5rem",
    boxShadow: "none",
    minHeight: "48px",
    backgroundColor: "transparent",
  }),
  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  singleValue: (base) => ({ ...base, color: "#111" }),
  menu:        (base) => ({ ...base, borderRadius: "0.5rem", marginTop: "4px", zIndex: 9999 }),
  menuPortal:  (base) => ({ ...base, zIndex: 9999 }),
};

// ─── Composant principal ──────────────────────────────────────────────────────
export default function CategoriesPageView({
  villes   = [],
  types    = [],
  services = [],
  filterLoading,
}) {
  // ── État des filtres ──────────────────────────────────────────────────────
  const [filters, setFilters] = useState({
    region_id:  null,
    type_id:    null,
    service_id: null,
  });

  const { translateSync } = useTranslation();

  // ── Données paginées via serveur ──────────────────────────────────────────
  const {
    etablissements,
    etablissementLoading,
    isLoadingMore,
    hasMore,
    total,
    loadMore,
  } = useGetAllEtablissementsInfinite(filters);

  // ── IntersectionObserver pour le scroll infini ────────────────────────────
  const loaderRef    = useRef(null);
  const observerRef  = useRef(null);

  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore]
  );

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    if (loaderRef.current) observerRef.current.observe(loaderRef.current);
    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  // ── Options pour les selects ──────────────────────────────────────────────
  const typeOptions    = types.map((t) => ({ value: t.id, label: translateSync(t.name) }));
  const villeOptions   = villes.map((v) => ({ value: v.id, label: translateSync(v.name) }));
  const serviceOptions = services.map((s) => ({ value: s.id, label: translateSync(s.name) }));

  const handleSelectChange = (name) => (selected) => {
    setFilters((prev) => ({ ...prev, [name]: selected?.value ?? null }));
  };

  // ── Affichage ─────────────────────────────────────────────────────────────
  if (filterLoading) return <FiltersSkeleton />;

  return (
    <div className="max-w-6xl mx-auto p-1">
      {/* ── Filtres ─────────────────────────────────────────────────────── */}
      <p className="text-center text-4xl font-semibold my-4">
        {translateSync("Filtrer par")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 px-2 gap-4 font-roboto mb-16">
        <div className="border rounded-lg">
          <Select
            instanceId="select-region"
            styles={customStyles}
            placeholder={translateSync("Région ou ville")}
            options={villeOptions}
            value={villeOptions.find((o) => o.value === filters.region_id) ?? null}
            onChange={handleSelectChange("region_id")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        <div className="border rounded-lg">
          <Select
            instanceId="select-etablissement"
            styles={customStyles}
            placeholder={translateSync("Sélectionnez type d'établissement")}
            options={typeOptions}
            value={typeOptions.find((o) => o.value === filters.type_id) ?? null}
            onChange={handleSelectChange("type_id")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        <div className="border rounded-lg">
          <Select
            instanceId="select-service"
            styles={customStyles}
            placeholder={translateSync("Services et équipements")}
            options={serviceOptions}
            value={serviceOptions.find((o) => o.value === filters.service_id) ?? null}
            onChange={handleSelectChange("service_id")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
      </div>

      {/* ── Titres + compteur ────────────────────────────────────────────── */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-normal my-4">
          {translateSync("Nos établissements")}
        </h1>
        <h2 className="text-3xl font-normal my-4 text-[#777765]">
          {translateSync(
            "Une collection choisie avec soin, pour celles et ceux en quête d'exceptions."
          )}
        </h2>
        {!etablissementLoading && total > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            {etablissements.length} / {total} {translateSync("établissements")}
          </p>
        )}
      </div>

      {/* ── Grille de cartes ─────────────────────────────────────────────── */}
      {etablissementLoading ? (
        <CategoriesSkeleton />
      ) : etablissements.length === 0 ? (
        <p className="col-span-3 text-center py-12">
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
                location={card.adresse}
                remise_offres={card.remise_offres}
                prix_offres={card.prix_offres}
              />
            ))}
          </div>

          {/* ── Sentinelle scroll infini ──────────────────────────────── */}
          <div ref={loaderRef} className="h-16 flex items-center justify-center mt-8">
            {isLoadingMore && (
              <svg
                className="animate-spin h-8 w-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
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
              <p className="text-sm text-gray-400">
                {translateSync("Tous les établissements sont affichés.")}
              </p>
            )}
          </div>
        </>
      )}

      {/* ── Bouton retour ────────────────────────────────────────────────── */}
      <div className="w-full flex items-center justify-center mb-2 mt-4">
        <ButtonIcon title={translateSync("Accueil")} link={paths.main} />
      </div>
    </div>
  );
}