import React from "react";
import { Helmet } from "react-helmet-async";
import ContactPageView from "src/sections/contact/contact-page-view";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  organizationSchema,
  breadcrumbSchema,
  webPageSchema,
} from "src/lib/schema";

const pageTitle = "Contact Spa Prestige Collection | +33 (0)1 82 35 01 26";
const pageDescription =
  "Contactez l'équipe Spa & Prestige Collection par téléphone au +33 (0)1 82 35 01 26 ou via notre formulaire. Réponse rapide pour toutes vos questions sur les cartes cadeau, spas partenaires et soins bien-être.";
const pageUrl = "https://spa-prestige-collection.com/contact";
const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/05/spa-contact-og.jpg";

const breadcrumbItems = [
  { label: "Accueil", path: "/" },
  { label: "Contact", path: "/contact" },
];

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="contact spa prestige collection, téléphone spa, carte cadeau spa, renseignement bien-être, spas france"
        />
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

        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <JsonLd
        data={[
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: "/contact",
            image: imageUrl,
            type: "ContactPage",
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <ContactPageView />
    </>
  );
}
