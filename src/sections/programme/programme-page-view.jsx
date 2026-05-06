import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLink,
  FaShareAlt,
  FaUserCheck,
  FaCheck,
  FaGlobe,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-Parrainage-1975x1318-01.jpg";
import { useTranslation } from "src/context/translation-context";
import { Link as RouterLink } from "react-router-dom";

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
    <div className="w-full">
      {/* Header avec Image */}
      <div
        className="w-full h-96 bg-black bg-center bg-cover relative"
        style={{ backgroundImage: `url(${theImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="max-w-6xl mx-auto w-full px-6 text-white">
            <div className="max-w-xl text-left">
              <h1 className="text-4xl font-bold mb-4 uppercase">
                {translateSync("PROGRAMME DE PARRAINAGE")}
              </h1>

              <p className="text-2xl font-semibold mb-2">
                {translateSync("Offrez 5€, recevez 5€")}
              </p>

              <p className="text-lg mb-6 text-gray-200">
                {translateSync(
                  "Invitez vos proches et profitez d'un avantage dès leur première commande",
                )}
              </p>

              <RouterLink
                to={paths.auth.register}
                className="inline-block bg-transparent border border-white text-white px-8 py-3 font-semibold rounded-md hover:bg-white hover:text-black transition"
              >
                {translateSync("Se connecter / Créer un compte")}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#FBF6EC] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-center mb-10">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#C7B892", letterSpacing: "0.2em" }}
            >
              {translateSync("Parrainage")}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              {translateSync("Offrez 5€, et recevez 5€ en retour")}
            </h2>

            <div
              className="mx-auto mt-4"
              style={{
                width: "60px",
                height: "2px",
                background: "#C7B892",
              }}
            />
          </div>
          <p className="text-gray-700 mb-8">
            {translateSync(
              "Un instant de détente, une attention, une belle découverte… Invitez vos proches à rejoindre Spa & Prestige Collection et recevez un bon d'achat à chaque première commande validée.",
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
              href="mailto:?subject=Parrainage"
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

      {/* How it works */}
      <div className="bg-white py-16 px-4">
        <div className="text-center mb-10">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#C7B892", letterSpacing: "0.2em" }}
          >
            {translateSync("Processus")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            {translateSync("Comment ça marche ?")}
          </h2>

          <div
            className="mx-auto mt-4"
            style={{
              width: "60px",
              height: "2px",
              background: "#C7B892",
            }}
          />
        </div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {translateSync(
            "Un programme simple et généreux, pensé pour celles et ceux qui aiment partager leurs plus belles adresses bien-être.",
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: FaShareAlt,
              title: "Invitez un proche",
              desc: "Envoyez votre lien de parrainage à un ami pour qu'il crée son compte.",
            },
            {
              icon: FaLink,
              title: "Tout commence dans votre espace client",
              desc: "Connectez-vous à votre compte pour retrouver votre lien de parrainage personnel.",
            },
            {
              icon: FaUserCheck,
              title: "Votre ami s'inscrit et en profite",
              desc: "Votre ami s'inscrit via votre lien et reçoit 5€ offerts sur sa première commande.",
            },
            {
              icon: GiTakeMyMoney,
              title: "Recevez 5€ en bon d'achat",
              desc: "Dès sa première commande validée, vous recevez à votre tour 5€ en bon d'achat.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#FBF6EC] rounded-full flex items-center justify-center mb-4 text-[#C7B892]">
                <item.icon className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {translateSync(item.title)}
              </h3>
              <p className="text-gray-600">{translateSync(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditions & Newsletter */}
      <div className="bg-[#FBF6EC] py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Conditions side */}
          <div>
            {/* Conditions side */}
            <div>
              <div className="text-center mb-10">
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ color: "#C7B892", letterSpacing: "0.2em" }}
                >
                  {translateSync("Informations")}
                </p>

                <h2 className="text-3xl md:text-4xl font-bold">
                  {translateSync("Les conditions")}
                </h2>

                <div
                  className="mx-auto mt-4"
                  style={{
                    width: "60px",
                    height: "2px",
                    background: "#C7B892",
                  }}
                />
              </div>
            </div>

            {/* Carte principale avec icône bouclier */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm flex items-center gap-4">
              {/* Icône bouclier doré dans cercle */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#C7B892] flex items-center justify-center">
                <FaShieldAlt className="text-[#C7B892] text-lg" />
              </div>
              <p className="text-gray-800 font-medium text-sm leading-snug">
                {translateSync(
                  "Code unique d'une valeur de 5 € à valoir sur le site Spa & Prestige Collection.",
                )}
              </p>
            </div>

            {/* 3 items en bas */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
              {/* Valable 1 an */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  <FaCheck className="text-gray-500 text-sm" />
                </div>
                <span>{translateSync("Valable 1 an")}</span>
              </div>

              {/* Utilisable sur tout le site */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  <FaGlobe className="text-gray-500 text-sm" />
                </div>
                <span>{translateSync("Utilisable sur tout le site")}</span>
              </div>

              {/* Parrainage illimité */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-sm" />
                </div>
                <span>{translateSync("Parrainage illimité")}</span>
              </div>
            </div>
          </div>

          {/* Newsletter side */}
          <div>
            <div className="text-center mb-10">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "#C7B892", letterSpacing: "0.2em" }}
              >
                {translateSync("Newsletter")}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold">
                {translateSync(
                  "Restez informé(e) de nos nouveautés et avantages",
                )}
              </h2>

              <div
                className="mx-auto mt-4"
                style={{
                  width: "60px",
                  height: "2px",
                  background: "#C7B892",
                }}
              />
            </div>
            <iframe
              data-w-type="embedded"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://srm3t.mjt.lu/wgt/srm3t/0wp5/form?c=31298976"
              width="100%"
              style={{ height: "420px" }}
              title="Newsletter"
            />
          </div>
        </div>
      </div>

      <div className="py-8 flex justify-center">
        <ButtonIcon
          title={translateSync("COUP DE CŒUR")}
          link={paths.spa.list}
        />
      </div>
    </div>
  );
}
