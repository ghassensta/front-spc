import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSpaByCategory } from "src/actions/categories";
import { useGetFiltersEtablissements } from "src/actions/etablissements";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";
import { Helmet } from "react-helmet";

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();

  if (!slug) {
    toast.info("Choisir une catégorie!");
    router.push(paths.main);
    return null;
  }

  const { spaList, catLoading, category } = useGetSpaByCategory(slug);
  const { villes, types, services, filtersLoading } =
    useGetFiltersEtablissements();

  // Fallbacks si meta fields sont null
  const pageTitle =
    category?.meta_title || `${category?.nom || "Catégorie"} - Nos SPAs`;
  const pageDescription =
    category?.meta_description ||
    `Découvrez les SPAs disponibles dans la catégorie ${
      category?.nom || "inconnue"
    }.`;
  const pageKeywords =
    category?.meta_keywords || `${category?.nom || ""}, SPA, bien-être`;

  const canonicalUrl = `${window.location.origin}/categories/${
    category?.slug || slug
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


      <CategoriesPageView
        nomcat={category.nom}
        slug_categorie={category.slug}
        description={category.meta_description}
        cardsByCategory={spaList}
        villes={villes}
        types={types}
        services={services}
        filterLoading={filtersLoading}
        loading={catLoading}
      />
    </>
  );
}
