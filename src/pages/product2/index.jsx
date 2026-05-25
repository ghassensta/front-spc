import { useParams, useLocation } from "react-router-dom";
import { useGetProduct } from "src/actions/products";
import ProductDetailsView from "src/sections/product-details/product-details-view2";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import Breadcrumb from "../../components/seo/Breadcrumb";
import NotFound from "../not-found/NotFound";
import { productSchema, breadcrumbSchema } from "../../lib/schema";
import { usePrerenderReady } from "../../hooks/use-prerender-ready";

export default function Page() {
  const { slug } = useParams();
  const location = useLocation();
  const {
    product,
    avis,
    servicesEquipements,
    productLoading,
    like,
    etablissement,
  } = useGetProduct(slug);

  // Pour le prérendu : attendre que le produit soit RÉELLEMENT chargé
  // (et pas juste que loading=false avec product=null).
  usePrerenderReady(!productLoading && !!product);

  if (!productLoading && !product) {
    return <NotFound />;
  }

  const nom = product?.nom || product?.name || "Produit";
  const pageTitle = product?.meta_title || nom;
  const pageDescription =
    product?.meta_description ||
    (product?.description
      ? String(product.description).replace(/<[^>]+>/g, "").slice(0, 160)
      : "Découvrez ce produit exclusif Spa & Prestige Collection.");
  const pageKeywords =
    product?.meta_keywords || `${nom}, spa, bien-être, soin, massage`;

  const rawImage = product?.image_thumbnail || product?.image;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `https://admin.spa-prestige-collection.com/storage/${rawImage}`
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
        keywords={pageKeywords}
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
        like={like}
        etablissement={etablissement}
        loading={productLoading}
        servicesEquipements={servicesEquipements}
      />
    </>
  );
}
