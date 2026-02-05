import React from "react";
import { useGetNews } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

export default function Page() {
  const { actualites, categories, actualitesLoading } = useGetNews();
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Actualités - Spa & Prestige Collection";
  const pageDescription = "Retrouvez toutes nos actualités, conseils et nouveautés spa & bien-être sur Spa & Prestige Collection.";
  const imageUrl = actualites?.[0]?.image || theImage;

  return (
    <>
      <Helmet>
        {/* SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="actualités spa, blog spa, bien-être, spa prestige, conseils spa, nouveautés spa" />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": currentUrl,
            "image": imageUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection",
              "logo": { "@type": "ImageObject", "url": `${window.location.origin}/logo.png` }
            },
            "mainEntityOfPage": {
              "@type": "ItemList",
              "name": "Actualités Spa & Bien-être",
              "numberOfItems": actualites?.length || 0,
              "itemListElement": (actualites || []).slice(0, 10).map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.title || `Article ${index + 1}`,
                "description": item.excerpt || "",
                "image": item.image || imageUrl,
                "url": `${currentUrl}#${item.slug || index}`
              }))
            }
          })}
        </script>
      </Helmet>

      <BlogPage
        articles={actualites}
        categories={categories}
        loading={actualitesLoading}
      />
    </>
  );
}
