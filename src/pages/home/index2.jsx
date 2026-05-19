import HomeViewPage from "../../sections/home2/home-view-page2";
import SeoHead from "../../components/seo/SeoHead";
import JsonLd from "../../components/seo/JsonLd";
import {
  websiteSchema,
  organizationSchema,
  faqSchema,
} from "../../lib/schema";
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

export default function Page() {
  const pageTitle =
    "Réseau de Spas Premium en France et en Europe";
  const pageDescription =
    "Découvrez Spa & Prestige Collection, une sélection exclusive d'établissements spa, thermes et centres de bien-être. Cartes cadeaux, réductions CSE et programme de fidélité.";

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical="/"
        image={theImage}
        keywords="spa, prestige, bien-être, thermes, cartes cadeaux, CSE, fidélité, massage, wellness"
      />

      <JsonLd
        data={[
          websiteSchema(),
          organizationSchema(),
          faqSchema(FAQS),
        ]}
      />

      <HomeViewPage />
    </>
  );
}
