import React from "react";
import { FaExchangeAlt, FaShoppingCart, FaTrophy } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import theImage from "src/assets/images/SPC-images-1975x1318-Programme-Parrainage-01-1024x683.jpg";
import theImageconetent from "src/assets/SPC-Fidelisation-1975x1318-01.jpg";

export default function RecompensePageView() {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage:
            `url(${theImageconetent})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />{" "}
        { }
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            <TranslatedText text="Programme de fidélité" />
          </h1>
        </div>
      </div>

      <div className="my-8 font-tahoma font-sans text-base">
        <p className="font-bold text-center">
          <TranslatedText text="Le programme n'est pas encore disponible," />
        </p>
        <p className="text-center">
          <TranslatedText text="mais nous incitons les utilisateurs à s'inscrire à la newsletter pour être informés de son lancement." />
        </p>
      </div>

      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4">
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto px-4 py-6">
          <img lazyload="lazy"
            src={theImage}
            alt="Récompenses Spa & Prestige Collection"
            className="md:w-1/2"
          />
          <div className="text-base">
            <h2 className="text-4xl mb-4 font-bold">
              <TranslatedText text="Récompenses Spa & Prestige Collection" />
            </h2>

            <p className="font-tahoma mb-3">
              <TranslatedText text="Accumulez des points à chaque commande et échangez-les contre des bons d'achat de 10 € et 25 €. Profitez d'une expérience simplifiée, et soins de qualité, tout en bénéficiant de réductions exclusives sur vos achats." />
            </p>

            <p className="font-tahoma">
              <TranslatedText text="Rejoignez" />{" "}
              <span className="font-bold">
                <TranslatedText text="Spa & Prestige Collection Rewards" />
              </span>{" "}
              <TranslatedText text="et bénéficiez de nombreux avantages sur chaque commande !" />
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl mb-4 font-bold text-center">
          <TranslatedText text="Gagnez des points à chaque commande." />
        </h2>

        <p className="text-center text-lg font-tahoma mb-4">
          <TranslatedText text="Les points s'accumulent rapidement et sont automatiquement ajoutés à votre solde à chaque fois que vous effectuez une commande." />
        </p>

        <div className="font-normal text-3xl font-tahoma text-center">
          <TranslatedText text="1 € = 1 point" />
        </div>

        <div className="text-lg font-tahoma text-center font-normal text-[#b6b499] mb-4">
          <TranslatedText text="Dépensé = gagné" />
        </div>
      </div>


      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-4">
        <h2 className="text-4xl mb-4 font-bold text-center">
          <TranslatedText text="Comment ça marche ?" />
        </h2>
        <p className="font-tahoma text-center mb-12">
          <TranslatedText text="C'est simple : plus vous commandez, plus vous accumulez des avantages." />
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaShoppingCart className="text-6xl text-[#C7B892] text-center" />
            <div className="text-2xl font-bold text-center">Commandez</div>
            <p className="text-center font-bricolage text-base">
              <TranslatedText text="Assurez-vous d'être connecté à votre compte, puis découvrez vos soins préférés et passez commande via notre site web." />
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaTrophy className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              <TranslatedText text="Gagnez" />
            </div>
            <p className="text-center font-bricolage text-base">
              <TranslatedText text="Choisissez votre mode de paiement en ligne et cumulez 1 point pour chaque 1 € dépensé." />
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaExchangeAlt className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              <TranslatedText text="Échangez" />
            </div>
            <p className="text-center font-bricolage text-base">
              <TranslatedText text="Une fois que vous avez accumulé les points nécessaires, échangez-les contre des bons de réduction de 10 € ou 25 € pour votre prochaine commande." />
            </p>
          </div>
        </div>
      </div>

      <div className="w-screen relative left-[calc(-50vw+50%)] mb-4 py-4 px-4">
        <h2 className="text-4xl mb-4 font-bold text-center">
          <TranslatedText text="Soyez les premiers informés" />
        </h2>
        <p className="text-center text-base font-tahoma mb-4">
          <TranslatedText text="Inscrivez-vous à notre newsletter pour être prévenu dès le lancement du programme." />
        </p>
        <div className="flex items-center max-w-xl mx-auto">
          <div className="flex flex-col items-center font-bricolage text-lg w-full">
            <div className="flex flex-col items-center">
              <div className="w-full">
                <label className="text-sm text-gray-600 flex  mx-auto" htmlFor="email"><TranslatedText text="Email*" /></label>
                <input type="text" className="px-3 py-2 border border-black text-sm rounded w-full mb-4 mx-auto" />
              </div>
              <div className="flex gap-2 items-center mb-6">
                <input type="checkbox" name="" id="accepte" className="w-6 h-6 border-black" />
                <label htmlFor="accepte" className="text-[#55575d] text-sm"><TranslatedText text="J'accepte l'inscription à la base de données Newsletter SPC." /></label>
              </div>
            </div>

            <button className="bg-[#b6b499] rounded-full text-white w-max mx-auto px-8 py-2 mb-4"><TranslatedText text="Valider" /></button>
            <img
              loading="lazy"
              src="https://assets.mailjet.com/lib/images/passport/mailjet-brand/logo1.png"
              alt=""
              className="w-48 mb-12"
            />

            <a href={paths.main} className="bg-[#b6b499] rounded-full text-white w-max mx-auto px-8 py-2 mb-4 uppercase"><TranslatedText text="Accueil" /></a>

          </div>
        </div>
      </div>
    </>
  );
}
