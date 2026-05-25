import { useParams, useLocation, Navigate } from "react-router-dom";
import { useGetSeoPageDetail } from "src/actions/seo";
import PageSeoShow from "src/sections/pages-seo/page-seo-show-view";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import { breadcrumbSchema } from "../../lib/schema";
import { usePrerenderReady } from "../../hooks/use-prerender-ready";
import NotFound from "../not-found/NotFound";

export default function Page() {
  const { slug } = useParams();
  const location = useLocation();

  if (!slug) return <Navigate to="/" replace />;

  const { page, loading } = useGetSeoPageDetail(slug);

  usePrerenderReady(!loading && !!page);

  if (!loading && !page) {
    return <NotFound />;
  }

  const titreHero = page?.titre_hero || "Catégorie";
  const pageTitle = page?.meta_title || `${titreHero} - Nos SPAs`;
  const pageDescription =
    page?.meta_description ||
    `Découvrez nos SPAs disponibles dans la catégorie ${titreHero}.`;
  const pageKeywords =
    page?.meta_keywords || `${titreHero}, SPA, bien-être, prestige`;

  const imageUrl = page?.image
    ? page.image.startsWith("http")
      ? page.image
      : `https://admin.spa-prestige-collection.com/storage/${page.image}`
    : null;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: titreHero, path: location.pathname },
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={location.pathname}
        image={imageUrl}
        keywords={pageKeywords}
      />

      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <PageSeoShow pageseo={page} pageseoLoading={loading} />
    </>
  );
}
