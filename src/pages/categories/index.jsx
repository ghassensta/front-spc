import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSpaByCategory } from "src/actions/categories";
import { useGetFiltersEtablissements } from "src/actions/etablissements";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";

export default function Page() {
  const { slug } = useParams();
  const router = useRouter()

  if(!slug) {
    // toast.info('Choisir une catégorie!')
    router.push(paths.main)
  }

  const { spaList, catLoading } = useGetSpaByCategory(slug);

  const { villes, types, services, filtersLoading } = useGetFiltersEtablissements();

  return (
    <>
      <CategoriesPageView
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
