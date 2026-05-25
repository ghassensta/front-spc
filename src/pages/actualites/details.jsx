import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetNewsDetail } from "src/actions/actualites";
import BlogDetails from "src/sections/actualites/blog-details";
import { Helmet } from "react-helmet-async";
import JsonLd from "src/components/seo/JsonLd";
import Breadcrumb from "src/components/seo/Breadcrumb";
import NotFound from "../not-found/NotFound";
import {
  articleSchema,
  breadcrumbSchema,
  organizationSchema,
} from "src/lib/schema";

export default function Page() {
  const { slug } = useParams();
  const location = useLocation();

  const { actualite, Loading } = useGetNewsDetail(slug);

  if (Loading) return null;
  if (!actualite) return <NotFound />;

  const pageTitle = actualite.meta_title || actualite.title;
  const pageDescription =
    actualite.meta_description || actualite.excerpt || "";
  const pageKeywords = actualite.meta_keywords || "spa, bien-être, actualités";
  const pageUrl = `${window.location.origin}${location.pathname}`;
  const imageUrl = actualite.thumbnail_path
    ? `${window.location.origin}/storage/${actualite.thumbnail_path}`
    : `${window.location.origin}/images/default-blog.jpg`;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Actualités", path: "/actualites" },
    { label: actualite.title || "Article", path: location.pathname },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="author" content={actualite.user?.name || "Spa & Prestige Collection"} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="article:published_time" content={actualite.created_at} />
        <meta property="article:modified_time" content={actualite.updated_at} />
        <meta property="article:author" content={actualite.user?.name} />
        {actualite.category_ids && actualite.category_ids.length > 0 && (
          <meta property="article:section" content={actualite.category_ids.join(", ")} />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <JsonLd
        data={[
          articleSchema(actualite, { url: location.pathname }),
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ].filter(Boolean)}
      />

      <Breadcrumb items={breadcrumbItems} className="container mx-auto px-4" />

      <BlogDetails actualitie={actualite} />
    </>
  );
}
