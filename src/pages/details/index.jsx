import { useParams, useLocation } from "react-router-dom";
import SpaDetailsView from "../../sections/spa-details/spa-details-view";
import { useGetEtablissement } from "src/actions/etablissements";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import { localBusinessSchema, breadcrumbSchema } from "../../lib/schema";

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
      <>
        <SeoHead
          title="Établissement non trouvé"
          description="L'établissement recherché est introuvable ou n'est plus disponible."
          canonical={location.pathname}
          noindex
        />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-semibold mb-2">
              Oups ! Établissement non trouvé
            </h1>
            <p className="text-gray-700 mb-4">
              L’établissement que vous cherchez n’existe pas ou n’est pas encore
              publié.
            </p>
            <a
              href="/liste-des-spas"
              className="inline-block bg-red-600 text-white px-5 py-2 rounded-md shadow hover:bg-red-700 transition"
            >
              Voir la liste des spas
            </a>
          </div>
        </div>
      </>
    );
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
