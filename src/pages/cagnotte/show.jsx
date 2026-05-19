import { useLocation } from "react-router-dom";
import ShowCagnotte from "src/sections/cagnotte/view/show-cagnotte";
import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";

export default function Page() {
  const location = useLocation();
  const canonicalUrl = `${CONFIG.frontUrl}${location.pathname}`;

  const pageTitle =
    "Cagnotte - Offrez la liberté de choisir avec nos cartes cadeaux";
  const pageDescription =
    "Découvrez notre sélection de cartes cadeaux. Offrez la liberté de choisir avec nos cartes cadeaux disponibles en plusieurs montants.";
  const imageUrl = `${CONFIG.frontUrl}/og-carte-cadeau.jpg`;

 

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
      </Helmet>

      <ShowCagnotte />
    </>
  );
}
