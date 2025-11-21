import React, { useState } from "react";
import { MapPin, BookOpen, PhoneCall, Sparkles } from "lucide-react";
import ButtonIcon from "src/components/button-icon/button-icon";
import { useCheckoutContext } from "../checkout/context";
import { useNavigate } from "react-router-dom";
import { paths } from "src/router/paths";
import { toast } from "react-toastify";
const amounts = [50, 100, 150, 200];
export default function CarteCadeau() {
  const checkout = useCheckoutContext();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(null)
  const [receiver, setReceiver] = useState([{fullName: '', email: ''}])
  const addProductToCheckout = () => {
    if (!amount) {
      toast.error("Veuillez sélectionner un montant.");
      return;
    }

    if (!receiver[0].fullName || !receiver[0].email) {
      toast.error("Veuillez remplir les champs pour le destinataire.");
      return;
    }

    if (!checkout.expediteur.fullName) {
      toast.error("Veuillez remplir votre nom et prénom.");
      return;
    }
    checkout.onAddToCart({
      id: Date.now(),
      name: "Carte cadeau de "+ amount + "€",
      price: amount,
      image: "https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-carte-cadeau-montant-3.jpg",
      destinataires: receiver,
      expediteur: checkout.expediteur,
      quantity: 1
    });

    // Navigate to checkout after adding
    navigate(paths.checkout);
  }
  return (
    <>
      {/* Intro Section */}
      <div className="flex bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-5">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-4">
                Un cadeau qui fait la différence
              </h2>
              <p className="font-roboto pr-6 text-[#5E5E5E]">
                Instantanée. Attentionnée. La carte cadeau Spa & Prestige
                Collection vous permet d’offrir une expérience bien-être unique
                à vos proches, en toute simplicité.
                <br />
                Un choix varié de prestations exceptionnelles, à savourer en un
                clic. Un cadeau facile à offrir, agréable à recevoir, pour des
                moments de pure détente et d’évasion.
                <br /> La carte cadeau Spa Prestige Collection est valable dans
                l’ensemble de nos partenaires Spas pour une période de un an à
                partir de la date de commande.
                <br />
                Vous pouvez aussi offrir directement un soin (avec nos remises
                prix) en consultant les offres de nos partenaires Spas.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                loading="lazy"
                src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-carte-cadeau-montant-3.jpg"
                alt="Carte Cadeau Spa & Prestige"
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto gap-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start">
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center text-2xl mb-4 font-bold">
              Un cadeau instantané et pratique
            </h4>
            <p className="font-roboto text-center">
              Offrez un moment de sérénité immédiate, sans attente ni
              contrainte.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center text-2xl mb-4 font-bold">
              Un choix infini
            </h4>
            <p className="font-roboto text-center">
              Des prestations variées pour toutes les occasions et tous les
              budgets, à savourer en toute liberté.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center text-2xl mb-4 font-bold">
              Un bien-être sur mesure
            </h4>
            <p className="font-roboto text-center">
              Une invitation à se détendre, à la manière de chacune. Un cadeau
              valable pendant 1 an pour un moment de pure évasion.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          OFFRIR UNE CARTE CADEAU :<br /> UNE ATTENTION QUI A DU SENS.
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            loading="lazy"
            src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-Femme-cartes-square.jpg"
            alt=""
          />
          <div className="font-roboto space-y-2">
            <h5 className="text-2xl font-bold">Sélectionnez le montant</h5>
            <div className="grid grid-cols-4 w-full gap-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`border border-black py-2 px-3 w-full font-bold
        ${
          amount === amt
            ? "bg-black text-white"
            : "bg-gray-200 hover:bg-black hover:text-white"
        }
      `}
                >
                  {amt.toFixed(2)} €
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {/* Recipient Form */}
              <div className="">
                <h5 className="text-xl font-tahoma font-normal mb-4">
                  Nom et prénom de la personne qui recevra la carte Cadeau
                </h5>
                <div className="space-y-4">
                  <div className="flex gap-6">
                    <label className="block w-40 text-sm font-tahoma font-medium mb-1">
                      Nom et prénom
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={receiver[0].fullName}
                      onChange={(e) =>
                       setReceiver([{email: receiver[0].email, fullName: e.target.value}])
                      }
                    />
                  </div>
                  <div className="flex gap-6">
                    <label className="block w-40 text-sm font-tahoma font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={receiver[0].email}
                      onChange={(e) =>
                       setReceiver([{fullName: receiver[0].fullName, email: e.target.value}])
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Sender Form */}
              <div className="">
                <h5 className="text-xl font-tahoma font-normal mb-4">
                  Nom et prénom de la personne qui commande
                </h5>
                <div className="space-y-4">
                  <div className="flex gap-6">
                    <label className="block w-40 text-sm font-tahoma font-medium mb-1">
                      Nom et prénom
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={checkout.expediteur.fullName}
                      onChange={(e) =>
                        checkout.onCreateExpediteur({
                          ...checkout.expediteur,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex gap-6">
                    <label className="block w-40 text-sm font-tahoma font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={checkout.expediteur.message || ''}
                      onChange={(e) =>
                        checkout.onCreateExpediteur({
                          ...checkout.expediteur,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex justify-end">
                  <button
                onClick={addProductToCheckout}
                className="w-max px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2"
              >
                <span>Offrir</span>
              </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Comment ça marche
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center ">
          <div>
            <MapPin className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Sélectionnez votre adresse bien-être
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              Parcourez notre page <strong>"Tous nos spas"</strong> et
              choisissez l’établissement qui vous correspond, près de chez vous
              ou dans la région de votre choix.
            </p>
          </div>

          <div>
            <BookOpen className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Plongez dans l’univers du Spa
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              Accédez à la fiche de chaque établissement pour découvrir en
              détail les soins, les installations et toutes les informations
              essentielles à votre expérience.
            </p>
          </div>

          <div>
            <PhoneCall className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              Réservez votre moment privilégié
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              Contactez directement l’établissement par téléphone ou mail en
              indiquant votre numéro de carte cadeau.
            </p>
          </div>

          <div>
            <Sparkles className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">Vivez l’instant</h3>
            <p className="text-sm text-gray-700 font-roboto">
              Offrez-vous une parenthèse de bien-être, où chaque détail est
              soigneusement pensé pour votre détente.
            </p>
          </div>
        </div>

        {/* Bouton Coup de cœur */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#B6B498] text-white rounded-full py-2 px-6 hover:bg-black duration-300 font-roboto">
            COUPS DE CŒUR
          </button>
        </div>
      </div>
    </>
  );
}