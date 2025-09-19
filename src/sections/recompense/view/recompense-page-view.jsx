import React from "react";
import { FaExchangeAlt, FaShoppingCart, FaTrophy } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { paths } from "src/router/paths";

export default function RecompensePageView() {
  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />{" "}
        {/* overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Programme de fidélité
          </h1>
        </div>
      </div>

      <div className="my-8">
        <h5 className="font-bold text-2xl font-roboto text-center">
          Le programme n’est pas encore disponible,
        </h5>
        <p className="text-center font-roboto">
          mais nous incitons les utilisateurs à s’inscrire à la newsletter pour
          être informés de son lancement.
        </p>
      </div>

      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4">
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto px-4 py-6">
          <img lazyload="lazy"
            src="https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-images-1975x1318-Programme-Parrainage-01-1024x683.jpg"
            alt=""
            className="md:w-1/2"
          />
          <div className="text-xl">
            <h2 className="text-4xl mb-4 font-bold">
              Récompenses Spa & Prestige Collection
            </h2>
            <p className="font-roboto mb-3">
              Accumulez des points à chaque commande et échangez-les contre des
              bons d’achat de 10 € et 25 €. Profitez d’une expérience
              simplifiée, et soins de qualité, tout en bénéficiant de réductions
              exclusives sur vos achats.
            </p>
            <p className="font-roboto">
              Rejoignez{" "}
              <span className="font-bold">
                Spa & Prestige Collection Rewards
              </span>{" "}
              et bénéficiez de nombreux avantages sur chaque commande !
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl mb-4 font-bold text-center">
          Gagnez des points à chaque commande.
        </h2>
        <p className="text-center text-lg font-roboto mb-4">
          Les points s’accumulent rapidement et sont automatiquement ajoutés à
          votre solde à chaque fois que vous effectuez une commande.
        </p>
        <div className="font-bold text-5xl font-roboto text-center">
          1€ = 1point{" "}
        </div>
        <div className="text-2xl text-center font-bold text-[#b6b499] mb-4">
          Dépensé{`  =   `}gagné
        </div>
      </div>

      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-4">
        <h2 className="text-4xl mb-12 font-bold text-center">
          Comment ça marche ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaShoppingCart className="text-6xl text-center"/>
            <div className="text-3xl font-bold text-center">Commandez</div>
            <p className="text-center font-bricolage text-xl">
              Assurez-vous d’être connecté à votre compte, puis découvrez vos
              soins préférés et passez commande via notre site web.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaTrophy className="text-6xl" />
            <div className="text-3xl font-bold text-center">Gagnez</div>
            <p className="text-center font-bricolage text-xl">
              Choisissez votre mode de paiement en ligne et cumulez 1 point pour
              chaque 1 € dépensé.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaExchangeAlt className="text-6xl"/>
            <div className="text-3xl font-bold text-center">Échangez</div>
            <p className="text-center font-bricolage text-xl">
              Une fois que vous avez accumulé les points nécessaires,
              échangez-les contre des bons de réduction de 10 € ou 25 € pour
              votre prochaine commande.
            </p>
          </div>
        </div>
      </div>

      <div className="w-screen relative left-[calc(-50vw+50%)] mb-4 py-4">
        <h2 className="text-4xl mb-4 font-bold text-center">
          Soyez les premiers informés
        </h2>
         <p className="text-center text-lg font-roboto mb-4">
          Inscrivez-vous à notre newsletter pour être prévenu dès le lancement du programme.
        </p>
        <div className="flex items-center max-w-xl mx-auto">
            <div className="flex flex-col items-center font-bricolage text-lg w-full">
                <label htmlFor="email">Email*</label>
                <input type="text" placeholder="Email" className="px-3 py-2 border rounded w-full mb-4"/>
                <div className="flex gap-2 items-center mb-6">
                    <input type="checkbox" name="" id="accepte" className="w-6 h-6"/>
                    <label htmlFor="accepte" className="text-[#55575d]">J'accepte l'inscription à la base de données Newsletter SPC.</label>
                </div>

                <button className="bg-[#b6b499] rounded-full text-white w-max mx-auto px-8 py-2 mb-4">Valider</button>
                <img lazyload="lazy" src="https://assets.mailjet.com/lib/images/passport/mailjet-brand/logo1.png" alt="" className="w-48 mb-12"/>
                <a href={paths.main} className="bg-[#b6b499] rounded-full text-white w-max mx-auto px-8 py-2 mb-4 uppercase">Accueil</a>

            </div>
        </div>
      </div>
    </>
  );
}