import { useParams } from "react-router-dom";
import { useGetProduct } from "src/actions/products";
import ProductDetailsView from "src/sections/product-details/product-details-view2";
import { Helmet } from "react-helmet";

export default function Page() {
  const { slug } = useParams();
  const { product,avis,servicesEquipements, productLoading, like, etablissement } =
    useGetProduct(slug);

  const defaultTitle = "Détails du Produit";
  const defaultDescription = "Découvrez les détails de ce produit exclusif.";
  const defaultKeywords = "produit, spa, bien-être";

  const canonicalUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>{product?.meta_title || defaultTitle}</title>
        <meta
          name="description"
          content={product?.meta_description || defaultDescription}
        />
        <meta
          name="keywords"
          content={product?.meta_keywords || defaultKeywords}
        />
        <meta name="author" content="Spa & Prestige Collection" />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content={product?.meta_title || defaultTitle}
        />
        <meta
          property="og:description"
          content={product?.meta_description || defaultDescription}
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        {product?.image_thumbnail && (
          <meta property="og:image" content={product.image_thumbnail} />
        )}
      </Helmet>
      <ProductDetailsView
        product={product}
        avis={avis}
        like={like}
        etablissement={etablissement}
        loading={productLoading}
        servicesEquipements={servicesEquipements}
      />
    </>
  );
}