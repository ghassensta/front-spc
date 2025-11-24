import React from 'react'
import { Helmet } from 'react-helmet'
import MentionsPageView from 'src/sections/mentions/mentions-page-view'

export default function Page() {
  const pageTitle = "Mentions Légales - Spa & Prestige Collection";
  const pageDescription = "Consultez les mentions légales de Spa & Prestige Collection. Informations de l'éditeur, données personnelles, conditions d'utilisation et politique RGPD.";
  const pageUrl = "https://spa-prestige-collection.com/mentions-legales";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Spa & Prestige Collection",
      "legalName": "Prestige Global Solutions",
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
      "email": "contact@spa-prestige-collection.com",
      "sameAs": [
        "https://www.facebook.com/spaPrestigeCollection",
        "https://www.instagram.com/spaPrestigeCollection",
        "https://www.linkedin.com/company/spa-prestige-collection"
      ]
    }
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
        "name": "Mentions Légales",
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
        "name": "Qui édite le site Spa & Prestige Collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le site est édité par Prestige Global Solutions, SARL au capital social de 1.000 Euros, immatriculée au RCS de Meaux sous le numéro 930 239 397, basée à 12 rue des Marguerites 77230 Moussy le Neuf."
        }
      },
      {
        "@type": "Question",
        "name": "Où sont hébergées mes données?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le site est hébergé par IONOS SARL, 7 place de la gare BP 70109, 57201 Sarreguemines Cedex, immatriculée au RCS de Meaux sous le numéro B 431 303 775."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont mes droits concernant mes données personnelles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez de droits d'accès, de rectification, de suppression, de portabilité des données, d'opposition et de limitation du traitement. Pour exercer ces droits, contactez contact@spa-prestige-collection.com"
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on refuser les cookies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, vous pouvez refuser les cookies via les paramètres de votre navigateur web. Le site utilise des cookies pour améliorer votre expérience de navigation."
        }
      },
      {
        "@type": "Question",
        "name": "Qui est responsable du contenu du site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le Directeur de la publication est Monsieur Romain Dupont, Président de Prestige Global Solutions."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle loi s'applique en cas de litige?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront compétents."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="mentions légales, conditions utilisation, RGPD, données personnelles, politique confidentialité" />
        
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
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
        <meta name="robots" content="index, follow, noarchive" />
      </Helmet>

      <MentionsPageView />
    </>
  );
}