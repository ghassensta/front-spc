import React from "react";
import {
  FaExchangeAlt,
  FaFacebookF,
  FaInstagram,
  FaLink,
  FaRegShareSquare,
  FaShoppingCart,
  FaTrophy,
  FaUserCheck,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function ProgrammePageView() {
  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-coeur-1975x1318-01.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />{" "}
        {/* overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            PROGRAMME DE PARRAINAGE
          </h1>
        </div>
      </div>

      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mt-12 mb-4">
        <div className="flex flex-col justify-center gap-4 max-w-6xl mx-auto px-4 py-6 text-center w-full md:w-2/5">
          <p className="font-tahoma">
            <strong>Bientôt disponible :</strong> notre programme de parrainage.
          </p>
          <h3 className="text-4xl font-bold">
            Offrez 5€, et recevez 5€ en retour.
          </h3>
          <p className="text-center font-tahoma mb-8">
            Un instant de détente, une attention, une belle découverte… Très
            bientôt, vous pourrez inviter vos proches à rejoindre Spa & Prestige
            Collection, et recevoir un bon d’achat à chaque première commande
            validée.
          </p>
          <p className="text-xs font-tahoma mb-8">
            Choisissez votre mode de partage
          </p>
          <div className="flex items-center justify-center gap-6 text-2xl text-gray-600">
            <a href="https://facebook.com" target="_blank">
              <FaFacebookF />
            </a>
            <a href="https://gmail.com" target="_blank">
              <MdOutlineEmail />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-4">
        <h2 className="text-4xl mb-4 font-bold text-center">
          Comment ça marche ?
        </h2>
        <p className="font-tahoma text-center mb-12 w-1/2 mx-auto">
          Un programme simple, généreux, et pensé pour celles et ceux qui aiment
          partager leurs plus belles adresses bien-être.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaLink className="text-6xl text-[#C7B892] text-center" />
            <div className="text-2xl font-bold text-center">
              Partagez votre lien
            </div>
            <p className="text-center font-tahoma text-base">
              Envoyez votre lien de parrainage à un ami pour qu’il s’inscrive.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaUserCheck className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              Votre ami s’inscrit et en profite
            </div>
            <p className="text-center font-tahoma text-base">
              Grâce à votre lien, il reçoit <strong>5€ offerts</strong> sur sa
              première commande. Bienvenue à lui !
            </p>
          </div>
          <div className="flex flex-col items-center">
            <GiTakeMyMoney className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              Recevez 5€ en bon d’achat
            </div>
            <p className="text-center font-tahoma text-base">
              Dès sa première commande, vous gagnez{" "}
              <strong>5€ à utiliser sur toutes nos ventes.</strong> C’est gagné
              !
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-4">
        <h2 className="text-4xl mb-4 font-bold text-center">
          Suivi de vos filleuls
        </h2>
        <p className="font-tahoma text-center mb-12 w-1/2 mx-auto">
          Devenez parrain
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaRegShareSquare className="text-6xl text-[#C7B892] text-center" />
            <div className="text-2xl font-bold text-center">
              Partagez votre lien
            </div>
            <p className="text-center font-tahoma text-base">
              Invitez de nouveaux adhérents à rejoindre Spa & Prestige
              Collection en leur envoyant votre lien de parrainage.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaUserCheck className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              Votre ami s’inscrit et en profite
            </div>
            <p className="text-center font-tahoma text-base">
             À chaque nouvelle inscription suivie d’une commande, vous gagnez <strong>10€ utilisables sur toutes nos prestations.</strong>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <GiTakeMyMoney className="text-6xl text-[#C7B892]" />
            <div className="text-2xl font-bold text-center">
              Votre filleul n’apparaît pas ?
            </div>
            <p className="text-center font-tahoma text-base">
              Cela signifie qu’il ne s’est pas encore inscrit. Encouragez-le à
              finaliser son adhésion !
            </p>
          </div>
        </div>
      </div>

      <div className="w-screen relative max-w-6xl mx-auto mb-4 px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-3xl font-semibold mb-6">Les conditions</h3>
          <p className="font-tahoma mb-3">
            Code unique d’une valeur de 5 € à valoir sur le site Spa & Prestige
            Collection, pour toute commande réalisée sur une vente privée d’un
            montant minimum de 30 €. Le code est disponible dans la rubrique «
            Mes avantages », dans la limite de 10 parrainages réalisés, 14 jours
            après la première commande réalisée par le filleul. L’annulation de
            la commande du filleul ne donnera pas droit au code promotionnel. Le
            bon d’achat est valable 12 mois, utilisable une seule fois, non
            remboursable, non échangeable, non fractionnable et non
            transmissible, non cumulable avec d’autres codes parrainage et non
            cumulable avec toute autre offre promotionnelle.
          </p>
          <p className="font-tahoma mb-3">
            Code unique de -5 € à valoir sur le site Spa & Prestige Collection
            lors de la première commande du filleul dès 30 € d’achat. Le code
            est valable jusqu’à utilisation, utilisable une seule fois, non
            remboursable, non échangeable, non fractionnable et non
            transmissible, non cumulable avec d’autres codes parrainage et non
            cumulable avec toutes les autres offres promotionnelles.
          </p>
        </div>
        <div className="mb-4 py-4 text-left">
          <h2 className="text-4xl mb-4 font-bold text-left">
            Soyez les premiers informés
          </h2>
          <p className="text-left text-base font-tahoma mb-4">
            Inscrivez-vous à notre newsletter pour être prévenu dès le lancement
            du programme.
          </p>
          <div className="flex items-center max-w-xl mx-auto">
            <div className="flex flex-col items-center font-tahoma text-lg w-full">
              <div>
                <label className="text-sm text-gray-600" htmlFor="email">
                  Email*
                </label>
                <input
                  type="text"
                  className="px-3 py-2 border border-black text-sm rounded w-full mb-4"
                />
                <div className="flex gap-2 items-center mb-6">
                  <input
                    type="checkbox"
                    name=""
                    id="accepte"
                    className="w-6 h-6 border-black"
                  />
                  <label htmlFor="accepte" className="text-[#55575d] text-sm">
                    J'accepte l'inscription à la base de données Newsletter SPC.
                  </label>
                </div>
              </div>

              <button className="bg-[#b6b499] rounded-full text-white w-max mx-auto px-8 py-2 mb-4">
                Valider
              </button>
              <img
                lazyload="lazy"
                src="https://assets.mailjet.com/lib/images/passport/mailjet-brand/logo1.png"
                alt=""
                className="w-36 mb-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mb-2">
          <ButtonIcon title="COUP DE CŒUR" link={paths.categories("coup-de-coeur")}/>
      </div>
    </>
  );
}
