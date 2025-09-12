import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { categoriesCards } from "src/_mock/data";
import Card from "src/components/card/card";

export default function CategoriesPageView() {
  const { slog } = useParams(); // <-- get the slug from the URL

  const [filters, setFilters] = useState({
    etablissement: "",
    region: "",
    service: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Step 1: filter by slug (category)
  const cardsByCategory = categoriesCards.filter(
    (card) => card.category?.toLowerCase() === slog.toLowerCase()
  );

  // Step 2: apply the dropdown filters
  const filteredCards = cardsByCategory.filter((card) => {
    return (
      (filters.etablissement ? card.etablissement === filters.etablissement : true) &&
      (filters.region ? card.region === filters.region : true) &&
      (filters.service ? card.service === filters.service : true)
    );
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 font-roboto mb-16">
        <div className="border rounded-lg">
          <select
            className="w-full p-2 border-none focus:outline-none"
            name="etablissement"
            value={filters.etablissement}
            onChange={handleChange}
          >
            <option value="">Sélectionnez type d'établissement</option>
            {[...new Set(cardsByCategory.map((c) => c.etablissement))].map((etablissement) => (
              <option key={etablissement} value={etablissement}>
                {etablissement}
              </option>
            ))}
          </select>
        </div>
        <div className="border rounded-lg">
          <select
            className="w-full p-2 border-none focus:outline-none"
            name="region"
            value={filters.region}
            onChange={handleChange}
          >
            <option value="">Région ou ville</option>
            {[...new Set(cardsByCategory.map((c) => c.region))].map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="border rounded-lg">
          <select
            className="w-full p-2 border-none focus:outline-none"
            name="service"
            value={filters.service}
            onChange={handleChange}
          >
            <option value="">Services et équipements</option>
            {[...new Set(cardsByCategory.map((c) => c.service))].map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-12">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => <Card key={index} {...card} />)
        ) : (
          <p className="col-span-3 text-center">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}