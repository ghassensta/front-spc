import { useLocation } from "react-router-dom";
import MarquePartenairePage from "src/sections/marque-partenaire/marque-partenaire-page";
import { Helmet } from 'react-helmet';
import theImage from "src/assets/images/SPC-equipe-ce-1975x1318-1-768x513.jpg";

export default function Page() {
  const location = useLocation();

  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Marques Partenaires - Spa & Prestige Collection";
  const pageDescription =
    "Rejoignez le cercle des fournisseurs et marques partenaires de Spa & Prestige Collection. Gagnez en visibilité et développez vos collaborations stratégiques.";
  const pageKeywords =
    "marques partenaires, partenariat prestige, fournisseurs spa, collaboration bien-être, visibilité marque, réseau prestige";
  const imageUrl = theImage;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
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
      "@type": "BusinessOpportunity",
      "name": "Partenariat Marques - Spa & Prestige Collection",
      "description": "Opportunité de partenariat pour les marques et fournisseurs spécialisés dans le bien-être",
      "benefits": [
        "Visibilité ciblée et optimale",
        "Accompagnement digital et direct",
        "Accès aux événements stratégiques",
        "Soutien marketing exclusif",
        "Partenariats stratégiques",
        "Présence dans Collection Prestige"
      ],
      "organizer": {
        "@type": "Organization",
        "name": "Spa & Prestige Collection"
      },
      "areaServed": ["FR", "BE", "CH"]
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
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Marques Partenaires",
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi rejoindre le programme de marques partenaires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rejoindre Spa & Prestige Collection offre à votre marque plusieurs avantages : visibilité ciblée via notre newsletter et réseaux sociaux, accompagnement digital, présence lors d'événements stratégiques majeurs, soutien marketing exclusif et partenariats stratégiques pour accélérer votre développement."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de marques peuvent devenir partenaires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous accueillons les fournisseurs et marques spécialisés dans le bien-être, le luxe et les services connexes : produits spa, cosmétiques, équipements, services wellness, et autres domaines complémentaires."
        }
      },
      {
        "@type": "Question",
        "name": "Comment candidater en tant que marque partenaire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remplissez notre formulaire de candidature en ligne avec les informations de votre marque, vos coordonnées et un message détaillant votre intérêt pour rejoindre notre réseau. Nous vous recontacterons rapidement pour discuter des opportunités."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les critères de sélection pour les marques?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous cherchons des marques alignées avec nos valeurs de qualité, d'élégance, de durabilité et d'engagement. Une expertise reconnue dans le bien-être et une vision partagée de l'excellence sont essentielles."
        }
      },
      {
        "@type": "Question",
        "name": "Bénéficierons-nous d'un accompagnement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons un accompagnement complet incluant des visio-conférences régulières, des réunions régionales, du soutien marketing, et une mise en avant optimale sur nos canaux de communication."
        }
      },
      {
        "@type": "Question",
        "name": "Comment ma marque apparaîtra dans Collection Prestige?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En tant que marque partenaire, votre marque bénéficiera d'une visibilité dans notre guide exclusif Collection Prestige, de publications personnalisées sur nos réseaux sociaux et d'une mise en avant sur notre site."
        }
      },
      {
        "@type": "Question",
        "name": "Dans quels pays opérez-vous pour les partenariats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spa & Prestige Collection opère en France, Belgique, Suisse et dans d'autres pays européens. Nous recherchons des partenaires de qualité dans ces régions."
        }
      }
    ]
  };

  const howItWorksSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment devenir une marque partenaire de Spa & Prestige Collection",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Remplir le formulaire",
        "text": "Complétez notre formulaire de candidature avec les informations de votre marque, coordonnées et message d'intérêt."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Examen de candidature",
        "text": "Notre équipe examine votre profil par rapport à nos critères de qualité et d'alignement avec nos valeurs."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Entretien et validation",
        "text": "Nous vous recontacterons pour discuter de votre marque et valider le partenariat."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Accompagnement débute",
        "text": "Une fois approuvée, votre marque bénéficie de visibilité, d'événements, et d'un soutien marketing exclusif."
      }
    ]
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Canonical dynamique */}
        <link rel="canonical" href={canonicalUrl} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howItWorksSchema)}</script>
      </Helmet>

      <MarquePartenairePage />
    </>
  );
}
