import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import GlossairePageView from "src/sections/glossaire/view/glossaire-page-view";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  organizationSchema,
  breadcrumbSchema,
  webPageSchema,
  faqSchema,
  itemListSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

const glossaryTerms = [
  { term: "Aromathérapie", definition: "Utilisation des huiles essentielles à des fins thérapeutiques." },
  { term: "Ayurveda", definition: "Médecine traditionnelle indienne axée sur l'équilibre du corps et de l'esprit." },
  { term: "Balnéothérapie", definition: "Utilisation de bains pour des bienfaits thérapeutiques." },
  { term: "Body Wrap", definition: "Enveloppement corporel pour nourrir et hydrater la peau." },
  { term: "Cryothérapie", definition: "Technique de traitement par le froid." },
  { term: "Chromo-thérapie", definition: "Utilisation des couleurs pour rétablir l'équilibre énergétique." },
];

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

export default function Page() {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Glossaire - Spa & Prestige Collection";
  const pageDescription =
    "Découvrez notre glossaire complet des termes spa et bien-être. Aromathérapie, Ayurveda, Balnéothérapie, Cryothérapie et plus. Définitions détaillées.";
  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Glossaire", path: location.pathname },
  ];

  const faqList = glossaryTerms.map((t) => ({
    question: `Qu'est-ce que ${t.term}?`,
    reponse: t.definition,
  }));

  const termsList = glossaryTerms.map((t) => ({
    name: t.term,
    url: `${location.pathname}#${slugify(t.term)}`,
  }));

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="glossaire spa, aromathérapie, ayurveda, balnéothérapie, cryothérapie, chromothérapie, termes bien-être, définitions spa, lexique wellness" />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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
      </Helmet>

      <JsonLd
        data={[
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            image: imageUrl,
            type: "CollectionPage",
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(faqList),
          itemListSchema(termsList, { name: "Termes Spa et Bien-être" }),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <GlossairePageView />
    </>
  );
}
