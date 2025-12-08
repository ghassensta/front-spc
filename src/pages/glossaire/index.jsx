import GlossairePageView from "src/sections/glossaire/view/glossaire-page-view";
import { Helmet } from 'react-helmet'
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const pageTitle = "Glossaire - Spa & Prestige Collection";
  const pageDescription = "Découvrez notre glossaire complet des termes spa et bien-être. Aromathérapie, Ayurveda, Balnéothérapie, Cryothérapie et plus. Définitions détaillées.";
  const pageUrl = "https://spa-prestige-collection.com/glossaire";
  const imageUrl = theImage;

  // Glossary Terms pour Schema
  const glossaryTerms = [
    { term: "Aromathérapie", definition: "Utilisation des huiles essentielles à des fins thérapeutiques." },
    { term: "Ayurveda", definition: "Médecine traditionnelle indienne axée sur l'équilibre du corps et de l'esprit." },
    { term: "Balnéothérapie", definition: "Utilisation de bains pour des bienfaits thérapeutiques." },
    { term: "Body Wrap", definition: "Enveloppement corporel pour nourrir et hydrater la peau." },
    { term: "Cryothérapie", definition: "Technique de traitement par le froid." },
    { term: "Chromo-thérapie", definition: "Utilisation des couleurs pour rétablir l'équilibre énergétique." }
  ];

  const schemaData = {
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
    "mainEntity": {
      "@type": "DefinedTerm",
      "name": "Glossaire Spa & Bien-être"
    }
  };

  // Breadcrumb Schema
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
        "name": "Glossaire",
        "item": pageUrl
      }
    ]
  };

  // FAQPage Schema avec tous les termes du glossaire
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": glossaryTerms.map((item) => ({
      "@type": "Question",
      "name": `Qu'est-ce que ${item.term}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.definition
      }
    }))
  };

  // Collection Page Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Spa & Prestige Collection",
      "url": "https://spa-prestige-collection.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Termes Spa et Bien-être",
      "numberOfItems": glossaryTerms.length,
      "itemListElement": glossaryTerms.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.term,
        "description": item.definition,
        "url": `${pageUrl}#${item.term.toLowerCase().replace(/\s+/g, '-')}`
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="glossaire spa, aromathérapie, ayurveda, balnéothérapie, cryothérapie, chromothérapie, termes bien-être, définitions spa, lexique wellness" />
        
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
          {JSON.stringify(schemaData)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
        
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <GlossairePageView />
    </>
  );
}