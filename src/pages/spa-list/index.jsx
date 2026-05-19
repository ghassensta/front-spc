import { useGetFiltersEtablissements } from "src/actions/etablissements";
import CategoriesPageView from "src/sections/spa-liste/views";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import { breadcrumbSchema, faqSchema } from "../../lib/schema";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const { villes, types, services, filtersLoading } =
    useGetFiltersEtablissements();

  const pageTitle = "Nos Établissements Spa";
  const pageDescription =
    "Découvrez notre sélection exclusive d'établissements spa de prestige. Spas urbains, thermes, hôtels de charme et refuges insolites à travers la France et l'Europe.";

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Nos établissements", path: "/liste-des-spas" },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: "https://spa-prestige-collection.com/liste-des-spas",
    image: theImage,
    publisher: {
      "@type": "Organization",
      name: "Spa & Prestige Collection",
      logo: {
        "@type": "ImageObject",
        url: "https://spa-prestige-collection.com/spa-prestige-logo.png",
      },
    },
  };

  const faqs = [
    {
      question: "Comment filtrer les établissements spa ?",
      reponse:
        "Utilisez nos filtres par ville, type d'établissement et services proposés pour trouver le spa idéal.",
    },
    {
      question: "Quels types de spas proposez-vous ?",
      reponse:
        (Array.isArray(types) && types.map((t) => t.name).join(", ")) ||
        "Spas urbains, thermes, hôtels de charme",
    },
    {
      question: "Dans quelles villes sont localisés les établissements ?",
      reponse:
        (Array.isArray(villes) &&
          villes.slice(0, 5).map((v) => v.name).join(", ")) ||
        "France et Europe",
    },
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical="/liste-des-spas"
        image={theImage}
        keywords="spa, liste spa, établissement spa, thermes, hôtel spa, bien-être France Europe"
      />

      <JsonLd
        data={[
          collectionSchema,
          breadcrumbSchema(breadcrumbItems),
          faqSchema(faqs),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <CategoriesPageView
        villes={villes}
        types={types}
        services={services}
        filterLoading={filtersLoading}
      />
    </>
  );
}
