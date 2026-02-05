import { useParams, useLocation } from "react-router-dom";
import SpaDetailsView from "../../sections/spa-details/spa-details-view";
import { useGetEtablissement } from "src/actions/etablissements";
import { Helmet } from "react-helmet";

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

 if (error || (!etablissement && !loading)) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-lg shadow-md max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-semibold mb-2">
          Oups ! Établissement non trouvé
        </h1>
        <p className="text-gray-700 mb-4">
          L’établissement que vous cherchez n’existe pas ou n’est pas encore publié.
        </p>
        <a
          href="/"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded-md shadow hover:bg-red-700 transition"
        >
          Retour à l’accueil
        </a>
      </div>
    </div>
  );
}


  if (!etablissement && !loading) {
    return <div>Établissement non trouvé.</div>;
  }

  // SEO Fallbacks
  const pageTitle =
    etablissement?.meta_title || `${etablissement?.nom || "Etablissement"} - Spa & Prestige Collection`;

  const pageDescription =
    etablissement?.meta_description ||
    (etablissement?.description
      ? etablissement.description.substring(0, 160)
      : "Découvrez cet établissement et ses services de spa, massage, sauna, jacuzzi et bien-être.");

  const pageKeywords =
    etablissement?.meta_keywords ||
    "spa, bien-être, massage, sauna, jacuzzi, soins, relaxation, hôtel spa";

  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  // Image pour OG et Twitter
  const imageUrl = etablissement?.images?.[0]
    ? `${window.location.origin}/storage/${etablissement.images[0]}`
    : `${window.location.origin}/default-spa.jpg`;

  // JSON-LD Schema Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": etablissement?.nom || "Etablissement",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* JSON-LD Breadcrumb */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

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
