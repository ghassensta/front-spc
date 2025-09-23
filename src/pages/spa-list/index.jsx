import {
    useGetAllEtablissements,
  useGetEtablissements,
  useGetFiltersEtablissements,
} from "src/actions/etablissements";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";

export default function Page() {
  const { etablissements } = useGetAllEtablissements();

  console.log(etablissements)

  const { villes, types, services } = useGetFiltersEtablissements();

  return (
    <>
      <CategoriesPageView
        cardsByCategory={etablissements}
        villes={villes}
        types={types}
        services={services}
      />
    </>
  );
}
