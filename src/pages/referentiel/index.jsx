import ReferentielViewPage from "src/sections/referentiel/referentiel-view-page";
import { Helmet } from 'react-helmet'
import theImage from "src/assets/images/SPC-Catalogue-1975x1318-1-1024x683.jpg";

export default function Page() {
  const pageTitle = "Référentiel de Candidature - Spa & Prestige Collection";
  const pageDescription = "Découvrez nos critères d'adhésion pour rejoindre le réseau Spa & Prestige Collection. Qualité, bien-être, authenticité et excellence requise.";
  const pageUrl = "https://spa-prestige-collection.com/referentiel";
  const imageUrl = theImage;

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
      "@type": "Thing",
      "name": "Critères d'Adhésion Spa & Prestige Collection",
      "description": "Standards élevés pour rejoindre le réseau d'établissements partenaires"
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
        "name": "Référentiel de Candidature",
        "item": pageUrl
      }
    ]
  };

  const criteriaSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quels sont les critères pour rejoindre Spa & Prestige Collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les établissements doivent respecter des critères élevés incluant : atmosphère de relaxation, confort des installations, service client réactif, démarche durable, innovation, qualité des soins, propreté exemplaire, respect de l'intimité, épanouissement du personnel et équipe compétente."
        }
      },
      {
        "@type": "Question",
        "name": "Quels documents faut-il fournir pour postuler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les établissements doivent fournir une documentation détaillée démontrant leur conformité aux critères du référentiel, incluant certifications, photos et descriptions de leurs services."
        }
      },
      {
        "@type": "Question",
        "name": "Comment devenir partenaire de Spa & Prestige Collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez soumettre votre candidature en utilisant notre formulaire 'Devenir partenaire' ou nous contacter directement pour discuter de votre profil et de votre conformité aux standards du réseau."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les valeurs de Spa & Prestige Collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos valeurs fondamentales sont la sincérité, l'élégance, la proximité, la durabilité et l'engagement envers l'excellence du bien-être."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="référentiel, critères adhésion, partenaire spa, bien-être prestige, standards établissements, réseau spa" />
        
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
          {JSON.stringify(criteriaSchema)}
        </script>
        
        <meta name="language" content="fr-FR" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ReferentielViewPage />
    </>
  );
}