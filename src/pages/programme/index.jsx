import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import ProgrammePageView from "src/sections/programme/programme-page-view";
import theImage from "src/assets/images/SPC-coeur-1975x1318-01.jpg";

export default function Page() {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`; // URL dynamique

  const pageTitle = "Programme de Parrainage - Spa & Prestige Collection";
  const pageDescription =
    "Gagnez 5€ en bon d'achat en parrainant vos amis ! Programme de parrainage simple et généreux pour partager vos adresses bien-être préférées.";
  const imageUrl = theImage;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Spa & Prestige Collection",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`, // logo dynamique
      },
    },
    mainEntity: {
      "@type": "ReferralProgram",
      name: "Spa & Prestige Collection - Programme de Parrainage",
      description:
        "Parrainez vos amis et recevez 5€ en bon d'achat à chaque première commande validée",
      organizationName: "Spa & Prestige Collection",
      referralReward: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: "5",
        description: "Bon d'achat de 5€ pour chaque ami parrainé",
      },
      friendReward: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: "5",
        description: "5€ offerts sur la première commande du filleul",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: window.location.origin, // dynamique
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Programme de Parrainage",
        item: currentUrl, // dynamique
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="programme parrainage, parrainage spa, bon d'achat, referral program, partager lien, gagnez 5€, filleul"
        />
        <link rel="canonical" href={currentUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:locale" content="fr_FR" />

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
      </Helmet>

      <ProgrammePageView />
    </>
  );
}
