import DevenirPartnerView from "src/sections/devenir-partner/devenir-partner-view";
import { Helmet } from 'react-helmet'

export default function Page() {
  const pageTitle = "Devenir Partenaire - Spa & Prestige Collection";
  const pageDescription = "Rejoignez le réseau Spa & Prestige Collection. Boostez votre chiffre d'affaires, augmentez votre visibilité et bénéficiez d'un accompagnement personnalisé.";
  const pageUrl = "https://spa-prestige-collection.com/devenir-partenaire";
  const imageUrl = "src/assets/images/SPC-equipe-ce-1975x1318-1-768x513.jpg";

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
      "@type": "BuisinessOpportunity",
      "name": "Partenariat Spa & Prestige Collection",
      "description": "Opportunité de partenariat pour établissements spécialisés dans le bien-être",
      "benefits": [
        "Augmentation du chiffre d'affaires",
        "Recrutement de clientèle qualifiée",
        "Maximisation du taux d'occupation",
        "Renforcement de la visibilité",
        "Accompagnement personnalisé",
        "Synergies et partenariats stratégiques"
      ],
      "organizer": {
        "@type": "Organization",
        "name": "Spa & Prestige Collection"
      }
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
        "name": "Devenir Partenaire",
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
        "name": "Pourquoi rejoindre Spa & Prestige Collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En rejoignant notre réseau, vous bénéficiez de plusieurs avantages : augmentation de votre chiffre d'affaires, recrutement de clientèle qualifiée, maximisation de votre taux d'occupation, renforcement de votre visibilité en ligne, accompagnement personnalisé et opportunités de partenariats stratégiques."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types d'établissements peuvent rejoindre le réseau?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous accueillons différents types d'établissements : hôtels, spas, centres de beauté, restaurants et autres établissements spécialisés dans le bien-être et la détente."
        }
      },
      {
        "@type": "Question",
        "name": "Quels documents dois-je fournir pour candidater?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous devez remplir notre formulaire de candidature en ligne et fournir des photos de votre établissement (formats JPEG, PNG ou PDF, maximum 5 Mo). Nous vous recontacterons ensuite pour discuter de votre profil."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les critères pour devenir partenaire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les établissements doivent respecter des critères élevés incluant atmosphère de relaxation, confort des installations, service client réactif, démarche durable, qualité des soins, propreté exemplaire, respect de l'intimité et équipe compétente."
        }
      },
      {
        "@type": "Question",
        "name": "Comment puis-je candidater?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remplissez le formulaire de candidature sur cette page avec les informations de votre établissement, vos coordonnées et un message détaillant votre intérêt pour rejoindre notre réseau. Nous vous recontacterons dans les plus brefs délais."
        }
      },
      {
        "@type": "Question",
        "name": "Dans quels pays opérez-vous?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spa & Prestige Collection opère en France, Belgique, Suisse et dans d'autres pays européens. Nous recherchons constamment de nouveaux partenaires de qualité dans ces régions."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="devenir partenaire spa, partenariat prestige, réseau spa, établissement bien-être, candidature spa, franchise bien-être" />
        
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

      <DevenirPartnerView />
    </>
  );
}