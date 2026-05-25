import { useLocation } from "react-router-dom";
import ReferentielViewPage from "src/sections/referentiel/referentiel-view-page";
import { Helmet } from "react-helmet-async";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
  faqSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPC-Catalogue-1975x1318-1.jpg";

const FAQS = [
  {
    question: "Quels sont les critères pour rejoindre Spa & Prestige Collection?",
    reponse:
      "Les établissements doivent respecter des critères élevés incluant : atmosphère de relaxation, confort des installations, service client réactif, démarche durable, innovation, qualité des soins, propreté exemplaire, respect de l'intimité, épanouissement du personnel et équipe compétente.",
  },
  {
    question: "Quels documents faut-il fournir pour postuler?",
    reponse:
      "Les établissements doivent fournir une documentation détaillée démontrant leur conformité aux critères du référentiel, incluant certifications, photos et descriptions de leurs services.",
  },
  {
    question: "Comment devenir partenaire de Spa & Prestige Collection?",
    reponse:
      "Vous pouvez soumettre votre candidature en utilisant notre formulaire 'Devenir partenaire' ou nous contacter directement pour discuter de votre profil et de votre conformité aux standards du réseau.",
  },
  {
    question: "Quelles sont les valeurs de Spa & Prestige Collection?",
    reponse:
      "Nos valeurs fondamentales sont la sincérité, l'élégance, la proximité, la durabilité et l'engagement envers l'excellence du bien-être.",
  },
];

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Référentiel de Candidature - Spa & Prestige Collection";
  const pageDescription =
    "Découvrez nos critères d'adhésion pour rejoindre le réseau Spa & Prestige Collection. Qualité, bien-être, authenticité et excellence requise.";
  const pageKeywords =
    "référentiel, critères adhésion, partenaire spa, bien-être prestige, standards établissements, réseau spa";
  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Référentiel de Candidature", path: location.pathname },
  ];

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

      <ReferentielViewPage />
    </>
  );
}
