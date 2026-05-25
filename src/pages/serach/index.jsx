// src/pages/search/index.jsx
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSearchProduits } from "src/actions/serach";
import SearchPageView from "src/sections/serach/view/view-serach";
import { useRouter } from "src/hooks";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  breadcrumbSchema,
  organizationSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function SearchPage() {
  const { catSlug, villeSlug } = useParams();
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  const router = useRouter();

  const { data, loading } = useSearchProduits(catSlug, villeSlug);

  if (!catSlug && !villeSlug) {
    router.push("/");
    return null;
  }

  const categorieName =
    typeof data?.categorie === "string"
      ? data.categorie
      : data?.categorie?.name || data?.categorie?.nom;
  const villeName =
    typeof data?.ville === "string"
      ? data.ville
      : data?.ville?.name || data?.ville?.nom;

  const pageTitle = villeSlug && catSlug
    ? `${categorieName || catSlug} à ${villeName || villeSlug} - Spa & Prestige Collection`
    : villeSlug
    ? `Spas à ${villeName || villeSlug} - Spa & Prestige Collection`
    : `${categorieName || catSlug} - Spa & Prestige Collection`;

  const pageDescription = villeSlug && catSlug
    ? `Découvrez nos ${categorieName || catSlug} à ${villeName || villeSlug} (${data?.code_postal || ""}). ${data?.total || 0} établissements de prestige sélectionnés pour vous.`
    : villeSlug
    ? `Trouvez les meilleurs spas et établissements de bien-être à ${villeName || villeSlug}. ${data?.total || 0} lieux d'exception à explorer.`
    : `Découvrez nos ${categorieName || catSlug} - établissements de prestige pour votre bien-être. ${data?.total || 0} options disponibles.`;

  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Établissements", path: "/etablissements" },
    ...(catSlug
      ? [{ label: categorieName || catSlug, path: `/search/${catSlug}` }]
      : []),
    ...(villeSlug
      ? [{ label: villeName || villeSlug, path: location.pathname }]
      : []),
  ];

  const searchResultsSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: pageTitle,
    url: currentUrl,
    description: pageDescription,
    mainEntity: {
      "@type": "ItemList",
      name: `Résultats - ${categorieName || catSlug}`,
      numberOfItems: data?.total || 0,
      itemListElement: (data?.results || []).slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name || "Établissement",
        description: item.description || "Établissement de prestige",
        image: item.image || imageUrl,
        url: `${window.location.origin}/etablissements/${item.id || item.slug}`,
      })),
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`spa ${villeSlug || ""}, ${catSlug || ""}, bien-être, prestige, massage, relaxation, établissements`}
        />

        <link rel="canonical" href={currentUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      </Helmet>

      <JsonLd
        data={[
          searchResultsSchema,
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

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
