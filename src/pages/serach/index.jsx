// src/pages/search/index.jsx
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { useSearchProduits } from "src/actions/serach";
import SearchPageView from "src/sections/serach/view/view-serach";
import { paths } from "src/router/paths";
import { useRouter } from "src/hooks";

export default function SearchPage() {
  const { catSlug, villeSlug } = useParams();
  const router = useRouter();

  const { data, loading } = useSearchProduits(catSlug, villeSlug);
  
  if (!catSlug && !villeSlug) {
    router.push(paths.main);
    return null;
  }

  // Construire les titres et descriptions dynamiques
  const pageTitle = villeSlug && catSlug 
    ? `${data?.categorie || catSlug} à ${data?.ville || villeSlug} - Spa & Prestige Collection`
    : villeSlug
    ? `Spas à ${data?.ville || villeSlug} - Spa & Prestige Collection`
    : `${data?.categorie || catSlug} - Spa & Prestige Collection`;

  const pageDescription = villeSlug && catSlug
    ? `Découvrez nos ${data?.categorie || catSlug} à ${data?.ville || villeSlug} (${data?.code_postal || ''}). ${data?.total || 0} établissements de prestige sélectionnés pour vous.`
    : villeSlug
    ? `Trouvez les meilleurs spas et établissements de bien-être à ${data?.ville || villeSlug}. ${data?.total || 0} lieux d'exception à explorer.`
    : `Découvrez nos ${data?.categorie || catSlug} - établissements de prestige pour votre bien-être. ${data?.total || 0} options disponibles.`;

  const pageUrl = `https://spa-prestige-collection.com/search/${catSlug}/${villeSlug}`;
  const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

  // Schema pour Search Results Page
  const searchResultsSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": pageTitle,
    "url": pageUrl,
    "description": pageDescription,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Résultats - ${data?.categorie || catSlug}`,
      "numberOfItems": data?.total || 0,
      "itemListElement": (data?.results || []).slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name || "Établissement",
        "description": item.description || "Établissement de prestige",
        "image": item.image || imageUrl,
        "url": `https://spa-prestige-collection.com/etablissements/${item.id || item.slug}`
      }))
    }
  };

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://spa-prestige-collection.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Établissements",
        "item": "https://spa-prestige-collection.com/etablissements"
      },
      ...(catSlug ? [{
        "@type": "ListItem",
        "position": 3,
        "name": data?.categorie || catSlug,
        "item": `https://spa-prestige-collection.com/search/${catSlug}`
      }] : []),
      ...(villeSlug ? [{
        "@type": "ListItem",
        "position": catSlug ? 4 : 3,
        "name": data?.ville || villeSlug,
        "item": pageUrl
      }] : [])
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`spa ${villeSlug || ''}, ${catSlug || ''}, bien-être, prestige, massage, relaxation, établissements`} />
        
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        <script type="application/ld+json">
          {JSON.stringify(searchResultsSchema)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      </Helmet>

      <SearchPageView
        produits={data?.results || []}
        categorie={data?.categorie}
        ville={data?.ville}
        codePostal={data?.code_postal}
        loading={loading}
        total={data?.total || 0}
      />
    </>
  );
}