import { Helmet } from "react-helmet-async";

const BASE = "https://spa-prestige-collection.com";
const DEFAULT_IMAGE = `${BASE}/spa-prestige-logo.png`;
const DEFAULT_TITLE = "Spa & Prestige Collection — Réseau de Spas Premium";
const DEFAULT_DESC =
  "Découvrez Spa & Prestige Collection, le réseau premium des plus beaux spas, thermes et instituts de bien-être en France et en Europe.";

export default function SeoHead({
  title,
  description,
  canonical,
  image,
  type = "website",
  noindex = false,
  keywords,
  locale = "fr_FR",
}) {
  const fullTitle = title
    ? `${title} | Spa & Prestige Collection`
    : DEFAULT_TITLE;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${BASE}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : BASE;

  const safeDescription = description || DEFAULT_DESC;
  const safeImage = image || DEFAULT_IMAGE;
  const robots = noindex
    ? "noindex,nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={keywords || ""} />
      <meta name="author" content="Spa & Prestige Collection" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={safeImage} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Spa & Prestige Collection" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={safeImage} />
    </Helmet>
  );
}
