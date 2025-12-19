// src/sections/search/view/search-page-view.jsx
import React, { useEffect, useState } from "react";
import Card from "src/components/card/card";
import Serach from "src/components/header/serach";
import { useSearchProduits } from "src/actions/serach";
import { useParams } from "react-router-dom";

export default function SearchPageView() {
  const params = useParams();
  let { catSlug, villeSlug } = params;

  // Optimisation: Détecter si le premier paramètre est en réalité un villeSlug (contient - suivi de 5 chiffres)
  // Cela permet de gérer les recherches uniquement par ville (ex: /recherche/paris-75001)
  if (!villeSlug && catSlug && /\-\d{5}$/.test(catSlug)) {
    villeSlug = catSlug;
    catSlug = null;
  }

  const { data, loading } = useSearchProduits(catSlug, villeSlug);

  const produits = data?.results || [];
  const total = data?.total || 0;
  const categorie = data?.categorie;
  const ville = data?.ville;
  const codePostal = data?.code_postal;
  const title = categorie
    ? `${categorie.name} à ${ville || ""} ${
        codePostal ? `(${codePostal})` : ""
      }`.trim()
    : `Résultats à ${ville || ""} ${
        codePostal ? `(${codePostal})` : ""
      }`.trim();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <Serach />
        <h1 className="text-4xl font-bold">{title || "Recherche..."}</h1>
        <p className="text-xl text-gray-600 mt-2">
          {loading ? "Chargement..." : `${total} offre(s) trouvée(s)`}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
        </div>
      ) : produits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produits.map((p) => (
            <Card
              key={p.id}
              id={p.id ?? p.produit_id}
              to={p.url}
              headTitle={p.etablissement}
              image={p.image}
              title={p.label}
              description={p.adresse_complete}
              location={p.adresse_complete}
              offreValue={p.remise_produit}
              price={p.prix}
              remise_desc_produit={p.remise_desc_produit}
              exclusivite_spc={p.exclusivite_spc}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Aucun soin trouvé.</p>
      )}

      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition">
          CHARGER PLUS
        </button>
      </div>
    </div>
  );
}
