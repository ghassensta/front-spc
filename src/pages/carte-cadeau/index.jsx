import CarteCadeau from "src/sections/carte-cadeau/carte-cadeau";
import { Helmet } from 'react-helmet'

export default function Page() {
  const pageTitle = "Carte Cadeau - Offrez le Parfait Cadeau";
  const pageDescription = "Découvrez notre sélection de cartes cadeaux. Offrez la liberté de choisir avec nos cartes cadeaux disponibles en plusieurs montants.";
  const pageUrl = "https://example.com/carte-cadeau";
  const imageUrl = "https://example.com/og-carte-cadeau.jpg";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Carte Cadeau",
    "description": pageDescription,
    "image": imageUrl,
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "lowPrice": "10",
      "highPrice": "500"
    },
    "brand": {
      "@type": "Brand",
      "name": "Notre Marque"
    }
  };

  return (
    <>
      <Helmet>
        {/* Titres et descriptions */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="carte cadeau, cadeau, bon cadeau, gift card" />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph - Réseaux Sociaux */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Notre Site" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Données structurées JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>

        {/* Autres meta tags utiles */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Notre Marque" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <CarteCadeau />
    </>
  );
}