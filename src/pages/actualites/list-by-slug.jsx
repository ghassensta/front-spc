import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetActualitezBySlug } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";
import { Helmet } from "react-helmet-async";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import {
  articleSchema,
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
} from "src/lib/schema";

export default function ActualitesByslug() {
  const { slug } = useParams();
  const location = useLocation();
  const { actualites, categories, actualitesLoading } = useGetActualitezBySlug(slug);

  const firstArticle = actualites && actualites.length > 0 ? actualites[0] : null;

  const pageTitle = firstArticle?.meta_title || "Actualités Spa & Prestige Collection";
  const pageDescription =
    firstArticle?.meta_description ||
    "Découvrez nos dernières actualités Spa & Prestige Collection, conseils bien-être, tendances lifestyle et plus encore.";
  const pageKeywords = firstArticle?.meta_keywords || "spa, bien-être, actualités";
  const pageUrl = `${window.location.origin}${location.pathname}`;
  const imageUrl = firstArticle?.thumbnail_path
    ? `${window.location.origin}/storage/${firstArticle.thumbnail_path}`
    : `${window.location.origin}/images/default-blog.jpg`;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Actualités", path: "/actualites" },
    { label: slug || "Catégorie", path: location.pathname },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
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
          firstArticle &&
            articleSchema(firstArticle, {
              type: "BlogPosting",
              url: location.pathname,
            }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
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
