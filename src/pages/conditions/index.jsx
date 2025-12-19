import React from "react";
import { Helmet } from "react-helmet";
import ConditionsPageView from "src/sections/conditions/conditions-page-view";

const pageTitle = "Conditions Générales de Vente - Spa & Prestige Collection";
const pageDescription =
  "Consultez les CGV de Spa & Prestige Collection : modalités de commande, paiement, livraison, rétractation, échange et prolongation des cartes et coffrets cadeau valables dans plus de 500 spas en France.";
const pageUrl = "https://spa-prestige-collection.com/conditions-generales-de-vente";
const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/05/spa-cgv-og.jpg"; // remplace par ta vraie OG image si tu en as une

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="conditions générales de vente, cgv spa prestige collection, carte cadeau spa, coffret cadeau bien-être, rétractation, échange prolongation, droit consommation"
        />
        <link rel="canonical" href={pageUrl} />

        {}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:locale" content="fr_FR" />

        {}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {}
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="general" />

        {}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://spa-prestige-collection.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Conditions Générales de Vente",
                "item": pageUrl
              }
            ]
          })}
        </script>

        {}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Spa & Prestige Collection",
            "legalName": "Prestige Global Solutions",
            "url": "https://spa-prestige-collection.com",
            "logo": "https://spa-prestige-collection.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "12 rue des Marguerites",
              "addressLocality": "Moussy-le-Neuf",
              "postalCode": "77230",
              "addressCountry": "FR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33182350126",
              "contactType": "Service Client",
              "email": "contact@spa-prestige-collection.com",
              "availableLanguage": "French"
            }
          })}
        </script>

        {}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "lastReviewed": "2025-02-01",
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection"
            },
            "inLanguage": "fr-FR",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": "https://spa-prestige-collection.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Conditions Générales de Vente"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <ConditionsPageView />
    </>
  );
}
