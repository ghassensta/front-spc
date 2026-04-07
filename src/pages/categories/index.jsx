import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetFiltersEtablissements } from "src/actions/etablissements";
import { useCategoryProducts } from "src/hooks/useCategoryProducts";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";
import { Helmet } from "react-helmet";

export default function Page() {
  const { slug }   = useParams();
  const location   = useLocation();
  const router     = useRouter();

  if (!slug) {
    toast.info("Choisir une catégorie!");
    router.push(paths.main);
    return null;
  }

  // Toute la logique pagination/filtres dans le hook
  const categoryData = useCategoryProducts(slug);
  const { villes, types, services, formules, filtersLoading } = useGetFiltersEtablissements();

  const { category } = categoryData;
  const pageTitle       = category?.meta_title       || `${category?.nom || "Catégorie"} - Nos SPAs`;
  const pageDescription = category?.meta_description || `Découvrez les SPAs dans la catégorie ${category?.nom || ""}.`;
  const pageKeywords    = category?.meta_keywords    || `${category?.nom || ""}, SPA, bien-être`;

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
        <meta property="og:url"   content={`${window.location.origin}${location.pathname}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical"     href={`${window.location.origin}${location.pathname}`} />
      </Helmet>

      <CategoriesPageView
        {...categoryData}   // spaList, pagination, priceRange, catLoading, isFiltering, filters, page, handlers
        slug_categorie={slug}
        villes={villes}
        types={types}
        services={services}
        formules={formules}
        filterLoading={filtersLoading}
      />
    </>
  );
}