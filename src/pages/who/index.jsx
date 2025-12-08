import WhoPageView from "src/sections/who/view/who-page-view";
import { Helmet } from 'react-helmet'
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const pageTitle = "Qui Sommes-Nous - Spa & Prestige Collection";
  const pageDescription = "Découvrez Spa & Prestige Collection, une sélection d'établissements d'exception offrant des expériences de bien-être authentiques et raffinées.";
  const pageUrl = "https://spa-prestige-collection.com/qui-sommes-nous";
  const imageUrl = theImage;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Spa & Prestige Collection",
    "description": pageDescription,
    "url": "https://spa-prestige-collection.com",
    "logo": "https://spa-prestige-collection.com/logo.png",
    "image": imageUrl,
    "sameAs": [
      "https://www.facebook.com/spaPrestigeCollection",
      "https://www.instagram.com/spaPrestigeCollection",
      "https://www.linkedin.com/company/spa-prestige-collection"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "contact@spa-prestige-collection.com"
    },
    "knowsAbout": ["Spa", "Bien-être", "Relaxation", "Thermes", "Massages"],
    "areaServed": ["FR", "IT", "ES", "DE"],
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Spa & Prestige Collection"
    }
  };

  return (
    <>
      <Helmet>
        {/* Titres et descriptions */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="spa prestige, bien-être, spa collection, relaxation, thermes, expérience spa, établissement spa" />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph - Réseaux Sociaux */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Données structurées JSON-LD - Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>

        {/* Breadcrumbs Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
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
                "name": "Qui Sommes-Nous",
                "item": pageUrl
              }
            ]
          })}
        </script>

        {/* Autres meta tags utiles */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <WhoPageView />
    </>
  );
}