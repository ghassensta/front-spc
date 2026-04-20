import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Card from "src/components/card/card";
import Serach from "src/components/header/serach";
import { useSearchProduits } from "src/actions/serach";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";
import LoadMoreButton from "src/components/load-button/LoadMoreButton";
export default function SearchPageView() {
  const params = useParams();
  let { catSlug, villeSlug } = params;

  if (!villeSlug && catSlug && /\-\d{5}$/.test(catSlug)) {
    villeSlug = catSlug;
    catSlug = null;
  }

  const [page, setPage] = useState(1);
  const [allProduits, setAllProduits] = useState([]);
  const perPage = 12;

  const { data, loading, error } = useSearchProduits(catSlug, villeSlug, {
    page,
    per_page: perPage,
  });

  React.useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setAllProduits(data.results);
      } else {
        setAllProduits((prev) => [...prev, ...data.results]);
      }
    }
  }, [data, page]);

  const produits = allProduits;
  const total = data?.total || 0;
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;
  const categorie = data?.categorie;
  const ville = data?.filtre_ville || data?.ville;
  const codePostal = data?.filtre_code_postal || data?.code_postal;

  const title = categorie
    ? `${categorie.name} à ${ville || ""} ${codePostal ? `(${codePostal})` : ""}`.trim()
    : ville || codePostal
      ? `Résultats à ${ville || ""} ${codePostal ? `(${codePostal})` : ""}`.trim()
      : "Recherche de soins";

  const hasMore = currentPage < lastPage;

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <Serach />
        <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-3">{title}</h1>
        <p className="text-lg text-gray-600">
          {loading && page === 1
            ? "Chargement des offres..."
            : `${total} offre${total !== 1 ? "s" : ""} trouvée${total !== 1 ? "s" : ""}`}
        </p>
      </div>

      {error && (
        <div className="text-center py-10 text-red-600">
          <p>
            Une erreur est survenue :{" "}
            {error.message || "Veuillez réessayer plus tard"}
          </p>
        </div>
      )}

      {loading && page === 1 ? (
        <UniversalSpinner size="lg" className="py-20" />
      ) : produits.length > 0 ? (
        <>
          {/* Grille des cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
            {produits.map((p, index) => (
              <Card
                key={`${p.id ?? p.produit_id}-${index}`}
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
                exclusivite_image={p.exclusivite_image}
                offre_flash={p.offre_flash}
                date_debut={p.date_debut}
                date_fin={p.date_fin}
              />
            ))}
          </div>

          {/* Bouton Charger plus */}
          <LoadMoreButton
            hasMore={hasMore}
            loading={loading}
            onLoadMore={handleLoadMore}
          />
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-6">
            Aucun soin ne correspond à votre recherche.
          </p>
          <p className="text-gray-500">
            Essayez d'autres mots-clés, une autre catégorie ou une autre
            localisation.
          </p>
        </div>
      )}
    </div>
  );
}
