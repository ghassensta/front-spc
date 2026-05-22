import React, { useState } from "react";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import Card from "src/components/card/card";
import { CONFIG } from "src/config-global";
import Select from "react-select";
import { useTranslation } from "src/context/translation-context";
import TrustBar from "src/components/trust-bar/TrustBar.jsx";
import ButtonLink from "src/components/button-link/ButtonLink";
import SectionHeader from "src/components/section-header/SectionHeader";
import { FaMapMarkerAlt, FaSpa } from "react-icons/fa";
import { MdTune } from "react-icons/md";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

function getPageNumbers(current, total) {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else if (current <= 3) {
    for (let i = 1; i <= 4; i++) pages.push(i);
    pages.push("...");
    pages.push(total);
  } else if (current >= total - 2) {
    pages.push(1);
    pages.push("...");
    for (let i = total - 3; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push("...");
    pages.push(total);
  }
  return pages;
}

const customStyles = {
  control: (base) => ({
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

const sortOptions = [
  { value: "pertinence", label: "Pertinence" },
  { value: "prix_asc", label: "Prix croissant" },
  { value: "prix_desc", label: "Prix décroissant" },
  { value: "note", label: "Mieux notés" },
];

export default function CategoriesPageView({
  spaList = [],
  pagination = {},
  priceRange = { min: 0, max: 1000 },
  catLoading,
  isFiltering,
  filters = {},
  page = 1,
  handleSelectFilter,
  handlePriceFilter,
  handlePageChange,
  villes = [],
  types = [],
  services = [],
  formules = [],
  filterLoading,
  nomcat = "",
  slug_categorie = "",
  description = "",
}) {
  const { translateSync } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);

  const priceMin = priceRange.min ?? 0;
  const priceMax = priceRange.max ?? 1000;
  const displayMin = filters.min_price ?? priceMin;
  const displayMax = filters.max_price ?? priceMax;

  const typeOptions = types.map((t) => ({
    value: t.id,
    label: translateSync(t.name),
  }));
  const villeOptions = villes.map((v) => ({
    value: v.id,
    label: translateSync(v.name),
  }));
  const formulesOptions = formules.map((s) => ({
    value: s.id,
    label: translateSync(s.name),
  }));

  if (filterLoading) return <FiltersSkeleton />;
  console.log({
    spaList,
    pagination,
    priceRange,
    catLoading,
    isFiltering,
    filters,
    page,
    handleSelectFilter,
    handlePriceFilter,
    handlePageChange,
    villes,
    types,
    services,
    formules,
    filterLoading,
    nomcat,
    slug_categorie,
    description,
  });
  return (
    <div className="max-w-6xl mx-auto px-4 py-6" >
      {/* ── Titre ── */}
      <SectionHeader
        label="Spa & Prestige Collection"
        title={nomcat || "Nos expériences"}
        asH1
      />
      {description && (
        <h2
          className="mb-8 font-light text-2xl md:text-3xl text-black text-center max-w-3xl mx-auto"
          
        >
          {translateSync(description) ||
            translateSync(
              "Une collection choisie avec soin, pour celles et ceux en quête d'exception.",
            )}
        </h2>
      )}

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {/* Ville */}
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
              onChange={(opt) =>
                handleSelectFilter("region_id")(opt?.value ?? null)
              }
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
              className="flex-1"
            />
          </div>

          {/* Type */}
          <div
            className="flex items-center gap-2 rounded-lg border bg-white"
            style={{ borderColor: "#e0d8cc" }}
          >
            <FaSpa className="ml-3 shrink-0" style={{ color: GOLD }} />
            <Select
              instanceId="select-type"
              styles={customStyles}
              placeholder={translateSync("Quel type d'expérience ?")}
              options={typeOptions}
              value={
                typeOptions.find(
                  (o) => o.value === filters.type_etablissement_id,
                ) ?? null
              }
              onChange={(opt) =>
                handleSelectFilter("type_etablissement_id")(opt?.value ?? null)
              }
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
              className="flex-1"
            />
          </div>

          {/* Formule */}
          <div
            className="flex items-center gap-2 rounded-lg border bg-white"
            style={{ borderColor: "#e0d8cc" }}
          >
            <MdTune
              className="ml-3 shrink-0 text-base"
              style={{ color: GOLD }}
            />
            <Select
              instanceId="select-formule"
              styles={customStyles}
              placeholder={translateSync("Vos envies")}
              options={formulesOptions}
              value={
                formulesOptions.find((o) => o.value === filters.formule_id) ??
                null
              }
              onChange={(opt) =>
                handleSelectFilter("formule_id")(opt?.value ?? null)
              }
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
              className="flex-1"
            />
          </div>

          {/* Prix range */}
          <div
            className="rounded-lg border bg-white px-4 py-3"
            style={{ borderColor: "#e0d8cc" }}
          >
            <p
              className="text-xs text-gray-400 mb-2"
              
            >
              {translateSync("Prix")}
            </p>
            <div className="relative mb-4 h-2">
              <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2" />
              <div
                className="absolute h-1 rounded-full top-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: GOLD,
                  left: `${((displayMin - priceMin) / (priceMax - priceMin || 1)) * 100}%`,
                  width: `${((displayMax - displayMin) / (priceMax - priceMin || 1)) * 100}%`,
                }}
              />
              <input
                type="range"
                className="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent h-1 range-slider"
                min={priceMin}
                max={priceMax}
                step="1"
                value={displayMin}
                onChange={(e) => handlePriceFilter("min_price", e.target.value)}
              />
              <input
                type="range"
                className="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent h-1 range-slider"
                min={priceMin}
                max={priceMax}
                step="1"
                value={displayMax}
                onChange={(e) => handlePriceFilter("max_price", e.target.value)}
              />
            </div>
            <div
              className="flex items-center justify-between text-xs text-gray-500"
              
            >
              <span>€ {displayMin}</span>
              <span style={{ color: GOLD }}>—</span>
              <span>€ {displayMax}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Compteur + Trier par ── */}
      {!catLoading && pagination.total > 0 && (
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs text-gray-400" >
            {pagination.from} / {pagination.total} {translateSync("résultats")}
          </p>
       
        </div>
      )}

      {/* ── Cartes ── */}
      {catLoading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-10 px-1 mb-10 transition-opacity duration-200 ${isFiltering ? "opacity-40 pointer-events-none" : ""}`}
          >
            {spaList.length > 0 ? (
              spaList.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  to={paths.product(card.slug)}
                  headTitle={translateSync(card.etablissement.nom)}
                  image={`${CONFIG.serverUrl}/storage/${card.image}`}
                  description={translateSync(card.description_avant)}
                  location={translateSync(card.etablissement.adresse_complete)}
                  title={translateSync(card.nom)}
                  offreValue={card.remise_produit}
                  inWishlist={card.inWishlist}
                  price={card.prix}
                  duration={card.duree}
                  exclusivite_image={card.exclusivite_image}
                  remise_desc_produit={translateSync(card.remise_desc_produit)}
                  date_fin={card.date_fin}
                  date_debut={card.date_debut}
                  offre_flash={card.offre_flash}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                {slug_categorie === "vitalite" && (
                  <p
                    className="text-xl text-gray-500 mt-2"
                    
                  >
                    {translateSync(
                      "Retrouvez ici prochainement les offres Vitalité.",
                    )}
                  </p>
                )}
                <p
                  className="text-base text-gray-400 mt-2"
                  
                >
                  {translateSync("Aucun résultat trouvé.")}
                </p>
              </div>
            )}
          </div>

          {pagination.last_page > 1 && (
            <div className="flex flex-col items-center gap-3 mb-10">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
                  style={{
                    backgroundColor: "#f0ece4",
                    color: "#555",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = GOLD) &&
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0ece4") &&
                    (e.currentTarget.style.color = "#555")
                  }
                >
                  {translateSync("Précédent")}
                </button>

                {getPageNumbers(
                  pagination.current_page,
                  pagination.last_page,
                ).map((p, i) =>
                  p === "..." ? (
                    <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className="w-9 h-9 rounded-lg font-medium text-sm transition-colors"
                      style={{
                        backgroundColor: page === p ? GOLD : "#f0ece4",
                        color: page === p ? "#fff" : "#555",
                        
                      }}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.last_page}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
                  style={{
                    backgroundColor: "#f0ece4",
                    color: "#555",
                    
                  }}
                >
                  {translateSync("Suivant")}
                </button>
              </div>
              <p className="text-xs text-gray-400" >
                {translateSync("Page")} {pagination.current_page}{" "}
                {translateSync("sur")} {pagination.last_page}
              </p>
            </div>
          )}
        </>
      )}

      <TrustBar />
      <ButtonLink to={paths.main} text="Accueil" className="mt-4" />
    </div>
  );
}
