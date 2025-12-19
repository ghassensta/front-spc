import React from "react";
import { Helmet } from "react-helmet"; 
import CollectionPrestigePage from "src/sections/collection-prestige/views/collection-prestige-page";
import theImage from "src/assets/images/SPC-Catalogue-1975x1318-1.jpg";

const pageTitle = "Collection Prestige 2025 - Guide des Plus Beaux Spas de France";
const pageDescription =
  "Découvrez Collection Prestige, le guide annuel haut de gamme édité par Spa & Prestige Collection. Une sélection exclusive des meilleures adresses bien-être et spas d’exception en France. Édition limitée bientôt disponible.";
const pageUrl = "https://spa-prestige-collection.com/collection-prestige";
const imageUrl = theImage;

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="collection prestige, guide spa france, magazine bien-être, spas d'exception, catalogue spa prestige collection, guide spas 2025, isabelle charrier, sense of wellness"
        />
        <link rel="canonical" href={pageUrl} />

        {}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:locale" content="fr_FR" />

        {}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {}
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection - Isabelle Charrier" />
        <meta name="robots" content="index, follow" />

        {}
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
                "name": "Collection Prestige",
                "item": pageUrl
              }
            ]
          })}
        </script>

        {}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
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
            "author": {
              "@type": "Person",
              "name": "Isabelle Charrier"
            },
            "inLanguage": "fr-FR"
          })}
        </script>

        {}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Collection Prestige 2025",
            "description": "Guide annuel des plus beaux spas et adresses bien-être sélectionnés par Spa & Prestige Collection et Isabelle Charrier (Sense of Wellness).",
            "genre": "Bien-être, Spa, Luxe",
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection"
            },
            "creator": {
              "@type": "Person",
              "name": "Isabelle Charrier"
            },
            "datePublished": "2025-01-01",
            "inLanguage": "fr-FR",
            "image": imageUrl,
            "url": pageUrl
          })}
        </script>
      </Helmet>

      <CollectionPrestigePage />
    </>
  );
}
