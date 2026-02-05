import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import CollectionPrestigePage from "src/sections/collection-prestige/views/collection-prestige-page";
import theImage from "src/assets/images/SPC-Catalogue-1975x1318-1.jpg";
import { CONFIG } from "src/config-global";

const pageTitle = "Collection Prestige- Guide des Plus Beaux Spas de France";
const pageDescription =
  "Découvrez Collection Prestige, le guide annuel haut de gamme édité par Spa & Prestige Collection. Une sélection exclusive des meilleures adresses bien-être et spas d’exception en France. Édition limitée bientôt disponible.";
const pageKeywords =
  "collection prestige, guide spa france, magazine bien-être, spas d'exception, catalogue spa prestige collection, guide spas,isabelle charrier, sense of wellness";
const imageUrl = theImage;

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${CONFIG.frontUrl}${location.pathname}`;

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection - Isabelle Charrier" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="fr-FR" />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": CONFIG.frontUrl },
              { "@type": "ListItem", "position": 2, "name": "Collection Prestige", "item": canonicalUrl }
            ]
          })}
        </script>

        {/* JSON-LD WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "image": imageUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection",
              "logo": { "@type": "ImageObject", "url": `${CONFIG.frontUrl}/logo.png` }
            },
            "author": { "@type": "Person", "name": "Isabelle Charrier" },
            "inLanguage": "fr-FR"
          })}
        </script>

        {/* JSON-LD CreativeWork */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Collection Prestige ",
            "description": "Guide annuel des plus beaux spas et adresses bien-être sélectionnés par Spa & Prestige Collection et Isabelle Charrier (Sense of Wellness).",
            "genre": "Bien-être, Spa, Luxe",
            "publisher": { "@type": "Organization", "name": "Spa & Prestige Collection" },
            "creator": { "@type": "Person", "name": "Isabelle Charrier" },
            "inLanguage": "fr-FR",
            "image": imageUrl,
            "url": canonicalUrl
          })}
        </script>
      </Helmet>

      <CollectionPrestigePage />
    </>
  );
}
