import { useParams } from "react-router-dom";
import ProductDetailsView from "../../sections/product-details/product-details-view";
import { useGetProduct } from "src/actions/products";

export default function Page() {
  const { slug } = useParams();
  const { product, avis, productLoading, like } = useGetProduct(slug);

  return (
    <>
     <ProductDetailsView product={product} avis={avis} loading={productLoading} like={like}/>
    </>
  );
}
