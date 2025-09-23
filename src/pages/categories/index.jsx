import { useParams } from "react-router-dom";
import { useGetSpaByCategory } from "src/actions/categories";
import { useGetFiltersEtablissements } from "src/actions/etablissements";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";

export default function Page() {
  const { slug } = useParams();

  const { spaList } = useGetSpaByCategory(slug);

  console.log("Categorei", spaList);

  const { villes, types, services } = useGetFiltersEtablissements();

  return (
    <>
      <CategoriesPageView
        cardsByCategory={spaList}
        villes={villes}
        types={types}
        services={services}
      />
    </>
  );
}
