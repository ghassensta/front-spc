import { useParams } from "react-router-dom";
import SpaDetailsView from "../../sections/spa-details/spa-details-view";
import { useGetEtablissement } from "src/actions/etablissements";
import { Helmet } from "react-helmet"; // <- Import Helmet

// ----------------------------------------------------------------------

export default function Page() {
  const { id } = useParams();

  const {
    etablissement,
    types,
    simlairesEtablissment,
    avis,
    marquesPartenaires,
    loading,
    error,
  } = useGetEtablissement(id);

  if (error) {
    return <div>Établissement non trouvé ou erreur de chargement.</div>;
  }

  if (!etablissement && !loading) {
    return <div>Établissement non trouvé.</div>;
  }

  // Fallbacks SEO si les champs sont null
  const pageTitle =
    etablissement?.meta_title || etablissement?.nom || "Etablissement";
  const pageDescription =
    etablissement?.meta_description ||
    (etablissement?.description
      ? etablissement.description.substring(0, 160)
      : "Découvrez cet établissement et ses services.");
  const pageKeywords =
    etablissement?.meta_keywords ||
    "spa, bien-être, massage, sauna, jacuzzi, soins";

  const canonicalUrl = `${window.location.origin}/etablissements/${
    etablissement?.slug || id
  }`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Spa & Prestige Collection" />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        {}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {}
        <link rel="canonical" href={canonicalUrl} />
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
