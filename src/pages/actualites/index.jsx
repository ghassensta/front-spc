import React from "react";
import { useGetNews } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
  itemListSchema,
} from "src/lib/schema";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const { actualites, categories, actualitesLoading } = useGetNews();
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Actualités - Spa & Prestige Collection";
  const pageDescription =
    "Retrouvez toutes nos actualités, conseils et nouveautés spa & bien-être sur Spa & Prestige Collection.";
  const imageUrl = actualites?.[0]?.image || theImage;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Actualités", path: location.pathname },
  ];

  const articleList = (actualites || []).slice(0, 10).map((item, index) => ({
    name: item.title || `Article ${index + 1}`,
    url: `${location.pathname}#${item.slug || index}`,
  }));

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="actualités spa, blog spa, bien-être, spa prestige, conseils spa, nouveautés spa" />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <JsonLd
        data={[
          webPageSchema({
            title: pageTitle,
            description: pageDescription,
            url: location.pathname,
            image: imageUrl,
            type: "CollectionPage",
          }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
          itemListSchema(articleList, { name: "Actualités Spa & Bien-être" }),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <BlogPage
        articles={actualites}
        categories={categories}
        loading={actualitesLoading}
      />
    </>
  );
}
