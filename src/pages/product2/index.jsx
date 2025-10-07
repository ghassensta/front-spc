import { useParams } from "react-router-dom";
import { useGetProduct } from "src/actions/products";
import ProductDetailsView from "src/sections/product-details/product-details-view2";

export default function Page() {
  const { slug } = useParams();
  const { product, avis, productLoading, like, etablissement } = useGetProduct(slug);
  return (
    <>
    <ProductDetailsView product={product} avis={avis} like={like} etablissement={etablissement} loading={productLoading}/>
    </>
  );
}
