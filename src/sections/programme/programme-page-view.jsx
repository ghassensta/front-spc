import React, { useEffect } from "react";
import {
  FaExchangeAlt,
  FaFacebookF,
  FaInstagram,
  FaLink,
  FaRegShareSquare,
  FaShoppingCart,
  FaTrophy,
  FaShareAlt,
  FaUserCheck,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-Parrainage-1975x1318-01.jpg";
import { useTranslation } from "src/context/translation-context";

export default function ProgrammePageView() {
  const { translateSync } = useTranslation();

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
      {/* Header avec image */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{ backgroundImage: `url(${theImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            {translateSync("PROGRAMME DE PARRAINAGE")}
          </h1>
        </div>
      </div>

      {/* Section Offrez / Recevez */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mt-12 mb-4">
        <div className="flex flex-col justify-center gap-4 max-w-6xl mx-auto px-4 py-6 text-center w-full md:w-2/5">
          <h2 className="text-4xl font-bold">
            {translateSync("Offrez 5€, et recevez 5€ en retour")}
          </h2>
          <p className="text-center font-tahoma mb-8">
            {translateSync(
              "Un instant de détente, une attention, une belle découverte… Invitez vos proches à rejoindre Spa & Prestige Collection et recevez un bon d’achat à chaque première commande validée.",
            )}
          </p>
          <div className="flex items-center justify-center gap-6 text-2xl text-gray-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineEmail />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="bg-white w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-4">
        <h2 className="text-4xl mb-4 font-bold text-center">
          {translateSync("Comment ça marche ?")}
        </h2>
        <p className="font-tahoma text-center mb-12 w-1/2 mx-auto">
          {translateSync(
            "Un programme simple et généreux, pensé pour celles et ceux qui aiment partager leurs plus belles adresses bien-être.",
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaShareAlt className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              {translateSync("Invitez un proche. ")}
            </div>
            <p className="text-center font-tahoma text-base">
              {translateSync(
                "Envoyez votre lien de parrainage à un ami pour qu’il crée son compte.",
              )}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaLink className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              {translateSync("Tout commence dans votre espace client")}
            </div>
            <p className="text-center font-tahoma text-base">
              {translateSync(
                "Connectez-vous à votre compte pour retrouver votre lien de parrainage personnel.",
              )}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <FaUserCheck className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              {translateSync("Votre ami s’inscrit et en profite")}
            </div>
            <p className="text-center font-tahoma text-base">
              {translateSync(
                "Votre ami s’inscrit et en profite En s’inscrivant via votre lien, il reçoit 5€ offerts sur sa première commande.",
              )}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <GiTakeMyMoney className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              {translateSync("Recevez 5€ en bon d’achat")}
            </div>
            <p className="text-center font-tahoma text-base">
              {translateSync(
                "Vous êtes récompensé(e) Dès sa première commande validée, vous recevez à votre tour 5€ en bon d’achat, directement sur votre compte.",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Conditions & Newsletter Mailjet */}
      <div className="w-screen relative max-w-6xl mx-auto mb-4 px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            {translateSync("Les conditions")}
          </h2>
          <p className="font-tahoma mb-3">
            {translateSync(
              "Code unique d’une valeur de 5 € à valoir sur le site Spa & Prestige Collection...",
            )}
          </p>
        </div>

        <div>
          <h2 className="text-4xl mb-4 font-bold">
            {translateSync("Soyez les premiers informés")}
          </h2>
          <p className="mb-6 font-tahoma">
            {translateSync(
              "Inscrivez-vous à notre newsletter pour être prévenu dès le lancement du programme.",
            )}
          </p>

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
      </div>

      <div className="w-full flex items-center justify-center mb-2">
        <ButtonIcon
          title={translateSync("COUP DE CŒUR")}
          link={paths.spa.list}
        />
      </div>
    </>
  );
}
