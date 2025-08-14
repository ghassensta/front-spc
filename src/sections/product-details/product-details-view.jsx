import React, { useEffect, useState } from "react";
import ButtonIcon from "../../components/button-icon/button-icon";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useCheckoutContext } from "../checkout/context/use-checkout-context";
import { useParams, useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import { Star } from "lucide-react";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import { API_URL_base } from "src/api/data";

export default function ProductDetailsView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const checkout = useCheckoutContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL_base}api/produit/${slug}`);
        if (!res.ok) throw new Error("Produit non trouvé");
        const data = await res.json();
        console.log("Product data:", data);
        // Ici, on prend bien data.product
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const addProductToCheckout = () => {
    console.log("Adding product to checkout:", product);
    if (!product) return;

    checkout.onAddToCart({
      id: product.id,
      name: product.nom,
      price: product.prix,
      image: product.image,
      description: product.description,
      destinataire: checkout.billing,
      expediteur: checkout.expediteur,
    });

    navigate(paths.checkout);
  };

  // Calcul pour les étoiles
  const stars = product?.avg_rating || 0;
  const roundedRating = Math.round(stars * 2) / 2;

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <h4 className="font-semibold text-4xl mb-4">
        {product ? product.nom : "Chargement..."}
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <img
          className="rounded-lg"
          src={product ? `${API_URL_base}storage/${product.image}` : ""}
          alt={product ? product.nom : ""}
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

          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                fill={
                  i <= roundedRating
                    ? "#facc15"
                    : i - 0.5 === roundedRating
                    ? "#facc15"
                    : "none"
                }
                stroke="#facc15"
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              ({stars.toFixed(1)})
            </span>
          </div>

          <div className="font-bold text-secondary text-3xl font-tahoma mb-2">
            {product?.prix} €
          </div>

          <p className="leading-base text-base font-tahoma">
            {product?.description || "Aucune description disponible."}
          </p>
        </div>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Destinataire */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h5 className="text-xl font-semibold mb-4">
            Destinataire (carte cadeau)
          </h5>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nom et prénom"
              value={checkout.billing.fullName}
              onChange={(e) =>
                checkout.onCreateBilling({
                  ...checkout.billing,
                  fullName: e.target.value,
                })
              }
            />
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Email du destinataire"
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

        {/* Expéditeur */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h5 className="text-xl font-semibold mb-4">Expéditeur</h5>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nom et prénom"
              value={checkout.expediteur.fullName}
              onChange={(e) =>
                checkout.onCreateExpediteur({
                  ...checkout.expediteur,
                  fullName: e.target.value,
                })
              }
            />
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Message personnalisé (optionnel)"
              value={checkout.expediteur.message}
              onChange={(e) =>
                checkout.onCreateExpediteur({
                  ...checkout.expediteur,
                  message: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>

        <div className="col-span-2 flex justify-end">
          <ButtonIcon title="Offrir" onClick={addProductToCheckout} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 bg-white p-3 font-tahoma rounded-xl shadow-sm">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-secondary text-secondary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
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
              >
                Accès à l’espace Réveil des Sens et au Concept du Bonheur...
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold">Marie D.</p>
                    <div className="text-yellow-500 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      "Très belle expérience !"
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h6 className="font-semibold text-lg mb-2">
                      Laisser un avis
                    </h6>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                      placeholder="Partagez votre expérience..."
                    />
                    <StarRatingInput value={rating} onChange={setRating} />
                    <div className="flex justify-end mt-3">
                      <ButtonIcon title="Envoyer l'avis" />
                    </div>
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
