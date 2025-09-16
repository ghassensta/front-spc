import React from "react";
import CategoryPuce from "../../../components/category-puce/categoryPuce";
import CardItem from "src/components/card-item/card-item";
import { CONFIG } from "src/config-global";

export default function ServicesTemplates({ data = {} }) {
  // Sécurité pour éviter les erreurs si data est vide
  const produits = data.type_produit || [];
  const equipements = data.type_equipement.map((pivot) => pivot.service_equipement || []);

  return (
    <div className="bg-[#f9f7ed] p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start rounded-lg shadow">
      {/* Content Section */}
      <div className="w-full text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Listing Équipements
        </h3>
        <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
          {data.description}
        </p>
        {equipements.length > 0 ? (
          <div className="flex flex-wrap gap-4 mx-auto items-center justify-center mb-4 mt-4">
            {equipements.map((equip) => (
              <CategoryPuce
                key={equip.id}
                name={`${equip.name}`} 
                icon={`${CONFIG.serverUrl}/storage/${equip.image}`} // concaténation correcte
                link="#"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun équipement trouvé.</p>
        )}

        {/* Produits */}
        <div className="bg-[#f6f4ec] p-6  grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {produits.length > 0 ? (
            produits.map((prod) => (
              <CardItem
                key={prod.id}
                id={prod.id}
                image={prod.image}
                slug={prod.slug}
                nom={prod.nom}
                description={prod.description}
                access_spa={prod.access_spa}
                prix={prod.prix}
                exclusivite_spc={prod.exclusivite_spc}
                date_fin={prod.date_fin}
                type_id={prod.type_id}
                conditions_utilisation={prod.conditions_utilisation}
                offre_flash={prod.offre_flash}
                date_debut={prod.date_debut}
                prix_barre={prod.prix_barre}
                prix_au_lieu_de={prod.prix_au_lieu_de}
                ordre={prod.ordre}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-3">
              Aucun produit disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
