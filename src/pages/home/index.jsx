import { Helmet } from "react-helmet-async";
import HomeView from "../../sections/home/home-view";
import JsonLd from "../../components/seo/JsonLd";
import {
  websiteSchema,
  organizationSchema,
} from "../../lib/schema";

const BASE = "https://spa-prestige-collection.com";

export default function Page() {
  const pageTitle =
    "Spa & Prestige Collection — Réseau de Spas Premium en France et en Europe";
  const pageDescription =
    "Découvrez Spa & Prestige Collection, une sélection exclusive d'établissements spa, thermes et centres de bien-être. Cartes cadeaux, réductions CSE et programme de fidélité.";

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="spa, prestige, bien-être, thermes, cartes cadeaux, CSE, fidélité, massage, wellness"
        />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={`${BASE}/home2`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${BASE}/home2`} />
        <meta property="og:image" content={`${BASE}/spa-prestige-logo.png`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${BASE}/spa-prestige-logo.png`} />
      </Helmet>

      <JsonLd
        data={[websiteSchema(), organizationSchema()].filter(Boolean)}
      />

      <HomeView />
    </>
  );
}
