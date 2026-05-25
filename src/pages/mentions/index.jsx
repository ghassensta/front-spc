import React from "react";
import { Helmet } from "react-helmet-async";
import MentionsPageView from "src/sections/mentions/mentions-page-view";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  organizationSchema,
  breadcrumbSchema,
  webPageSchema,
  faqSchema,
} from "src/lib/schema";

const pageTitle = "Mentions Légales - Spa & Prestige Collection";
const pageDescription =
  "Consultez les mentions légales de Spa & Prestige Collection. Informations de l'éditeur, données personnelles, conditions d'utilisation et politique RGPD.";
const pageUrl = "https://spa-prestige-collection.com/mentions-legales";
const ogImage =
  "https://spa-prestige-collection.com/wp-content/uploads/2025/05/spa-mentions-og.jpg";

const breadcrumbItems = [
  { label: "Accueil", path: "/" },
  { label: "Mentions Légales", path: "/mentions-legales" },
];

const FAQS = [
  {
    question: "Qui édite le site Spa & Prestige Collection?",
    reponse:
      "Le site est édité par Prestige Global Solutions, SARL au capital social de 1.000 Euros, immatriculée au RCS de Meaux sous le numéro 930 239 397, basée à 12 rue des Marguerites 77230 Moussy le Neuf.",
  },
  {
    question: "Où sont hébergées mes données?",
    reponse:
      "Le site est hébergé par IONOS SARL, 7 place de la gare BP 70109, 57201 Sarreguemines Cedex, immatriculée au RCS de Meaux sous le numéro B 431 303 775.",
  },
  {
    question: "Quels sont mes droits concernant mes données personnelles?",
    reponse:
      "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez de droits d'accès, de rectification, de suppression, de portabilité des données, d'opposition et de limitation du traitement. Pour exercer ces droits, contactez contact@spa-prestige-collection.com",
  },
  {
    question: "Peut-on refuser les cookies?",
    reponse:
      "Oui, vous pouvez refuser les cookies via les paramètres de votre navigateur web. Le site utilise des cookies pour améliorer votre expérience de navigation.",
  },
  {
    question: "Qui est responsable du contenu du site?",
    reponse:
      "Le Directeur de la publication est Monsieur Romain Dupont, Président de Prestige Global Solutions.",
  },
  {
    question: "Quelle loi s'applique en cas de litige?",
    reponse:
      "Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront compétents.",
  },
];

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="mentions légales, conditions utilisation, RGPD, données personnelles, politique confidentialité"
        />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <JsonLd
        data={[
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: "/mentions-legales",
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(FAQS),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <MentionsPageView />
    </>
  );
}
