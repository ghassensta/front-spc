import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useCheckoutContext } from "../checkout/context/use-checkout-context";
import { useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import { Star } from "lucide-react";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CONFIG } from "src/config-global";
import { usePostProductAvis } from "src/actions/products";

export default function ProductDetailsView({ product, avis = [] }) {
  const navigate = useNavigate();
  const checkout = useCheckoutContext();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");

  // State for multiple recipients (repeater)
  const [recipients, setRecipients] = useState([{ fullName: "", email: "" }]);

  const addProductToCheckout = () => {
    if (!product) return;

    // Check for required fields
    if (recipients.some((r) => !r.fullName || !r.email)) {
      toast.error("Veuillez remplir tous les champs pour chaque destinataire.");
      return;
    }

    // Check for duplicate emails
    const emailSet = new Set(recipients.map((r) => r.email.toLowerCase()));
    if (emailSet.size !== recipients.length) {
      toast.error(
        "Emails en double détectés. Chaque destinataire doit avoir un email unique."
      );
      return;
    }

    // Get unique recipients
    const uniqueRecipients = Array.from(
      new Map(recipients.map((r) => [r.email.toLowerCase(), r])).values()
    );

    // Add all recipients to checkout in a single call
    const existingItem = checkout.items.find((item) => item.id === product.id);
    checkout.onAddToCart({
      id: product.id,
      name: product.nom,
      price: product.prix,
      image: product.image,
      description: product.description,
      destinataires: existingItem
        ? [...existingItem.destinataires, ...uniqueRecipients]
        : uniqueRecipients,
      expediteur: {}, // Empty here, handled in next step
      quantity: existingItem
        ? existingItem.destinataires.length + uniqueRecipients.length
        : uniqueRecipients.length,
    });

    // Clear repeater state after adding
    setRecipients([{ fullName: "", email: "" }]);

    navigate(paths.checkout);
  };

  const handleAddRecipient = () => {
    setRecipients([...recipients, { fullName: "", email: "" }]);
  };

  const handleRemoveRecipient = (index) => {
    const newRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(
      newRecipients.length > 0 ? newRecipients : [{ fullName: "", email: "" }]
    );
  };

  const handleRecipientChange = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  // const handleSubmitReview = async () => {
  //   if (!product || !name || !email) {
  //     toast.error("Veuillez remplir tous les champs obligatoires.");
  //     return;
  //   }

  //   const newAvis = {
  //     type_produit_id: product.id,
  //     ratings: rating,
  //     name,
  //     email,
  //     comment,
  //   };

  //   console.log(newAvis);

  //   try {
  //     const res = await fetch(`${CONFIG.serverUrl}/api/produit/avis`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newAvis),
  //     });

  //     if (res.ok) {
  //       const responseData = await res.json();
  //       // const avisAjoute = responseData.avis || responseData;
  //       setName("");
  //       setEmail("");
  //       setComment("");
  //       setRating(0);
  //       toast.success("Avis envoyé avec succès");
  //     } else {
  //       throw new Error("Erreur lors de l'envoi de l'avis");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Une erreur est survenue lors de l'envoi de l'avis.");
  //   }
  // };

const validateForm = () => {
    if (!name || !email) {
      toast.error(
        "Veuillez remplir tous les champs (nom, email) !"
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer un email valide.");
      return false;
    }

    return true;
  };

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      toast
        .promise(
          usePostProductAvis({
            name,
            email,
            comment,
            ratings: rating,
            id: product.id,
          }),
          {
            pending: "Envoi de votre avis...",
            success: "Avis envoyé avec succès !",
            error: "Erreur lors de l'envoi de l'avis.",
          }
        )
        .then(() => {
          setRating(0);
          setName("");
          setEmail("");
          setComment("");
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi de l'avis:", error);
        });
    };
  const stars = product?.avg_rating || 0;
  const roundedRating = Math.round(stars * 2) / 2;

  return (
    <div className="max-w-6xl mx-auto px-4 font-tahoma">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {product?.image && (
          <img lazyload="lazy"
          
            className=""
            src={`${CONFIG.serverUrl}/storage/${product.image}`}
            alt={product.nom}
          />
        )}
        <div className="bg-white p-8 rounded-2xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              product?.type?.etablissement?.nom+" - Tél. :"+product?.type?.etablissement?.telephone,
              " - Email:"+product?.type?.etablissement?.email,
              product?.type?.etablissement?.adresse,
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
          <h4 className="font-semibold text-[#333] text-4xl mb-4">
            {product ? product.nom : "Chargement..."}
          </h4>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                fill={
                  i <= Math.floor(roundedRating)
                    ? "#facc15"
                    : i === Math.ceil(roundedRating) && roundedRating % 1 !== 0
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

          <div className="font-normal text-[#958e09] text-lg font-tahoma mb-2">
            {product?.prix} €
          </div>

          <div className="leading-base text-base font-light font-tahoma text-[#333]">
            {product?.description || "Aucune description disponible."}
          </div>
          {product?.conditions_utilisation && (
            <div className="leading-base text-base font-tahoma">
              {product?.conditions_utilisation}
            </div>
          )}
          {/* Repeater for multiple recipients */}
          <div className="mt-6">
            <h5 className="text-xl font-semibold mb-4">
              Ajouter des destinataires pour les cartes cadeaux
            </h5>
            {recipients.map((recipient, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-sm font-normal">
                    Destinataire {index + 1}
                  </h6>
                  {recipients.length > 1 && (
                    <button
                      onClick={() => handleRemoveRecipient(index)}
                      className="mt-2 text-xs text-red-500 hover:text-red-700"
                    >
                      Supprimer ce destinataire
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2"
                    placeholder="Nom et prénom"
                    value={recipient.fullName}
                    onChange={(e) =>
                      handleRecipientChange(index, "fullName", e.target.value)
                    }
                  />
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2"
                    placeholder="Email du destinataire"
                    value={recipient.email}
                    onChange={(e) =>
                      handleRecipientChange(index, "email", e.target.value)
                    }
                  />
                  <div className="flex items-center gap-2 text-xs">
                    <span>Quantité :</span>
                    <input
                      type="number"
                      className="w-16 border border-gray-300 p-2"
                      value={1}
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddRecipient}
              className="px-4 py-2 bg-gray-200 text-black text-sm rounded-md hover:bg-gray-300 transition mb-4"
            >
              Ajouter un autre destinataire
            </button>

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

      {/* Tabs avis */}
      <div className="mt-10 bg-white p-3 font-tahoma rounded-xl shadow-sm">
        <div className="flex gap-4 border-b border-gray-200">
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
            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {avis.length > 0 ? (
                    avis.map((avis, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md">
                        <p className="font-semibold">{avis.name}</p>
                        <div className="text-yellow-500 flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <FaStar
                              key={i}
                              fill={i <= avis.ratings ? "#facc15" : "none"}
                              stroke="#facc15"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{avis.comment}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-600">
                        Aucun avis pour le moment.
                      </p>
                      <p className="text-gray-600">
                        Soyez le premier à laisser votre avis sur "
                        {product?.nom}" !
                      </p>
                      <p className="text-gray-600">
                        Votre adresse e-mail ne sera pas publiée. Les champs
                        obligatoires sont indiqués avec *
                      </p>
                    </>
                  )}

                  {/* Formulaire ajouter avis */}
                  <div className="bg-white p-4 rounded-lg border">
                    <h6 className="font-semibold text-lg mb-2">
                      Laisser un avis
                    </h6>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                      placeholder="Votre nom*"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                      placeholder="Votre email*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                      placeholder="Partagez votre expérience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <StarRatingInput value={rating} onChange={setRating} />
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                        type="button"
                      >
                        Envoyer l'avis
                      </button>
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
