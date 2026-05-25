import SolutionsPageView from "src/sections/solutions/solutions-page-view";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
  faqSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02.jpg";

const FAQS = [
  {
    question: "Qu'est-ce que Spa & Prestige Collection propose pour les CSE?",
    reponse:
      "Nous offrons des solutions complètes : commandes groupées, cartes cadeaux personnalisées, accès 24h/24 en ligne, et tarifs préférentiels pour les collaborateurs.",
  },
  {
    question: "Pouvez-vous personnaliser les cartes cadeaux?",
    reponse:
      "Oui, nous proposons des cartes cadeaux personnalisables en version physique ou digitale pour toutes les occasions (Noël, départ en retraite, etc.).",
  },
  {
    question: "Quels avantages pour les collaborateurs?",
    reponse:
      "Accès privilégié à des soins bien-être, tarifs préférentiels, remises exclusives, et une large gamme d'établissements partenaires en France et Europe.",
  },
  {
    question: "Dans quels pays proposez-vous vos services?",
    reponse:
      "Nos services sont disponibles en France, Belgique, Suisse et autres pays avec un large réseau d'établissements de prestige.",
  },
];

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Solutions CSE & Collectivités - Spa & Prestige Collection";
  const pageDescription =
    "Offrez à vos salariés des expériences bien-être d'exception. Commandes groupées, cartes cadeaux personnalisées et tarifs préférentiels pour vos CSE et collectivités.";
  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Solutions CSE & Collectivités", path: location.pathname },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Spa & Prestige Collection - Solutions CSE",
    description: pageDescription,
    url: canonicalUrl,
    image: imageUrl,
    areaServed: ["FR", "BE", "CH"],
    serviceType: ["Corporate Benefits", "Gift Cards", "Wellness Services"],
    priceRange: "€€",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "contact@spa-prestige-collection.com",
      telephone: "+33182350126",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Commandes Groupées",
        description: "Cartes cadeaux en version physique ou digitale avec remises exclusives",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Vente en Ligne",
        description: "Accès 24h/24 avec tarifs préférentiels et code unique pour vos collaborateurs",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="CSE, collectivités, cartes cadeaux, bien-être collaborateurs, avantages salariés, commandes groupées, spa prestige" />
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
          localBusinessSchema,
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

      <SolutionsPageView />
    </>
  );
}
