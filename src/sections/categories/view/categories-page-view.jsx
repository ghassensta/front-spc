import React from "react";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import ButtonIcon from "src/components/button-icon/button-icon";
import Card from "src/components/card/card";
import { CONFIG } from "src/config-global";
import Select from "react-select";
import { useTranslation } from "src/context/translation-context";

// ─── Utilitaire pagination (hors composant) ──────────────────────────────────
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

export default function CategoriesPageView({
  // données venant du hook useCategoryProducts (via spread dans Page)
  spaList        = [],
  pagination     = {},
  priceRange     = { min: 0, max: 1000 },
  catLoading,
  isFiltering,
  filters        = {},
  page           = 1,
  handleSelectFilter,
  handlePriceFilter,
  handlePageChange,
  // données statiques venant de Page
  villes         = [],
  types          = [],
  services       = [],
  formules       = [],
  filterLoading,
  nomcat         = "",
  slug_categorie = "",
  description    = "",
}) {
  const { translateSync } = useTranslation();

  const priceMin = 50;
  const priceMax = priceRange.max ?? 1000;

  const displayMin = filters.min_price ?? priceMin;
  const displayMax = filters.max_price ?? priceMax;

  const typeOptions    = types.map((t) => ({ value: t.id, label: translateSync(t.name) }));
  const villeOptions   = villes.map((v) => ({ value: v.id, label: translateSync(v.name) }));
  const formulesOptions = formules.map((s) => ({ value: s.id, label: translateSync(s.name) }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "0.5rem",
      marginTop: "0.5rem",
      boxShadow: "none",
      padding: "0.25rem",
      backgroundColor: "transparent",
      minHeight: "48px",
    }),
    valueContainer: (provided) => ({ ...provided, paddingLeft: "0.5rem" }),
    placeholder:    (provided) => ({ ...provided, color: "#9ca3af" }),
    singleValue:    (provided) => ({ ...provided, color: "#111" }),
    menu:           (provided) => ({ ...provided, borderRadius: "0.5rem", marginTop: "4px", zIndex: 9999 }),
    menuPortal:     (provided) => ({ ...provided, zIndex: 9999 }),
  };

  if (filterLoading) return <FiltersSkeleton />;

  return (
    <div className="max-w-6xl mx-auto p-1">
      <p className="text-center text-4xl font-semibold my-4">{translateSync("Filtrer par")}</p>

      {/* ── FILTRES ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-2 gap-4 font-roboto mb-8">

        {/* Région */}
        <div className="border rounded-lg">
          <Select
            instanceId="select-region"
            styles={customStyles}
            placeholder={translateSync("Région ou ville")}
            options={villeOptions}
            value={villeOptions.find((opt) => opt.value === filters.region_id) || null}
            onChange={(opt) => handleSelectFilter("region_id")(opt?.value ?? null)}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        {/* Type établissement */}
        <div className="border rounded-lg">
          <Select
            instanceId="select-etablissement"
            styles={customStyles}
            placeholder={translateSync("Type d'établissement")}
            options={typeOptions}
            value={typeOptions.find((opt) => opt.value === filters.type_etablissement_id) || null}
            onChange={(opt) => handleSelectFilter("type_etablissement_id")(opt?.value ?? null)}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        {/* Formule / Type de soins */}
        <div className="border rounded-lg">
          <Select
            instanceId="select-service"
            styles={customStyles}
            placeholder={translateSync("Duo / Solo")}
            options={formulesOptions}
            value={formulesOptions.find((opt) => opt.value === filters.formule_id) || null}
            onChange={(opt) => handleSelectFilter("formule_id")(opt?.value ?? null)}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        {/* Prix */}
        <div className="border rounded-lg p-2">
          <div className="relative mb-6 h-2">
            <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2" />
            <div
              className="absolute h-1 bg-black rounded-full top-1/2 transform -translate-y-1/2"
              style={{
                left:  `${((displayMin - priceMin) / ((priceMax - priceMin) || 1)) * 100}%`,
                width: `${((displayMax - displayMin) / ((priceMax - priceMin) || 1)) * 100}%`,
              }}
            />
            <input
              type="range"
              aria-label={translateSync("De")}
              className="absolute w-full top-1/2 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto h-1 range-slider"
              min={priceMin}
              max={priceMax}
              step="1"
              value={displayMin}
              onChange={(e) => handlePriceFilter("min_price", e.target.value)}
            />
            <input
              type="range"
              aria-label={translateSync("À")}
              className="absolute w-full top-1/2 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto h-1 range-slider"
              min={priceMin}
              max={priceMax}
              step="1"
              value={displayMax}
              onChange={(e) => handlePriceFilter("max_price", e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center flex-1 text-sm">
              <span className="prefix text-gray-500 mr-1">€</span>
              <input
                aria-label={translateSync("De")}
                className="field w-full bg-transparent focus:outline-none"
                type="number"
                min={priceMin}
                max={priceMax}
                step="1"
                placeholder={priceMin}
                value={filters.min_price ?? ""}
                onChange={(e) => handlePriceFilter("min_price", e.target.value)}
              />
            </label>
            <span className="text-gray-500 text-sm">{translateSync("à")}</span>
            <label className="flex items-center flex-1 text-sm">
              <span className="prefix text-gray-500 mr-1">€</span>
              <input
                aria-label={translateSync("À")}
                className="field w-full bg-transparent focus:outline-none"
                type="number"
                min={priceMin}
                max={priceMax}
                step="1"
                placeholder={priceMax}
                value={filters.max_price ?? ""}
                onChange={(e) => handlePriceFilter("max_price", e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>

      {/* ── EN-TÊTE ─────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <h1 className="text-center text-4xl font-normal my-4">{translateSync(nomcat)}</h1>
        <h2 className="text-center text-3xl font-normal my-4 text-[#777765]">{translateSync(description)}</h2>
      </div>

      {/* ── CARDS ───────────────────────────────────────────────────────────── */}
      {catLoading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {/* Compteur */}
          {pagination.total > 0 && (
            <div className="px-3 mb-4 flex justify-between items-center text-sm text-gray-600">
              <p>
                {translateSync("Affichage de")} {pagination.from} {translateSync("à")}{" "}
                {pagination.to} {translateSync("sur")} {pagination.total}{" "}
                {translateSync("résultat")}{pagination.total > 1 ? "s" : ""}
              </p>
              <p>
                {translateSync("Page")} {pagination.current_page} {translateSync("sur")} {pagination.last_page}
              </p>
            </div>
          )}

          {/* Grille — opacité réduite pendant un filtre/changement de page */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 px-3 mb-8 transition-opacity duration-200 ${
              isFiltering ? "opacity-40 pointer-events-none" : "opacity-100"
            }`}
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
                  <p className="text-3xl font-normal mt-6">
                    {translateSync("Retrouvez ici prochainement les offres Vitalité.")}
                  </p>
                )}
                <p className="text-xl text-gray-500 mt-4">{translateSync("Aucun résultat trouvé.")}</p>
              </div>
            )}
          </div>

          {/* ── PAGINATION ────────────────────────────────────────────────── */}
          {pagination.last_page > 1 && (
            <div className="w-full flex flex-col items-center gap-4 mb-10">
              <div className="flex items-center gap-2 flex-wrap justify-center">

                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {translateSync("Précédent")}
                </button>

                {getPageNumbers(pagination.current_page, pagination.last_page).map((p, index) =>
                  p === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                        page === p ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.last_page}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {translateSync("Suivant")}
                </button>

              </div>
              <p className="text-sm text-gray-600">
                {translateSync("Page")} {pagination.current_page} {translateSync("sur")} {pagination.last_page}
              </p>
            </div>
          )}
        </>
      )}

      <div className="w-full flex items-center justify-center mb-2">
        <ButtonIcon title={translateSync("Accueil")} link={paths.main} />
      </div>
    </div>
  );
}