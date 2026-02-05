import {
  useGetAllEtablissements,
  useGetEtablissements,
  useGetFiltersEtablissements,
} from "src/actions/etablissements";
import CategoriesPageView from "src/sections/spa-liste/views";
import { Helmet } from "react-helmet";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";
import { useLocation } from "react-router-dom";

export default function Page() {
  const { etablissements, etablissementLoading } = useGetAllEtablissements();
  const { villes, types, services, filtersLoading } =
    useGetFiltersEtablissements();

  const location = useLocation();

  // ✅ Canonical SEO dynamique (sans query params)
  const pageUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle =
    "Nos Établissements - Spa & Prestige Collection";
  const pageDescription =
    "Découvrez notre sélection exclusive d'établissements spa de prestige. Spas urbains, thermes, hôtels de charme et refuges insolites à travers la France et l'Europe.";
  const imageUrl = theImage;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Spa & Prestige Collection",
      logo: {
        "@type": "ImageObject",
        url: "https://spa-prestige-collection.com/logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Établissements Spa",
      itemListElement:
        etablissements?.slice(0, 10).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.nom || "Établissement",
          description:
            item.description || "Établissement de prestige",
          url: `${pageUrl}/${item.slug || item.id}`,
        })) || [],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: window.location.origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nos Établissements",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment filtrer les établissements spa ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Utilisez nos filtres par ville, type d'établissement et services proposés pour trouver le spa idéal.",
        },
      },
      {
        "@type": "Question",
        name: "Quels types de spas proposez-vous ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            types?.join(", ") ||
            "Spas urbains, thermes, hôtels de charme",
        },
      },
      {
        "@type": "Question",
        name: "Dans quelles villes sont localisés les établissements ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            villes?.slice(0, 5).join(", ") ||
            "France et Europe",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />
      </Helmet>

      <CategoriesPageView
        cardsByCategory={etablissements}
        villes={villes}
        types={types}
        services={services}
        loading={etablissementLoading}
        filterLoading={filtersLoading}
      />
    </>
  );
}
