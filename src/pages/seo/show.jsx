import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSeoPageDetail } from "src/actions/seo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import PageSeoShow from "src/sections/pages-seo/page-seo-show-view";
import { Helmet } from "react-helmet";

export default function Page() {
  const { slug } = useParams();
  const location = useLocation();
  const router = useRouter();

  // Redirection si aucun slug
  if (!slug) {
    toast.info("Choisir une catégorie !");
    router.push(paths.main);
    return null;
  }

  // Hook SWR pour récupérer les détails de la page SEO
  const { page, loading } = useGetSeoPageDetail(slug);

  // Gestion du loading
  if (loading) {
    return <p>Chargement de la page...</p>;
  }

  // SEO dynamique
  const pageTitle =
    page?.meta_title || `${page?.titre_hero || "Catégorie"} - Nos SPAs`;
  const pageDescription =
    page?.meta_description ||
    `Découvrez nos SPAs disponibles dans la catégorie ${page?.titre_hero || "inconnue"}.`;
  const pageKeywords =
    page?.meta_keywords || `${page?.titre_hero || ""}, SPA, bien-être`;

  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Composant d'affichage du contenu */}
      <PageSeoShow pageseo={page} pageseoLoading={loading} />
    </>
  );
}