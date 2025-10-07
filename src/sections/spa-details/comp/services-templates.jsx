import React from "react";
import CategoryPuce from "../../../components/category-puce/categoryPuce";
import CardItem from "src/components/card-item/card-item";
import { CONFIG } from "src/config-global";

export default function ServicesTemplates({ data = {} }) {
  // Sécurité pour éviter les erreurs si data est vide
  const produits = data.type_produit || [];
  console.log(produits)
  const equipements = data.type_equipement.map(
    (pivot) => pivot.service_equipement || []
  );


  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start ">
      {/* Content Section */}
      <div className="w-full text-center">
        <div className="p-2 bg-[#F6F5E9] rounded-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Équipements
          </h3>
          <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
            {data.description}
          </p>
          {equipements.length > 0 ? (
            <div className="flex flex-wrap gap-4 mx-auto items-center justify-center mb-4 mt-4">
              {equipements.map((equip) => (
                <div className="flex items-center gap-1" key={equip.id}>
                  <div className="rounded-full w-8 h-8 ">
                    <img lazyload="lazy"
                      src={CONFIG.serverUrl+"/storage/"+equip.image}
                      alt={equip.name}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-secondary text-base font-tahoma uppercase">{equip.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 font-tahoma py-12">Aucun équipement trouvé.</p>
          )}
        </div>

        {/* Produits */}
        <div className="bg-[#F6F5E9] px-6 grid-cols-1 md:grid-cols-3 gap-6 mt-6 rounded-xl">
          {produits.length > 0 ? (
            produits.map((prod) => (
              <CardItem
                key={prod.id}
                id={prod.id}
                image={prod.image}
                gallery={prod.galleries_images}
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
            <p className="text-gray-500 col-span-3 font-tahoma py-12">
              Aucun produit disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
