import { useParams, useLocation } from "react-router-dom";
import ProductDetailsView from "../../sections/product-details/product-details-view";
import { useGetProduct } from "src/actions/products";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import { productSchema, breadcrumbSchema } from "../../lib/schema";
import { usePrerenderReady } from "../../hooks/use-prerender-ready";

export default function Page() {
  const { slug } = useParams();
  const location = useLocation();
  const { product, avis, productLoading, like, etablissement } =
    useGetProduct(slug);

  usePrerenderReady(!productLoading && !!product);

  const nom = product?.nom || product?.name || "Produit";
  const pageTitle = product?.meta_title || nom;
  const pageDescription =
    product?.meta_description ||
    (product?.description
      ? String(product.description).replace(/<[^>]+>/g, "").slice(0, 160)
      : "Découvrez ce produit exclusif Spa & Prestige Collection.");

  const imageUrl = product?.image_thumbnail || product?.image
    ? (product.image_thumbnail || product.image).startsWith("http")
      ? product.image_thumbnail || product.image
      : `https://admin.spa-prestige-collection.com/storage/${product.image_thumbnail || product.image}`
    : null;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    ...(etablissement?.slug || etablissement?.id
      ? [
          {
            label: etablissement.nom || "Établissement",
            path: `/spa/${etablissement.slug || etablissement.id}`,
          },
        ]
      : []),
    { label: nom, path: location.pathname },
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={location.pathname}
        image={imageUrl}
        type="product"
      />

      <JsonLd
        data={[
          productSchema(product, etablissement),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <ProductDetailsView
        product={product}
        avis={avis}
        loading={productLoading}
        like={like}
      />
    </>
  );
}
