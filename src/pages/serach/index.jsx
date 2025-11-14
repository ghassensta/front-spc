// src/pages/search/index.jsx
import { useParams } from "react-router-dom";
import { useSearchProduits } from "src/actions/serach";
import SearchPageView from "src/sections/serach/view/view-serach";
import { paths } from "src/router/paths";
import { useRouter } from "src/hooks";

export default function SearchPage() {
  const { catSlug, villeSlug } = useParams();
  const router = useRouter();

  const { data, loading } = useSearchProduits(catSlug, villeSlug);
    console.log('data',data);
  if (!catSlug && !villeSlug) {
    router.push(paths.main);
    return null;
  }

  return (
    <SearchPageView
      produits={data?.results || []}
      categorie={data?.categorie}
      ville={data?.ville}
      codePostal={data?.code_postal}
      loading={loading}
      total={data?.total || 0}
    />
  );
}