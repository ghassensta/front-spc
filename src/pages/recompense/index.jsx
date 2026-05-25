import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import RecompensePageView from "src/sections/recompense/view/recompense-page-view";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
  faqSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPC-images-1975x1318-Programme-Parrainage-01-1024x683.jpg";

const FAQS = [
  {
    question: "Comment fonctionne le programme de fidélité?",
    reponse:
      "Gagnez 1 point pour chaque euro dépensé. Accumulez les points et échangez-les contre des bons d'achat de 10€ ou 25€.",
  },
  {
    question: "Quels sont les avantages du programme Spa & Prestige Collection Rewards?",
    reponse:
      "Accumulez des points rapidement, bénéficiez de réductions exclusives, profitez d'une expérience simplifiée et obtenez des bons d'achat pour vos prochaines commandes.",
  },
  {
    question: "Comment échanger mes points?",
    reponse:
      "Une fois que vous avez accumulé les points nécessaires, vous pouvez les échanger contre des bons de réduction de 10€ ou 25€ à utiliser sur votre prochaine commande.",
  },
  {
    question: "Quand le programme de fidélité sera-t-il disponible?",
    reponse:
      "Inscrivez-vous à notre newsletter pour être informé du lancement officiel du programme de fidélité.",
  },
  {
    question: "Comment s'inscrire à la newsletter?",
    reponse:
      "Saisissez votre adresse email dans le formulaire d'inscription et cochez la case pour accepter l'inscription à la newsletter Spa & Prestige Collection.",
  },
];

const HOW_TO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment utiliser le programme de fidélité Spa & Prestige Collection",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Commandez",
      text: "Assurez-vous d'être connecté à votre compte, puis découvrez vos soins préférés et passez commande via notre site web.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Gagnez",
      text: "Choisissez votre mode de paiement en ligne et cumulez 1 point pour chaque 1€ dépensé.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Échangez",
      text: "Une fois que vous avez accumulé les points nécessaires, échangez-les contre des bons de réduction de 10€ ou 25€ pour votre prochaine commande.",
    },
  ],
};

export default function Page() {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Programme de Fidélité - Spa & Prestige Collection";
  const pageDescription =
    "Rejoignez notre programme de fidélité et gagnez des points à chaque commande. Accumulez 1 point pour 1€ dépensé et échangez contre des bons d'achat.";
  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Programme de Fidélité", path: location.pathname },
  ];

  const loyaltyProgramSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    image: imageUrl,
    mainEntity: {
      "@type": "LoyaltyProgram",
      name: "Spa & Prestige Collection Rewards",
      description:
        "Programme de fidélité permettant de gagner des points à chaque commande",
      organizationName: "Spa & Prestige Collection",
      programName: "Spa & Prestige Collection Rewards",
      pointsPerCurrency: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: "1",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          unitCode: "PTS",
          value: "1",
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="programme fidélité, points de fidélité, bons d'achat, récompenses, spa prestige, accumulation points, réductions exclusives"
        />

        <link rel="canonical" href={currentUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <JsonLd
        data={[
          loyaltyProgramSchema,
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            image: imageUrl,
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(FAQS),
          HOW_TO_SCHEMA,
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <RecompensePageView />
    </>
  );
}
