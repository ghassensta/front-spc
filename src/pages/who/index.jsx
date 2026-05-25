import { useLocation } from "react-router-dom";
import WhoPageView from "src/sections/who/view/who-page-view";
import { Helmet } from "react-helmet-async";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  organizationSchema,
  breadcrumbSchema,
  webPageSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Qui Sommes-Nous - Spa & Prestige Collection";
  const pageDescription =
    "Découvrez Spa & Prestige Collection, une sélection d'établissements d'exception offrant des expériences de bien-être authentiques et raffinées.";
  const pageKeywords =
    "spa prestige, bien-être, spa collection, relaxation, thermes, expérience spa, établissement spa";
  const imageUrl = theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Qui Sommes-Nous", path: location.pathname },
  ];

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="fr-FR" />

        <link rel="canonical" href={canonicalUrl} />

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
      </Helmet>

      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            image: imageUrl,
            type: "AboutPage",
          }),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <WhoPageView />
    </>
  );
}
