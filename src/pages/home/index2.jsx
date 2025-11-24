import HomeViewPage from "../../sections/home2/home-view-page2";
import { Helmet } from 'react-helmet'

export default function Page() {
  const pageTitle = "Spa & Prestige Collection - Établissements de Bien-être d'Exception";
  const pageDescription = "Découvrez Spa & Prestige Collection, une sélection exclusive d'établissements spa, thermes et centres de bien-être. Cartes cadeaux, réductions CSE et programme de fidélité.";
  const pageUrl = "https://spa-prestige-collection.com";
  const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

  // Schema pour la page d'accueil
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Spa & Prestige Collection",
    "description": pageDescription,
    "url": pageUrl,
    "image": imageUrl,
    "logo": {
      "@type": "ImageObject",
      "url": "https://spa-prestige-collection.com/logo.png"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Spa & Prestige Collection",
      "logo": {
        "@type": "ImageObject",
        "url": "https://spa-prestige-collection.com/logo.png"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "12 rue des Marguerites",
        "postalCode": "77230",
        "addressLocality": "Moussy le Neuf",
        "addressCountry": "FR"
      },
      "sameAs": [
        "https://www.facebook.com/spaPrestigeCollection",
        "https://www.instagram.com/spaPrestigeCollection",
        "https://www.linkedin.com/company/spa-prestige-collection"
      ]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://spa-prestige-collection.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Organization Schema pour la credibilité
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Spa & Prestige Collection",
    "description": pageDescription,
    "url": pageUrl,
    "logo": "https://spa-prestige-collection.com/logo.png",
    "image": imageUrl,
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "contact@spa-prestige-collection.com",
      "areaServed": ["FR", "BE", "CH", "DE", "IT", "ES"]
    },
    "sameAs": [
      "https://www.facebook.com/spaPrestigeCollection",
      "https://www.instagram.com/spaPrestigeCollection",
      "https://www.linkedin.com/company/spa-prestige-collection"
    ],
    "knowsAbout": [
      "Spa",
      "Bien-être",
      "Relaxation",
      "Thermes",
      "Massages",
      "Wellness",
      "Cartes cadeaux"
    ]
  };

  // LocalBusiness Schema pour chaque établissement
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Spa & Prestige Collection",
    "image": imageUrl,
    "description": pageDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12 rue des Marguerites",
      "postalCode": "77230",
      "addressLocality": "Moussy le Neuf",
      "addressCountry": "FR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Breadcrumb pour SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": pageUrl
      }
    ]
  };

  // FAQPage Schema pour les questions communes
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que Spa & Prestige Collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spa & Prestige Collection est une sélection exclusive d'établissements d'exception (spas urbains, thermes, hôtels de charme) soigneusement sélectionnés pour leur confort, ambiance singulière et service sur-mesure."
        }
      },
      {
        "@type": "Question",
        "name": "Comment bénéficier de réductions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez profiter de réductions en vous inscrivant à notre programme de fidélité, en commandant une carte cadeau, ou en rejoignant notre communauté privée pour accéder à des offres exclusives."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous des cartes cadeaux?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons des cartes cadeaux élégantes disponibles en version physique ou numérique, en plusieurs montants, parfaites pour tous les occasions."
        }
      },
      {
        "@type": "Question",
        "name": "Comment devenir membre?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inscrivez-vous à notre plateforme pour accéder à notre communauté privée et bénéficier de privilèges exclusifs, expériences personnalisées et tarifs préférentiels."
        }
      },
      {
        "@type": "Question",
        "name": "Quels établissements proposez-vous?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous proposons une sélection de plus de 100 établissements d'exception en France et en Europe : spas urbains, thermes, hôtels de charme, centres de beauté et refuges insolites."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le programme de parrainage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Parrainez vos amis et recevez 5€ en bon d'achat. Chaque ami parrainé reçoit 5€ offerts sur sa première commande. C'est simple, généreux et pensé pour les amateurs de bien-être."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Titres et descriptions */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="spa, prestige, bien-être, relaxation, thermes, cartes cadeaux, CSE, programme fidélité, massage, wellness, établissements spa" />

        {/* Canonical */}
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

        {/* Données structurées JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        {/* Meta tags additionnels */}
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#B6B499" />
        
        {/* Preconnect pour les CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.example.com" />
      </Helmet>

      <HomeViewPage />
    </>
  );
}