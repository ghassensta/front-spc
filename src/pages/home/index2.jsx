import { Helmet } from "react-helmet-async";
import HomeViewPage from "../../sections/home2/home-view-page2";
import {
  websiteSchema,
  organizationSchema,
  faqSchema,
} from "../../lib/schema";
import { usePrerenderReady } from "../../hooks/use-prerender-ready";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";

const FAQS = [
  {
    question: "Qu'est-ce que Spa & Prestige Collection ?",
    reponse:
      "Spa & Prestige Collection est une sélection exclusive d'établissements d'exception (spas urbains, thermes, hôtels de charme) soigneusement sélectionnés pour leur confort, ambiance singulière et service sur-mesure.",
  },
  {
    question: "Comment bénéficier de réductions ?",
    reponse:
      "Inscrivez-vous au programme de fidélité, commandez une carte cadeau, ou rejoignez notre communauté privée pour accéder à des offres exclusives.",
  },
  {
    question: "Proposez-vous des cartes cadeaux ?",
    reponse:
      "Oui, des cartes cadeaux élégantes en version physique ou numérique, en plusieurs montants, parfaites pour toutes les occasions.",
  },
  {
    question: "Comment devenir membre ?",
    reponse:
      "Inscrivez-vous à notre plateforme pour accéder à notre communauté privée et bénéficier de privilèges exclusifs et de tarifs préférentiels.",
  },
  {
    question: "Quels établissements proposez-vous ?",
    reponse:
      "Plus de 100 établissements d'exception en France et en Europe : spas urbains, thermes, hôtels de charme, centres de beauté et refuges insolites.",
  },
];

const BASE = "https://spa-prestige-collection.com";

export default function Page() {
  usePrerenderReady(true);

  const pageTitle =
    "Réseau de Spas Premium en France et en Europe | Spa & Prestige Collection";
  const pageDescription =
    "Découvrez Spa & Prestige Collection, une sélection exclusive d'établissements spa, thermes et centres de bien-être. Cartes cadeaux, réductions CSE et programme de fidélité.";

  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="spa, prestige, bien-être, thermes, cartes cadeaux, CSE, fidélité, massage, wellness" />
        <meta name="author" content="Spa & Prestige Collection" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={BASE} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={BASE} />
        <meta property="og:image" content={`${BASE}/spa-prestige-logo.png`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Spa & Prestige Collection" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${BASE}/spa-prestige-logo.png`} />

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(FAQS))}
        </script>
      </Helmet>

      <HomeViewPage />
    </>
  );
}
