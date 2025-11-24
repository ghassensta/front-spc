import RecompensePageView from "src/sections/recompense/view/recompense-page-view";
import { Helmet } from 'react-helmet'

export default function Page() {
  const pageTitle = "Programme de Fidélité - Spa & Prestige Collection";
  const pageDescription = "Rejoignez notre programme de fidélité et gagnez des points à chaque commande. Accumulez 1 point pour 1€ dépensé et échangez contre des bons d'achat.";
  const pageUrl = "https://spa-prestige-collection.com/programme-fidelite";
  const imageUrl = "https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-images-1975x1318-Programme-Parrainage-01-1024x683.jpg";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "image": imageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Spa & Prestige Collection",
      "logo": {
        "@type": "ImageObject",
        "url": "https://spa-prestige-collection.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "LoyaltyProgram",
      "name": "Spa & Prestige Collection Rewards",
      "description": "Programme de fidélité permettant de gagner des points à chaque commande",
      "organizationName": "Spa & Prestige Collection",
      "programName": "Spa & Prestige Collection Rewards",
      "pointsPerCurrency": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "price": "1",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitCode": "PTS",
          "value": "1"
        }
      }
    }
  };

  const breadcrumbSchema = {
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
        "name": "Programme de Fidélité",
        "item": pageUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment fonctionne le programme de fidélité?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gagnez 1 point pour chaque euro dépensé. Accumulez les points et échangez-les contre des bons d'achat de 10€ ou 25€."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les avantages du programme Spa & Prestige Collection Rewards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accumulez des points rapidement, bénéficiez de réductions exclusives, profitez d'une expérience simplifiée et obtenez des bons d'achat pour vos prochaines commandes."
        }
      },
      {
        "@type": "Question",
        "name": "Comment échanger mes points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une fois que vous avez accumulé les points nécessaires, vous pouvez les échanger contre des bons de réduction de 10€ ou 25€ à utiliser sur votre prochaine commande."
        }
      },
      {
        "@type": "Question",
        "name": "Quand le programme de fidélité sera-t-il disponible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inscrivez-vous à notre newsletter pour être informé du lancement officiel du programme de fidélité."
        }
      },
      {
        "@type": "Question",
        "name": "Comment s'inscrire à la newsletter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Saisissez votre adresse email dans le formulaire d'inscription et cochez la case pour accepter l'inscription à la newsletter Spa & Prestige Collection."
        }
      }
    ]
  };

  const howItWorksSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment utiliser le programme de fidélité Spa & Prestige Collection",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Commandez",
        "text": "Assurez-vous d'être connecté à votre compte, puis découvrez vos soins préférés et passez commande via notre site web."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Gagnez",
        "text": "Choisissez votre mode de paiement en ligne et cumulez 1 point pour chaque 1€ dépensé."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Échangez",
        "text": "Une fois que vous avez accumulé les points nécessaires, échangez-les contre des bons de réduction de 10€ ou 25€ pour votre prochaine commande."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="programme fidélité, points de fidélité, bons d'achat, récompenses, spa prestige, accumulation points, réductions exclusives" />
        
        <link rel="canonical" href={pageUrl} />
        
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
        
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(howItWorksSchema)}
        </script>
        
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <RecompensePageView />
    </>
  );
}