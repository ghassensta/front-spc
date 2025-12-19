import React from "react";
import { Helmet } from "react-helmet"; // ou "react-helmet" si tu n'as pas async
import ContactPageView from "src/sections/contact/contact-page-view";

const pageTitle = "Contact Spa Prestige Collection | +33 (0)1 82 35 01 26";
const pageDescription =
  "Contactez l'équipe Spa & Prestige Collection par téléphone au +33 (0)1 82 35 01 26 ou via notre formulaire. Réponse rapide pour toutes vos questions sur les cartes cadeau, spas partenaires et soins bien-être.";
const pageUrl = "https://spa-prestige-collection.com/contact";
const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/05/spa-contact-og.jpg";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="contact spa prestige collection, téléphone spa, carte cadeau spa, renseignement bien-être, spas france"
        />
        <link rel="canonical" href={pageUrl} />

        {}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        {}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {}
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />

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
                "name": "Contact",
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
            "url": "https://spa-prestige-collection.com",
            "logo": "https://spa-prestige-collection.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33182350126",
              "contactType": "customer service",
              "email": "contact@spa-prestige-collection.com",
              "areaServed": "FR",
              "availableLanguage": "French"
            },
            "sameAs": [
              // Ajoute tes réseaux sociaux ici si tu en as
            ]
          })}
        </script>

        {}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection"
            }
          })}
        </script>
      </Helmet>

      <ContactPageView />
    </>
  );
}
