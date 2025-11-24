import SolutionsPageView from "src/sections/solutions/solutions-page-view";
import { Helmet } from 'react-helmet'

export default function Page() {
  const pageTitle = "Solutions CSE & Collectivités - Spa & Prestige Collection";
  const pageDescription = "Offrez à vos salariés des expériences bien-être d'exception. Commandes groupées, cartes cadeaux personnalisées et tarifs préférentiels pour vos CSE et collectivités.";
  const pageUrl = "https://spa-prestige-collection.com/solutions-cse";
  const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Spa & Prestige Collection - Solutions CSE",
    "description": pageDescription,
    "url": pageUrl,
    "image": imageUrl,
    "areaServed": ["FR", "BE", "CH"],
    "serviceType": ["Corporate Benefits", "Gift Cards", "Wellness Services"],
    "priceRange": "€€",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "contact@spa-prestige-collection.com",
      "telephone": "+33XXXXXXXXX"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Commandes Groupées",
        "description": "Cartes cadeaux en version physique ou digitale avec remises exclusives",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Vente en Ligne",
        "description": "Accès 24h/24 avec tarifs préférentiels et code unique pour vos collaborateurs",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

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
        "name": "Solutions CSE & Collectivités",
        "item": pageUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que Spa & Prestige Collection propose pour les CSE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous offrons des solutions complètes : commandes groupées, cartes cadeaux personnalisées, accès 24h/24 en ligne, et tarifs préférentiels pour les collaborateurs."
        }
      },
      {
        "@type": "Question",
        "name": "Pouvez-vous personnaliser les cartes cadeaux?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons des cartes cadeaux personnalisables en version physique ou digitale pour toutes les occasions (Noël, départ en retraite, etc.)."
        }
      },
      {
        "@type": "Question",
        "name": "Quels avantages pour les collaborateurs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accès privilégié à des soins bien-être, tarifs préférentiels, remises exclusives, et une large gamme d'établissements partenaires en France et Europe."
        }
      },
      {
        "@type": "Question",
        "name": "Dans quels pays proposez-vous vos services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos services sont disponibles en France, Belgique, Suisse et autres pays avec un large réseau d'établissements de prestige."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="CSE, collectivités, cartes cadeaux, bien-être collaborateurs, avantages salariés, commandes groupées, spa prestige" />
        
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
        
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <SolutionsPageView />
    </>
  );
}