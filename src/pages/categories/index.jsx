import { useParams, useLocation } from "react-router-dom";
import { useGetFiltersEtablissements } from "src/actions/etablissements";
import { useCategoryProducts } from "src/hooks/useCategoryProducts";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";
import { Helmet } from "react-helmet-async";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
} from "../../lib/schema";

export default function Page() {
  const { slug }   = useParams();
  const location   = useLocation();

  const categoryData = useCategoryProducts(slug || "");
  const { villes, types, services, formules, filtersLoading } = useGetFiltersEtablissements();

  const { category } = categoryData;

  const pageTitle = slug
    ? (category?.meta_title || `${category?.nom || "Catégorie"} - Nos SPAs`)
    : "Nos catégories de spas — Spa & Prestige Collection";
  const pageDescription = slug
    ? (category?.meta_description || `Découvrez les SPAs dans la catégorie ${category?.nom || ""}.`)
    : "Parcourez toutes les catégories d'établissements spa et bien-être : hôtels spa, thermes, instituts, day spa, et plus.";
  const pageKeywords = slug
    ? (category?.meta_keywords || `${category?.nom || ""}, SPA, bien-être`)
    : "catégories spa, hôtel spa, thermes, institut beauté, day spa, bien-être";

  const canonical = `${window.location.origin}${location.pathname}`;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Catégories", path: "/categories" },
    ...(slug ? [{ label: category?.nom || slug, path: location.pathname }] : []),
  ];

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description"  content={pageDescription} />
        <meta name="keywords"     content={pageKeywords} />
        <meta name="robots"       content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type"  content="website" />
        <meta property="og:url"   content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical"     href={canonical} />
      </Helmet>

      <JsonLd
        data={[
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            type: "CollectionPage",
          }),
          breadcrumbSchema(breadcrumbItems),
          organizationSchema(),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <CategoriesPageView
        {...categoryData}
        slug_categorie={slug}
        description={category?.description}
        nomcat={category?.nom}
        villes={villes}
        types={types}
        services={services}
        formules={formules}
        filterLoading={filtersLoading}
      />
    </>
  );
}
