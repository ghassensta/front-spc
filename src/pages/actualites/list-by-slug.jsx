import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetActualitezBySlug } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";
import { Helmet } from "react-helmet";

export default function ActualitesByslug() {
  const { slug } = useParams();
  const location = useLocation();
  const { actualites, categories, actualitesLoading } = useGetActualitezBySlug(slug);

  // Si on a au moins un article
  const firstArticle = actualites && actualites.length > 0 ? actualites[0] : null;

  const pageTitle = firstArticle?.meta_title || "Actualités Spa & Prestige Collection";
  const pageDescription = firstArticle?.meta_description || "Découvrez nos dernières actualités Spa & Prestige Collection, conseils bien-être, tendances lifestyle et plus encore.";
  const pageKeywords = firstArticle?.meta_keywords || "spa, bien-être, actualités";
  const pageUrl = `${window.location.origin}${location.pathname}`;
  const imageUrl = firstArticle?.thumbnail_path 
    ? `${window.location.origin}/storage/${firstArticle.thumbnail_path}`
    : `${window.location.origin}/images/default-blog.jpg`;

  return (
    <>
      <Helmet>
        {/* SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD pour l'article (si on a un article) */}
        {firstArticle && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": firstArticle.title,
              "description": firstArticle.meta_description || firstArticle.excerpt,
              "image": imageUrl,
              "author": {
                "@type": "Person",
                "name": firstArticle.user?.name || "Spa & Prestige Collection"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Spa & Prestige Collection",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${window.location.origin}/logo.png`
                }
              },
              "datePublished": firstArticle.created_at,
              "dateModified": firstArticle.updated_at,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": pageUrl
              },
              "keywords": firstArticle.meta_keywords
            })}
          </script>
        )}
      </Helmet>

      <BlogPage
        articles={actualites}
        categories={categories}
        loading={actualitesLoading}
      />
    </>
  );
}
