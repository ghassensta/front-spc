import { Helmet } from "react-helmet-async";

const BASE = "https://spa-prestige-collection.com";

export default function SeoHead({
  title,
  description,
  canonical,
  image,
  type = "website",
  noindex = false,
  keywords,
  locale = "fr_FR",
  children,
}) {
  const fullTitle = title
    ? `${title} | Spa & Prestige Collection`
    : "Spa & Prestige Collection — Réseau de Spas Premium";

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${BASE}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : null;

  const safeDescription =
    description ||
    "Découvrez Spa & Prestige Collection, le réseau premium des plus beaux spas, thermes et instituts de bien-être en France et en Europe.";

  return (
    <Helmet htmlAttributes={{ lang: "fr" }}>
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Spa & Prestige Collection" />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex,nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Spa & Prestige Collection" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {children}
    </Helmet>
  );
}
