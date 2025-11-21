import React, { useState, useMemo } from "react";
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
}) {
  const [filters, setFilters] = useState({
    etablissement: null,
    region: null,
    service: null,
  });

  // Conversion des options pour react-select
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

  if (filterLoading) {
    return <FiltersSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto p-1">
      <p className="text-center text-4xl font-semibold my-4">Filtrer par</p>
      <div className="grid grid-cols-1 md:grid-cols-3 px-2 gap-4 font-roboto mb-8">
        <div className="border rounded-lg">
          <Select
            instanceId="select-etablissement"
            styles={customStyles}
            placeholder="Sélectionnez type d'établissement"
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

        {/* Région / Ville */}
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

        {/* Services & équipements */}
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
        <p className="text-center text-4xl font-normal my-4">Soins Visage</p>
        <p className="text-center text-3xl font-normal my-4 text-[#777765]">
          Sublimez votre peau et révélez votre éclat grâce à nos soins experts.
        </p>
      </div>

      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 px-3">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <Card
                  key={card.id}
                  to={paths.product(card.slug)}
                  headTitle={card.etablissement.nom}
                  image={`${CONFIG.serverUrl}/storage/${card.image}`}
                  description={card.description_avant}
                  location={card.etablissement.adresse_complete}
                  title={card.nom}
                  offreValue={card.remise_produit}
                />
              ))
            ) : (
              <p className="col-span-3 text-center text-xl text-gray-500">
                Aucun résultat trouvé.
              </p>
            )}
          </div>

          <div className="w-full flex justify-center mb-10">
            <button className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white mt-6">
              CHARGER PLUS D’OFFRES
            </button>
          </div>
        </>
      )}
    </div>
  );
}
