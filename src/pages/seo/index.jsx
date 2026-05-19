import { useLocation } from "react-router-dom";
import { useGetList } from "src/actions/seo";
import PageSeoSList from "src/sections/pages-seo/page-seo-list-view";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import { breadcrumbSchema } from "../../lib/schema";

export default function Page() {
  const location = useLocation();
  const { pageseo, pageseoLoading } = useGetList();

  const pageTitle = "Secteurs d'Activités Spa";
  const pageDescription =
    "Découvrez tous les secteurs d'activités du monde du spa : instituts de beauté, hôtels spa, thalassothérapie, centres bien-être. Spa & Prestige Collection.";

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Zones d'activités", path: "/zones-dactivites" },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `https://spa-prestige-collection.com${location.pathname}`,
    publisher: {
      "@type": "Organization",
      name: "Spa & Prestige Collection",
      url: "https://spa-prestige-collection.com",
    },
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={location.pathname}
        image="https://spa-prestige-collection.com/assets/og-secteurs.jpg"
        keywords="secteurs activités spa, institut beauté, thalassothérapie, hôtel spa, bien-être, hammam, sauna, jacuzzi"
      />

      <JsonLd data={[collectionSchema, breadcrumbSchema(breadcrumbItems)]} />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <PageSeoSList pageseo={pageseo} pageseoLoading={pageseoLoading} />
    </>
  );
}
