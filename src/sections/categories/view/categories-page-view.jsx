import React, { useState, useMemo, useEffect } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import ButtonIcon from "src/components/button-icon/button-icon";
import Card from "src/components/card/card";
import { CONFIG } from "src/config-global";
import Select from "react-select";

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
  const [filters, setFilters] = useState({
    etablissement: null,
    region: null,
    service: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const typeOptions = types.map((t) => ({ value: t.id, label: t.name }));
  const villeOptions = villes.map((v) => ({ value: v.id, label: v.name }));
  const serviceOptions = services.map((s) => ({ value: s.id, label: s.name }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "0.5rem",
      boxShadow: "none",
      padding: "0.25rem",
      backgroundColor: "transparent",
      minHeight: "48px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "0.5rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      marginTop: "4px",
      zIndex: 9999,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleChange = (name) => (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : null,
    }));
    setCurrentPage(1);
  };

  const filteredCards = useMemo(() => {
    return cardsByCategory.filter((card) => {
      if (!card) return false;

      const matchType = filters.etablissement
        ? card.types_etablissement_ids?.includes(
            parseInt(filters.etablissement)
          )
        : true;

      const matchRegion = filters.region
        ? card.region_ids?.includes(parseInt(filters.region))
        : true;

      const matchService = filters.service
        ? card.type_equipement_ids?.includes(parseInt(filters.service))
        : true;

      return matchType && matchRegion && matchService;
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [slug_categorie]);

  if (filterLoading) {
    return <FiltersSkeleton />;
  }
  //

  return (
    <div className="max-w-6xl mx-auto p-1">
      <p className="text-center text-4xl font-semibold my-4">Filtrer par</p>
      <div className="grid grid-cols-1 md:grid-cols-3 px-2 gap-4 font-roboto mb-8">
        <div className="border rounded-lg">
          <Select
            instanceId="select-region"
            styles={customStyles}
            placeholder="Région ou ville"
            options={villeOptions}
            value={
              villeOptions.find((opt) => opt.value === filters.region) || null
            }
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
            placeholder="Type d'établissement"
            options={typeOptions}
            value={
              typeOptions.find((opt) => opt.value === filters.etablissement) ||
              null
            }
            onChange={handleChange("etablissement")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        {}
        <div className="border rounded-lg">
          <Select
            instanceId="select-service"
            styles={customStyles}
            placeholder="Services et équipements"
            options={serviceOptions}
            value={
              serviceOptions.find((opt) => opt.value === filters.service) ||
              null
            }
            onChange={handleChange("service")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-center text-4xl font-normal my-4">{nomcat}</h1>
        <h2 className="text-center text-3xl font-normal my-4 text-[#777765]">
          {description}
        </h2>
      </div>

      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {}
          {filteredCards.length > 0 && (
            <div className="px-3 mb-4 flex justify-between items-center text-sm text-gray-600">
              <p>
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                {Math.min(currentPage * itemsPerPage, filteredCards.length)} sur{" "}
                {filteredCards.length} résultat
                {filteredCards.length > 1 ? "s" : ""}
              </p>
              <p>
                Page {currentPage} sur {totalPages}
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
                  headTitle={card.etablissement.nom}
                  image={`${CONFIG.serverUrl}/storage/${card.image}`}
                  description={card.description_avant}
                  location={card.etablissement.adresse_complete}
                  title={card.nom}
                  offreValue={card.remise_produit}
                  inWishlist={card.inWishlist}
                  price={card.prix+ "€"}
                  duration={card.duree}
                  exclusivite_spc={card.exclusivite_spc}
                  remise_desc_produit={card.remise_desc_produit}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                {slug_categorie === "vitalite" && (
                  <p className="text-3xl font-normal mt-6">
                    Retrouvez ici prochainement les offres Vitalité.
                  </p>
                )}

                <p className="text-xl text-gray-500 mt-4">
                  Aucun résultat trouvé.
                </p>
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
                  Précédent
                </button>

                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-gray-500"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                        currentPage === page
                          ? "bg-black text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
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
                  Suivant
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </p>
            </div>
          )}
        </>
      )}

      <div className="w-full flex items-center justify-center mb-2">
        <ButtonIcon title="Accueil" link={paths.main} />
      </div>
    </div>
  );
}
