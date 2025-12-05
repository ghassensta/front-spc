import ProgrammePageView from "src/sections/programme/programme-page-view";
import { Helmet } from 'react-helmet'

export default function Page() {
  const pageTitle = "Programme de Parrainage - Spa & Prestige Collection";
  const pageDescription = "Gagnez 5€ en bon d'achat en parrainant vos amis ! Programme de parrainage simple et généreux pour partager vos adresses bien-être préférées.";
  const pageUrl = "https://spa-prestige-collection.com/programme-parrainage";
  const imageUrl = "src/assets/images/SPC-coeur-1975x1318-01.jpg";

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
      "@type": "ReferralProgram",
      "name": "Spa & Prestige Collection - Programme de Parrainage",
      "description": "Parrainez vos amis et recevez 5€ en bon d'achat à chaque première commande validée",
      "organizationName": "Spa & Prestige Collection",
      "referralReward": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "price": "5",
        "description": "Bon d'achat de 5€ pour chaque ami parrainé"
      },
      "friendReward": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "price": "5",
        "description": "5€ offerts sur la première commande du filleul"
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
        "name": "Programme de Parrainage",
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
        "name": "Comment fonctionne le programme de parrainage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Partagez votre lien de parrainage avec vos amis. Chaque ami qui s'inscrit via votre lien reçoit 5€ offerts sur sa première commande. Vous recevez 5€ en bon d'achat dès sa première commande validée."
        }
      },
      {
        "@type": "Question",
        "name": "Combien d'amis puis-je parrainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez parrainer jusqu'à 10 personnes. Chaque parrainage réussi vous permet de gagner 5€ en bon d'achat."
        }
      },
      {
        "@type": "Question",
        "name": "Quand recevrai-je mon bon d'achat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le bon d'achat est disponible dans votre rubrique 'Mes avantages' 14 jours après la première commande validée de votre filleul."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les conditions d'utilisation du bon d'achat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le bon d'achat de 5€ est valable 12 mois, utilisable une seule fois sur une commande minimum de 30€, non remboursable, non échangeable, non fractionnable et non cumulable avec d'autres codes de parrainage ou offres promotionnelles."
        }
      },
      {
        "@type": "Question",
        "name": "Que se passe-t-il si mon filleul annule sa commande?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'annulation de la commande du filleul ne donnera pas droit au code promotionnel de parrainage."
        }
      },
      {
        "@type": "Question",
        "name": "Mon filleul n'apparaît pas dans ma liste - pourquoi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si votre filleul n'apparaît pas dans votre suivi, c'est qu'il ne s'est pas encore inscrit ou que sa commande n'a pas encore été validée. Encouragez-le à finaliser son adhésion et à passer commande."
        }
      }
    ]
  };

  const howItWorksSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment utiliser le programme de parrainage Spa & Prestige Collection",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Partagez votre lien",
        "text": "Envoyez votre lien de parrainage unique à un ami pour qu'il s'inscrive sur Spa & Prestige Collection."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Votre ami s'inscrit et profite",
        "text": "Grâce à votre lien, il reçoit 5€ offerts sur sa première commande. Il doit passer une commande d'au moins 30€ pour valider le parrainage."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Recevez votre bon d'achat",
        "text": "Dès sa première commande validée, vous gagnez 5€ en bon d'achat à utiliser sur toutes nos ventes. Le code est disponible 14 jours après sa commande."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="programme parrainage, parrainage spa, bon d'achat, referral program, partager lien, gagnez 5€, filleul" />
        
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

      <ProgrammePageView />
    </>
  );
}