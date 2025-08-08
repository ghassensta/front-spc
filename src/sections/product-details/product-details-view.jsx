import React, { useState } from "react";
import ButtonIcon from "../../components/button-icon/button-icon";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useCheckoutContext } from "../checkout/context/use-checkout-context";
import { useRouter } from "../../hooks";
import { paths } from "../../router/paths";
import { Star } from "lucide-react";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";

export default function ProductDetailsView() {
  const checkout = useCheckoutContext();
  const router = useRouter()
  const stars = 3;
  const [activeTab, setActiveTab] = useState("description");
  const roundedRating = Math.round(stars * 2) / 2;
  const [rating, setRating] = useState(0);

  const addProductToCheckout = () => {
    checkout.onAddToCart(
      {
        id: '1',
        name: 'Pass Paradis 1h + Traditionnel Indien du Visage 30 mn – Solo',
        price: 69,
      }
    )
    router.push(paths.checkout)
  }

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <h4 className="font-semibold text-4xl mb-4">
        Pass Paradis 1h + Traditionnel Indien du Visage 30 mn – Solo
      </h4>
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <img
          className="rounded-lg"
          src="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPA-visage-1975x1318-04.jpg"
          alt=""
        />
        <div className="bg-white p-8 rounded-2xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "David Grand Spa - Villerest",
              "100 chemin de la chapelle",
              "42300 VILLEREST",
              "Loire",
              "France",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-primary text-secondary font-tahoma text-xs px-3 p-1 rounded-ss-xl rounded-ee-xl"
              >
                {text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={18}
              fill={i <= roundedRating ? "#facc15" : i - 0.5 === roundedRating ? "#facc15" : "none"}
              stroke="#facc15"
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({stars.toFixed(1)})</span>
                </div>
          <div className="font-bold text-secondary text-3xl font-tahoma mb-2">
            69,00 €
          </div>
          <p className="leading-base text-base font-tahoma">
            Accès à l’espace Réveil des Sens et au Concept du Bonheur ET « Un
            masseur bien-être écoute avec ses mains, et son cœur » Le massage
            Indien du visage est originaire du Kerala, berceau du massage
            Ayurveda en Inde. Pratiquée par les professionnels, cette méthode
            traditionnelle s’adresse à une clientèle à la recherche d’un soin de
            beauté et de relaxation. Le massage indien du visage s’inscrit dans
            une tradition ancestrale de bien-être, de relaxation. Concernant
            cette pratique la pression est moyenne et le rythme lent. Massage
            DaviD GranD Spa au Domaine de Champlong.
          </p>
        </div>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recipient Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h5 className="text-xl font-semibold mb-4">
            Destinataire (carte cadeau)
          </h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-tahoma font-medium mb-1">
                Nom et prénom de la personne qui recevra la carte cadeau
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={checkout.billing.fullName}
                onChange={(e) =>
                  checkout.onCreateBilling({
                    ...checkout.billing,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-tahoma font-medium mb-1">
                Adresse e-mail du destinataire
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={checkout.billing.email}
                onChange={(e) =>
                  checkout.onCreateBilling({
                    ...checkout.billing,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Sender Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h5 className="text-xl font-semibold mb-4">
            Expéditeur (personne qui commande)
          </h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-tahoma font-medium mb-1">
                Nom et prénom de la personne qui commande
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
            <div>
              <label className="block text-sm font-tahoma font-medium mb-1">
                Message personnalisé (optionnel)
              </label>
              <textarea
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={checkout.billing.message}
                onChange={(e) =>
                  checkout.onCreateExpediteur({
                    ...checkout.expediteur,
                    message: e.target.value,
                  })
                }
              >{checkout.billing.message}</textarea>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex justify-end" onClick={()=>addProductToCheckout()}>
            <ButtonIcon title="Offrir" />
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white p-3 font-tahoma rounded-xl shadow-sm">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "description"
                ? "border-b-2 border-secondary text-secondary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "reviews"
                ? "border-b-2 border-secondary text-secondary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Avis
          </button>
        </div>

        <div className="mt-6 min-h-[150px]">
          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-base leading-relaxed text-gray-700"
              >
                Accès à l’espace Réveil des Sens et au Concept du Bonheur ET «
                Un masseur bien-être écoute avec ses mains, et son cœur » Le
                massage Indien du visage est originaire du Kerala, berceau du
                massage Ayurveda en Inde. Pratiquée par les professionnels,
                cette méthode traditionnelle s’adresse à une clientèle à la
                recherche d’un soin de beauté et de relaxation...
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Existing Reviews */}
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold">Marie D.</p>
                    <div className="text-yellow-500 text-sm mb-1 flex gap-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p className="text-sm text-gray-600">
                      "Très belle expérience, je recommande !"
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold">Jean M.</p>
                    <div className="text-yellow-500 text-sm mb-1 flex gap-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p className="text-sm text-gray-600">
                      "Massage très relaxant et lieu magnifique."
                    </p>
                  </div>
                </div>

                {/* Add a Review Form */}
                <div className="bg-white p-4 rounded-lg border">
                  <h6 className="font-semibold text-lg mb-2">
                    Laisser un avis
                  </h6>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                      Votre commentaire
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Partagez votre expérience..."
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Votre note
                    </label>
                    <StarRatingInput value={rating} onChange={setRating} />
                  </div>

                  <div className="flex justify-end">
                    <ButtonIcon title="Envoyer l'avis" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
