import { useLocation } from "react-router-dom";
import DevenirPartnerView from "src/sections/devenir-partner/devenir-partner-view";
import { Helmet } from "react-helmet-async";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
  faqSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPC-equipe-ce-1975x1318-1-768x513.jpg";

const FAQS = [
  {
    question: "Pourquoi rejoindre Spa & Prestige Collection?",
    reponse:
      "En rejoignant notre réseau, vous bénéficiez de plusieurs avantages : augmentation de votre chiffre d'affaires, recrutement de clientèle qualifiée, maximisation du taux d'occupation, renforcement de votre visibilité en ligne, accompagnement personnalisé et opportunités de partenariats stratégiques.",
  },
  {
    question: "Quels types d'établissements peuvent rejoindre le réseau?",
    reponse:
      "Nous accueillons différents types d'établissements : hôtels, spas, centres de beauté, restaurants et autres établissements spécialisés dans le bien-être et la détente.",
  },
  {
    question: "Quels documents dois-je fournir pour candidater?",
    reponse:
      "Vous devez remplir notre formulaire de candidature en ligne et fournir des photos de votre établissement (formats JPEG, PNG ou PDF, maximum 5 Mo). Nous vous recontacterons ensuite pour discuter de votre profil.",
  },
  {
    question: "Quels sont les critères pour devenir partenaire?",
    reponse:
      "Les établissements doivent respecter des critères élevés incluant atmosphère de relaxation, confort des installations, service client réactif, démarche durable, qualité des soins, propreté exemplaire, respect de l'intimité et équipe compétente.",
  },
  {
    question: "Comment puis-je candidater?",
    reponse:
      "Remplissez le formulaire de candidature sur cette page avec les informations de votre établissement, vos coordonnées et un message détaillant votre intérêt pour rejoindre notre réseau. Nous vous recontacterons dans les plus brefs délais.",
  },
  {
    question: "Dans quels pays opérez-vous?",
    reponse:
      "Spa & Prestige Collection opère en France, Belgique, Suisse et dans d'autres pays européens. Nous recherchons constamment de nouveaux partenaires de qualité dans ces régions.",
  },
];

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Devenir Partenaire - Spa & Prestige Collection";
  const pageDescription =
    "Rejoignez le réseau Spa & Prestige Collection. Boostez votre chiffre d'affaires, augmentez votre visibilité et bénéficiez d'un accompagnement personnalisé.";
  const pageKeywords =
    "devenir partenaire spa, partenariat prestige, réseau spa, établissement bien-être, candidature spa, franchise bien-être";
  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Devenir Partenaire", path: location.pathname },
  ];

  const businessOpportunitySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    image: imageUrl,
    mainEntity: {
      "@type": "BusinessOpportunity",
      name: "Partenariat Spa & Prestige Collection",
      description:
        "Opportunité de partenariat pour établissements spécialisés dans le bien-être",
      benefits: [
        "Augmentation du chiffre d'affaires",
        "Recrutement de clientèle qualifiée",
        "Maximisation du taux d'occupation",
        "Renforcement de la visibilité",
        "Accompagnement personnalisé",
        "Synergies et partenariats stratégiques",
      ],
      organizer: {
        "@type": "Organization",
        name: "Spa & Prestige Collection",
      },
    },
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <JsonLd
        data={[
          businessOpportunitySchema,
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            image: imageUrl,
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(FAQS),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <DevenirPartnerView />
    </>
  );
}
