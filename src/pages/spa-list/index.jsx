import {
    useGetAllEtablissements,
  useGetEtablissements,
  useGetFiltersEtablissements,
} from "src/actions/etablissements";
import CategoriesPageView from "src/sections/categories/view/categories-page-view";

export default function Page() {
  const { etablissements, etablissementLoading } = useGetAllEtablissements();

  const { villes, types, services, filtersLoading } = useGetFiltersEtablissements();

  return (
    <>
      <CategoriesPageView
        cardsByCategory={etablissements}
        villes={villes}
        types={types}
        services={services}
        loading={etablissementLoading}
        filterLoading={filtersLoading}
      />
    </>
  );
}
