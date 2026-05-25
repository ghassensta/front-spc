import React from "react";
import { Helmet } from "react-helmet-async";
import ConditionsPageView from "src/sections/conditions/conditions-page-view";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  organizationSchema,
  breadcrumbSchema,
  webPageSchema,
} from "src/lib/schema";

const pageTitle = "Conditions Générales de Vente - Spa & Prestige Collection";
const pageDescription =
  "Consultez les CGV de Spa & Prestige Collection : modalités de commande, paiement, livraison, rétractation, échange et prolongation des cartes et coffrets cadeau valables dans plus de 500 spas en France.";
const pageUrl = "https://spa-prestige-collection.com/conditions-generales-de-vente";
const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/05/spa-cgv-og.jpg";

const breadcrumbItems = [
  { label: "Accueil", path: "/" },
  { label: "Conditions Générales de Vente", path: "/conditions-generales-de-vente" },
];

export default function Page() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="conditions générales de vente, cgv spa prestige collection, carte cadeau spa, coffret cadeau bien-être, rétractation, échange prolongation, droit consommation"
        />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <JsonLd
        data={[
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: "/conditions-generales-de-vente",
            image: imageUrl,
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <ConditionsPageView />
    </>
  );
}
