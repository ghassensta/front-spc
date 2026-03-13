import { useLocation } from "react-router-dom";
import { useGetList } from "src/actions/seo";
import { Helmet } from "react-helmet";
import PageSeoSList from "src/sections/pages-seo/page-seo-list-view";

export default function Page() {
  const location = useLocation();
  const { pageseo, pageseoLoading } = useGetList();

  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>

        <title>Secteurs d'Activités Spa | Spa & Prestige Collection</title>
        <meta
          name="description"
          content="Découvrez tous les secteurs d'activités du monde du spa : instituts de beauté, hôtels spa, thalassothérapie, centres bien-être. Spa & Prestige Collection."
        />
        <meta
          name="keywords"
          content="secteurs activités spa, institut beauté, thalassothérapie, hôtel spa, bien-être, hammam, sauna, jacuzzi, prestige, soins corps visage"
        />

        <meta name="author" content="Spa & Prestige Collection" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        <meta property="og:title" content="Secteurs d'Activités Spa | Spa & Prestige Collection" />
        <meta
          property="og:description"
          content="Explorez les différents secteurs d'activités: spas de prestige, instituts, centres bien-être, thalasso et bien plus encore."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Spa & Prestige Collection" />
        <meta property="og:image" content="https://spa-prestige-collection.com/assets/og-secteurs.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secteurs d'Activités Spa | Spa & Prestige Collection" />
        <meta
          name="twitter:description"
          content="Explorez les secteurs d'activités  : spas, instituts, thalasso, centres bien-être de prestige."
        />
        <meta name="twitter:image" content="https://spa-prestige-collection.com/assets/og-secteurs.jpg" />

        <link rel="canonical" href={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Secteurs d'Activités Spa",
            "description": "Les secteurs d'activités du spa sur Spa & Prestige Collection.",
            "url": canonicalUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Spa & Prestige Collection",
              "url": "https://spa-prestige-collection.com"
            }
          })}
        </script>

      </Helmet>

      <PageSeoSList
        pageseo={pageseo}
        pageseoLoading={pageseoLoading}
      />
    </>
  );
}