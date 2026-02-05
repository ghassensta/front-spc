import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import GlossairePageView from "src/sections/glossaire/view/glossaire-page-view";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Glossaire - Spa & Prestige Collection";
  const pageDescription =
    "Découvrez notre glossaire complet des termes spa et bien-être. Aromathérapie, Ayurveda, Balnéothérapie, Cryothérapie et plus. Définitions détaillées.";
  const imageUrl = theImage;

  const glossaryTerms = [
    { term: "Aromathérapie", definition: "Utilisation des huiles essentielles à des fins thérapeutiques." },
    { term: "Ayurveda", definition: "Médecine traditionnelle indienne axée sur l'équilibre du corps et de l'esprit." },
    { term: "Balnéothérapie", definition: "Utilisation de bains pour des bienfaits thérapeutiques." },
    { term: "Body Wrap", definition: "Enveloppement corporel pour nourrir et hydrater la peau." },
    { term: "Cryothérapie", definition: "Technique de traitement par le froid." },
    { term: "Chromo-thérapie", definition: "Utilisation des couleurs pour rétablir l'équilibre énergétique." }
  ];

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');

  return (
    <>
      <Helmet>
        {/* SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="glossaire spa, aromathérapie, ayurveda, balnéothérapie, cryothérapie, chromothérapie, termes bien-être, définitions spa, lexique wellness" />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {/* Twitter Card */}
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
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": window.location.origin },
              { "@type": "ListItem", "position": 2, "name": "Glossaire", "item": currentUrl }
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
            "url": currentUrl,
            "image": imageUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection",
              "logo": { "@type": "ImageObject", "url": `${window.location.origin}/logo.png` }
            },
            "mainEntity": { "@type": "DefinedTerm", "name": "Glossaire Spa & Bien-être" }
          })}
        </script>

        {/* JSON-LD FAQPage pour tous les termes */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": glossaryTerms.map((item) => ({
              "@type": "Question",
              "name": `Qu'est-ce que ${item.term}?`,
              "acceptedAnswer": { "@type": "Answer", "text": item.definition }
            }))
          })}
        </script>

        {/* JSON-LD CollectionPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": currentUrl,
            "isPartOf": { "@type": "WebSite", "name": "Spa & Prestige Collection", "url": window.location.origin },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Termes Spa et Bien-être",
              "numberOfItems": glossaryTerms.length,
              "itemListElement": glossaryTerms.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.term,
                "description": item.definition,
                "url": `${currentUrl}#${slugify(item.term)}`
              }))
            }
          })}
        </script>
      </Helmet>

      <GlossairePageView />
    </>
  );
}
