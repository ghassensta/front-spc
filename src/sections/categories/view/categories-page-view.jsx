import React, { useState } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";
import CategoriesSkeleton from "../categories-skeleton";
import FiltersSkeleton from "../filters-skeleton";
import Header from "src/sections/home/comp/header";
import ButtonIcon from "src/components/button-icon/button-icon";

export default function CategoriesPageView({
  cardsByCategory = [],
  villes = [],
  types = [],
  services = [],
  loading,
  filterLoading,
}) {
  const [filters, setFilters] = useState({
    etablissement: "",
    region: "",
    service: "",
  });

  console.log(cardsByCategory)

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
  const filteredCards = cardsByCategory.filter((card) => {
    return (
      (filters.etablissement
        ? card.types_etablissement_ids?.includes(
            parseInt(filters.etablissement)
          )
        : true) &&
      (filters.region
        ? card.region_ids?.includes(parseInt(filters.region))
        : true) &&
      (filters.service
        ? card.type_equipement_ids?.includes(parseInt(filters.service))
        : true)
    );
  });

  if (filterLoading) {
    return <FiltersSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto p-1">
      <div className="text-center w-full flex flex-col z-10 relative items-center p-4">
        <p className="text-secondary text-2xl font-medium lg:w-3/4 mb-4">
          Rejoignez la Communauté Privée Spa & Prestige Collection ! Plongez
          dans un univers d’exception et{" "}
          <span className="underline">
            laissez-vous séduire par des privilèges rares et uniques…
          </span>
        </p>

        {/* Bouton vers la page carte cadeau */}
        <ButtonIcon
          title="Découvrir les offres"
          link={paths.spa.list}
          variant="filled"
          size="md"
        />
      </div>
      {/* Filters */}
      <p className="text-center text-4xl font-semibold my-4">Filtrer par</p>
      <div className="grid grid-cols-1 md:grid-cols-3 px-2 gap-4 font-roboto mb-16">
        {/* Types (Établissements) */}
        <div className="border rounded-lg">
          <select
            className="w-full p-2 border-none focus:outline-none"
            name="etablissement"
            value={filters.etablissement}
            onChange={handleChange}
          >
            <option value="">Sélectionnez type d'établissement</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Villes */}
        <div className="border rounded-lg">
          <select
            className="w-full p-2 border-none focus:outline-none"
            name="region"
            value={filters.region}
            onChange={handleChange}
          >
            <option value="">Région ou ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>
                {ville.name}
              </option>
            ))}
          </select>
        </div>

        {/* Services / Équipements */}
        <div className="border rounded-lg">
          <select
            className="w-full p-2 border-none focus:outline-none"
            name="service"
            value={filters.service}
            onChange={handleChange}
          >
            <option value="">Services et équipements</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12">
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
    </div>
  );
}
