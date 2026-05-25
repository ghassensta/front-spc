import { useLocation } from "react-router-dom";
import PageCagnotte from "src/sections/cagnotte/view/page-cagnotte";
import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
} from "src/lib/schema";

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${CONFIG.frontUrl}${location.pathname}`;

  const pageTitle = "Cagnotte - Offrez la liberté de choisir avec nos cartes cadeaux";
  const pageDescription =
    "Découvrez notre sélection de cartes cadeaux. Offrez la liberté de choisir avec nos cartes cadeaux disponibles en plusieurs montants.";
  const pageKeywords = "carte cadeau, cadeau, bon cadeau, gift card";
  const imageUrl = `${CONFIG.frontUrl}/og-carte-cadeau.jpg`;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Cagnotte", path: location.pathname },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Carte Cadeau",
    description: pageDescription,
    image: imageUrl,
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      lowPrice: "10",
      highPrice: "500",
    },
    brand: {
      "@type": "Brand",
      name: "Spa & Prestige Collection",
    },
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="fr-FR" />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <JsonLd
        data={[
          productSchema,
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            image: imageUrl,
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <PageCagnotte />
    </>
  );
}
