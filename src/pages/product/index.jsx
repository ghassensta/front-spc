import { useParams } from "react-router-dom";
import ProductDetailsView from "../../sections/product-details/product-details-view";
import { useGetProduct } from "src/actions/products";

export default function Page() {
  const { slug } = useParams();
  const { product, avis } = useGetProduct(slug);

  console.log(product)
  return (
    <>
     <ProductDetailsView product={product} avis={avis}/>
    </>
  );
}
