import React, { useState, useMemo } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import ButtonIcon from "src/components/button-icon/button-icon";
import Select from "react-select"; // ← Ajouté

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

  // Conversion des données pour react-select
  const typeOptions = types.map((t) => ({ value: t.id, label: t.name }));
  const villeOptions = villes.map((v) => ({ value: v.id, label: v.name }));
  const serviceOptions = services.map((s) => ({ value: s.id, label: s.name }));

  // Styles personnalisés (proche de ton design actuel)
  const customStyles = {
    control: (base) => ({
      ...base,
      border: "none",
      borderRadius: "0.5rem",
      boxShadow: "none",
      minHeight: "48px",
      backgroundColor: "transparent",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      marginTop: "4px",
      zIndex: 9999,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const handleSelectChange = (name) => (selected) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selected ? selected.value : null,
    }));
  };

  // Filtrage optimisé avec useMemo
  const filteredCards = useMemo(() => {
    return cardsByCategory.filter((card) => {
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
      {/* Titre des filtres */}
      <p className="text-center text-4xl font-semibold my-4">Filtrer par</p>

      {/* Filtres avec react-select */}
      <div className="grid grid-cols-1 md:grid-cols-3 px-2 gap-4 font-roboto mb-16">
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
            onChange={handleSelectChange("region")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
        {/* Type d'établissement */}
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
            onChange={handleSelectChange("etablissement")}
            isClearable
            isSearchable
            menuPortalTarget={document.body} // ← Z-index parfait
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
            onChange={handleSelectChange("service")}
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
      </div>

      {/* Titre de la section */}
      <div className="mb-10">
        <h1 className="text-center text-4xl font-normal my-4">
          Nos établissements
        </h1>
        <h2 className="text-center text-3xl font-normal my-4 text-[#777765]">
          Une collection choisie avec soin, pour celles et ceux en quête
          d’exceptions.
        </h2>
      </div>

      {/* Cartes */}
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 px-3">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <SpaCard
                key={card.id}
                to={paths.spa.details(card.slug)}
                title={card.nom}
                image={card.image_avant}
                description={card.description_avant}
                location={card.adresse}
                remise_offres={card.remise_offres}
                prix_offres={card.prix_offres}
                nombre_offres={card.nombre_offres}
              />
            ))
          ) : (
            <p className="col-span-3 text-center">Aucun résultat trouvé.</p>
          )}
        </div>
      )}

      <div className="w-full flex items-center justify-center mb-2">
        <ButtonIcon title="Accueil" link={paths.main} />
      </div>
    </div>
  );
}
