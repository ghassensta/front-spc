import { useParams, useLocation } from "react-router-dom";
import SpaDetailsView from "../../sections/spa-details/spa-details-view";
import { useGetEtablissement } from "src/actions/etablissements";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import NotFound from "../not-found/NotFound";
import { localBusinessSchema, breadcrumbSchema } from "../../lib/schema";
import { usePrerenderReady } from "../../hooks/use-prerender-ready";

// ----------------------------------------------------------------------

export default function Page() {
  const { id } = useParams();
  const location = useLocation();

  const {
    etablissement,
    types,
    simlairesEtablissment,
    avis,
    marquesPartenaires,
    loading,
    error,
  } = useGetEtablissement(id);

  // Pour le prérendu : attendre l'arrivée RÉELLE de l'établissement.
  // Si l'API échoue (race condition Puppeteer), le fallback 12s dans
  // main.jsx fera quand même fire l'event après que Helmet ait écrit
  // au moins les meta par défaut.
  usePrerenderReady(!loading && (!!etablissement || !!error));

  if (error || (!etablissement && !loading)) {
    return <NotFound />;
  }

  // SEO fallbacks
  const nom = etablissement?.nom || "Établissement";
  const pageTitle = etablissement?.meta_title || nom;
  const pageDescription =
    etablissement?.meta_description ||
    (etablissement?.description
      ? String(etablissement.description).replace(/<[^>]+>/g, "").slice(0, 160)
      : `Découvrez ${nom} et ses services de spa, massage, sauna, jacuzzi et bien-être.`);
  const pageKeywords =
    etablissement?.meta_keywords ||
    `${nom}, spa, bien-être, massage, sauna, jacuzzi, soins, relaxation`;

  const imageUrl = etablissement?.images?.[0]
    ? `https://admin.spa-prestige-collection.com/storage/${etablissement.images[0]}`
    : "https://spa-prestige-collection.com/spa-prestige-logo.png";

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Nos établissements", path: "/liste-des-spas" },
    { label: nom, path: location.pathname },
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={location.pathname}
        image={imageUrl}
        keywords={pageKeywords}
        type="business.business"
      />

      <JsonLd
        data={[
          localBusinessSchema(etablissement),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <SpaDetailsView
        spaData={etablissement}
        types={types}
        simlairesEtablissment={simlairesEtablissment}
        avis={avis}
        marquesPartenaires={marquesPartenaires}
        loading={loading}
      />
    </>
  );
}
