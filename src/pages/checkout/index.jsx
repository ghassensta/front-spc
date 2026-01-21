import React from "react";
import { Helmet } from "react-helmet";
import CheckoutView from "src/sections/checkout/view/checkout-view";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";
import { useLocation } from "react-router-dom";

export default function Page() {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const pageTitle = "Checkout - Spa & Prestige Collection";
  const pageDescription = "Finalisez votre commande et profitez d'un paiement sécurisé sur Spa & Prestige Collection. Vérifiez vos produits, vos soins et vos informations avant validation.";
  const imageUrl = theImage;

  return (
    <>
      <Helmet>
        {/* SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="checkout spa, paiement spa, validation commande, spa prestige, paiement sécurisé" />
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
            }
          })}
        </script>
      </Helmet>

      <CheckoutView />
    </>
  );
}
