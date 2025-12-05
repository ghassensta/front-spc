import {
  useGetAllEtablissements,
  useGetEtablissements,
  useGetFiltersEtablissements,
} from "src/actions/etablissements";
import CategoriesPageView from "src/sections/spa-liste/views";
import { Helmet } from "react-helmet";

export default function Page() {
  const { etablissements, etablissementLoading } = useGetAllEtablissements();

  const { villes, types, services, filtersLoading } =
    useGetFiltersEtablissements();
    const pageTitle = "Nos Établissements - Spa & Prestige Collection";
  const pageDescription = "Découvrez notre sélection exclusive d'établissements spa de prestige. Spas urbains, thermes, hôtels de charme et refuges insolites à travers la France et l'Europe.";
  const pageUrl = "https://spa-prestige-collection.com/etablissements";
  const imageUrl = "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

  // Données structurées pour CollectionPage
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "image": imageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Spa & Prestige Collection",
      "logo": {
        "@type": "ImageObject",
        "url": "https://spa-prestige-collection.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Établissements Spa",
      "itemListElement": etablissements?.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name || "Établissement",
        "description": item.description || "Établissement de prestige",
        "url": `https://spa-prestige-collection.com/etablissements/${item.id || item.slug}`
      })) || []
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
        "name": "Nos Établissements",
        "item": pageUrl
      }
    ]
  };

  // FAQSchema pour les filtres communs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment filtrer les établissements spa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utilisez nos filtres par ville, type d'établissement et services proposés pour trouver le spa idéal."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de spas proposez-vous?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Nous proposons différents types d'établissements: ${types?.join(', ') || 'spas urbains, thermes, hôtels de charme'}`
        }
      },
      {
        "@type": "Question",
        "name": "Dans quelles villes sont localisés les établissements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Nos établissements partenaires sont présents dans les villes suivantes: ${villes?.slice(0, 5).join(', ') || 'France et Europe'}`
        }
      }
    ]
  };


  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="spa, établissements spa, thermes, spa urbain, hôtel spa, bien-être, prestige, massage, relaxation"
        />
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
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
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
