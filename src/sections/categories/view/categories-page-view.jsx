import React, { useState, useMemo, useEffect } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import ButtonIcon from "src/components/button-icon/button-icon";
import Card from "src/components/card/card";
import { CONFIG } from "src/config-global";
import Select from "react-select";
import { useTranslation } from "src/context/translation-context";

export default function CategoriesPageView({
  cardsByCategory = [],
  villes = [],
  types = [],
  services = [],
  loading,
  filterLoading,
  nomcat = "",
  slug_categorie = "",
  description = ""
}) {
  const { translateSync } = useTranslation();

  const overallPrices = useMemo(() => {
    const prices = cardsByCategory.filter(card => card && typeof card.prix === 'number').map(card => card.prix);
    if (!prices.length) return { min: 0, max: 1000 };
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [cardsByCategory]);

  const [filters, setFilters] = useState({
    etablissement: null,
    region: null,
    service: null,
    minPrice: null,
    maxPrice: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const typeOptions = types.map((t) => ({ value: t.id, label: translateSync(t.name) }));
  const villeOptions = villes.map((v) => ({ value: v.id, label: translateSync(v.name) }));
  const serviceOptions = services.map((s) => ({ value: s.id, label: translateSync(s.name) }));

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
    placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
    singleValue: (provided) => ({ ...provided, color: "#111" }),
    menu: (provided) => ({ ...provided, borderRadius: "0.5rem", marginTop: "4px", zIndex: 9999 }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const handleChange = (name) => (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : null,
    }));
    setCurrentPage(1);
  };

  const handleMinPriceChange = (e) => {
    let value = e.target.value ? parseFloat(e.target.value) : null;
    if (value !== null) {
      value = Math.max(overallPrices.min, Math.min(overallPrices.max, value));
      if (filters.maxPrice !== null && value > filters.maxPrice) value = filters.maxPrice;
    }
    setFilters((prev) => ({ ...prev, minPrice: value }));
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (e) => {
    let value = e.target.value ? parseFloat(e.target.value) : null;
    if (value !== null) {
      value = Math.max(overallPrices.min, Math.min(overallPrices.max, value));
      if (filters.minPrice !== null && value < filters.minPrice) value = filters.minPrice;
    }
    setFilters((prev) => ({ ...prev, maxPrice: value }));
    setCurrentPage(1);
  };

  const filteredCards = useMemo(() => {
    return cardsByCategory.filter((card) => {
      if (!card) return false;

      const matchType = filters.etablissement
        ? card.types_etablissement_ids?.includes(parseInt(filters.etablissement))
        : true;

      const matchRegion = filters.region
        ? card.region_ids?.includes(parseInt(filters.region))
        : true;

      const matchService = filters.service
        ? card.type_equipement_ids?.includes(parseInt(filters.service))
        : true;

      const matchPrice =
        (filters.minPrice === null || card.prix >= filters.minPrice) &&
        (filters.maxPrice === null || card.prix <= filters.maxPrice);

      return matchType && matchRegion && matchService && matchPrice;
    });
  }, [cardsByCategory, filters]);

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCards.slice(start, start + itemsPerPage);
  }, [filteredCards, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [slug_categorie]);

  if (filterLoading) return <FiltersSkeleton />;

  const displayMin = filters.minPrice ?? overallPrices.min;
  const displayMax = filters.maxPrice ?? overallPrices.max;

  return (
    <div className="max-w-6xl mx-auto p-1">
      <p className="text-center text-4xl font-semibold my-4">{translateSync("Filtrer par")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-2 gap-4 font-roboto mb-8">
        <div className="border rounded-lg">
          <Select
            instanceId="select-region"
            styles={customStyles}
            placeholder={translateSync("Région ou ville")}
            options={villeOptions}
            value={villeOptions.find((opt) => opt.value === filters.region) || null}
            onChange={handleChange("region")}
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
            placeholder={translateSync("Type d'établissement")}
            options={typeOptions}
            value={typeOptions.find((opt) => opt.value === filters.etablissement) || null}
            onChange={handleChange("etablissement")}
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
            value={serviceOptions.find((opt) => opt.value === filters.service) || null}
            onChange={handleChange("service")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
        <div className="border rounded-lg p-2">
          <div className="relative mb-6 h-2">
            <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2"></div>
            <div
              className="absolute h-1 bg-black rounded-full top-1/2 transform -translate-y-1/2"
              style={{
                left: `${((displayMin - overallPrices.min) / (overallPrices.max - overallPrices.min)) * 100}%`,
                width: `${((displayMax - displayMin) / (overallPrices.max - overallPrices.min)) * 100}%`,
              }}
            ></div>
            <input
              type="range"
              aria-label={translateSync("De")}
              className="absolute w-full top-1/2 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto h-1 range-slider"
              min={overallPrices.min}
              max={overallPrices.max}
              step="1"
              value={displayMin}
              onChange={handleMinPriceChange}
            />
            <input
              type="range"
              aria-label={translateSync("À")}
              className="absolute w-full top-1/2 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto h-1 range-slider"
              min={overallPrices.min}
              max={overallPrices.max}
              step="1"
              value={displayMax}
              onChange={handleMaxPriceChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center flex-1 text-sm">
              <span className="prefix text-gray-500 mr-1">€</span>
              <input
                aria-label={translateSync("De")}
                className="field w-full bg-transparent focus:outline-none"
                type="number"
                min={overallPrices.min}
                max={overallPrices.max}
                step="1"
                placeholder={overallPrices.min}
                value={filters.minPrice ?? ""}
                onChange={handleMinPriceChange}
              />
            </label>
            <span className="text-gray-500 text-sm">{translateSync("à")}</span>
            <label className="flex items-center flex-1 text-sm">
              <span className="prefix text-gray-500 mr-1">€</span>
              <input
                aria-label={translateSync("À")}
                className="field w-full bg-transparent focus:outline-none"
                type="number"
                min={overallPrices.min}
                max={overallPrices.max}
                step="1"
                placeholder={overallPrices.max}
                value={filters.maxPrice ?? ""}
                onChange={handleMaxPriceChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-center text-4xl font-normal my-4">{translateSync(nomcat)}</h1>
        <h2 className="text-center text-3xl font-normal my-4 text-[#777765]">{translateSync(description)}</h2>
      </div>

      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {filteredCards.length > 0 && (
            <div className="px-3 mb-4 flex justify-between items-center text-sm text-gray-600">
              <p>
                {translateSync("Affichage de")} {(currentPage - 1) * itemsPerPage + 1} {translateSync("à")}{" "}
                {Math.min(currentPage * itemsPerPage, filteredCards.length)} {translateSync("sur")} {filteredCards.length} {translateSync("résultat")}{filteredCards.length > 1 ? "s" : ""}
              </p>
              <p>
                {translateSync("Page")} {currentPage} {translateSync("sur")} {totalPages}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 px-3 mb-8">
            {currentData.length > 0 ? (
              currentData.map((card) => (
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
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                {slug_categorie === "vitalite" && (
                  <p className="text-3xl font-normal mt-6">{translateSync("Retrouvez ici prochainement les offres Vitalité.")}</p>
                )}

                <p className="text-xl text-gray-500 mt-4">{translateSync("Aucun résultat trouvé.")}</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="w-full flex flex-col items-center gap-4 mb-10">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {translateSync("Précédent")}
                </button>

                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${currentPage === page ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {translateSync("Suivant")}
                </button>
              </div>

              <p className="text-sm text-gray-600">
                {translateSync("Page")} {currentPage} {translateSync("sur")} {totalPages}
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
