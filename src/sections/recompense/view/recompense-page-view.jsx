import React, { useEffect } from "react";
import { FaExchangeAlt, FaShoppingCart, FaTrophy } from "react-icons/fa";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import theImage from "src/assets/images/SPC-images-1975x1318-Programme-Parrainage-01-1024x683.jpg";
import theImageContent from "src/assets/SPC-Fidelisation-1975x1318-01.jpg";
import { Link } from "react-router-dom";

export default function RecompensePageView() {
  const { t } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.mailjet.com/pas-nc-embedded-v1.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Bannière */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{ backgroundImage: `url(${theImageContent})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            <TranslatedText text="Programme de fidélité" />
          </h1>
        </div>
      </div>

      {/* Intro */}
     {/*  <div className="my-8 font-tahoma text-base">
        <p className="font-bold text-center">
          <TranslatedText text="Le programme n'est pas encore disponible," />
        </p>
        <p className="text-center">
          <TranslatedText text="mais nous incitons les utilisateurs à s'inscrire à la newsletter pour être informés de son lancement." />
        </p>
      </div> */}

      {/* Récompenses */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4">
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto px-4 py-6">
          <img
            loading="lazy"
            src={theImage}
            alt="Récompenses Spa & Prestige Collection"
            className="md:w-1/2 rounded"
          />
          <div>
            <h2 className="text-4xl mb-4 font-bold">
              <TranslatedText text="Récompenses Spa & Prestige Collection" />
            </h2>

            <p className="mb-3">
              <TranslatedText text="Accumulez des points à chaque commande et échangez-les contre des bons d'achat de 10 € et 25 €." />
            </p>

            <p>
              <TranslatedText text="Rejoignez" />{" "}
              <strong>Spa & Prestige Collection Rewards</strong>{" "}
              <TranslatedText text="et bénéficiez de nombreux avantages !" />
            </p>
          </div>
        </div>
      </div>

      {/* Points */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl mb-4 font-bold">
          <TranslatedText text="Gagnez des points à chaque commande." />
        </h2>
        <p className="text-lg mb-4">
          <TranslatedText text="1 € dépensé = 1 point gagné automatiquement." />
        </p>
        <div className="text-3xl font-bold">1 € = 1 point</div>
        <div className="text-lg text-[#b6b499] mb-6">Dépensé = gagné</div>
      </div>

      {/* Comment ça marche */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-4 py-8 mb-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          <TranslatedText text="Comment ça marche ?" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-6">
          <div className="text-center">
            <FaShoppingCart className="text-6xl mx-auto text-[#C7B892]" />
            <h3 className="text-2xl font-bold mt-3">Commandez</h3>
            <p>
              <TranslatedText text="Passez vos commandes en étant connecté à votre compte." />
            </p>
          </div>

          <div className="text-center">
            <FaTrophy className="text-6xl mx-auto text-[#C7B892]" />
            <h3 className="text-2xl font-bold mt-3">Gagnez</h3>
            <p>
              <TranslatedText text="Cumulez des points à chaque paiement." />
            </p>
          </div>

          <div className="text-center">
            <FaExchangeAlt className="text-6xl mx-auto text-[#C7B892]" />
            <h3 className="text-2xl font-bold mt-3">Échangez</h3>
            <p>
              <TranslatedText text="Utilisez vos points pour obtenir des bons de réduction." />
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Mailjet */}
      <div className="w-screen relative left-[calc(-50vw+50%)] py-8 px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          <TranslatedText text="Soyez les premiers informés" />
        </h2>

        <p className="text-center mb-6">
          <TranslatedText text="Inscrivez-vous à notre newsletter." />
        </p>

        <div className="max-w-xl mx-auto">
          <iframe
            data-w-type="embedded"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://srm3t.mjt.lu/wgt/srm3t/0wp5/form?c=31298976"
            width="100%"
            style={{ height: "420px" }}
            title="Mailjet Newsletter"
          />
        </div>

        <div className="text-center mt-8">
          <Link
            to={paths.main}
            className="bg-[#b6b499] text-white px-8 py-2 rounded-full uppercase inline-block"
          >
            <TranslatedText text="Accueil" />
          </Link>
        </div>
      </div>
    </>
  );
}
