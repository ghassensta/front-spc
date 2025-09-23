import React, { useState } from "react";
import SpaCard from "src/components/spa-card/spa-card";
import { paths } from "src/router/paths";

export default function CategoriesPageView({
  cardsByCategory = [],
  villes = [],
  types = [],
  services = [],
}) {
  const [filters, setFilters] = useState({
    etablissement: "",
    region: "",
    service: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
  const filteredCards = cardsByCategory.filter((card) => {
    return (
      (filters.etablissement
        ? card.types_etablissement_ids?.includes(parseInt(filters.etablissement))
        : true) &&
      (filters.region
        ? card.region_ids?.includes(parseInt(filters.region))
        : true) &&
      (filters.service
        ? card.type_equipement_ids?.includes(parseInt(filters.service))
        : true)
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-1">
      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 font-roboto mb-16">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <SpaCard
              key={card.id}
              to={paths.spa.details(card.slug)}
              title={card.nom}
              image={card.image_avant}
              description={card.description_avant}
            />
          ))
        ) : (
          <p className="col-span-3 text-center">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}
