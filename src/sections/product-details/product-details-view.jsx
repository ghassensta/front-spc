import React, { useEffect, useState } from "react";
// import ButtonIcon from "../../components/button-icon/button-icon";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useCheckoutContext } from "../checkout/context/use-checkout-context";
import { useParams, useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import { Star } from "lucide-react";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CONFIG } from "src/config-global";

export default function ProductDetailsView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const checkout = useCheckoutContext();

  const [product, setProduct] = useState(null);
  const [aviss, setAvis] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");

  // State for multiple recipients (repeater)
  const [recipients, setRecipients] = useState([{ fullName: "", email: "" }]);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${CONFIG.serverUrl}/api/produit/${slug}`);
        if (!res.ok) throw new Error("Produit non trouvé");
        const data = await res.json();
        setProduct(data.product);
        setAvis(data.avis || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const addProductToCheckout = () => {
    if (!product) return;

    // Check for required fields
    if (recipients.some(r => !r.fullName || !r.email)) {
      toast.error("Veuillez remplir tous les champs pour chaque destinataire.");
      return;
    }

    // Check for duplicate emails
    const emailSet = new Set(recipients.map(r => r.email.toLowerCase()));
    if (emailSet.size !== recipients.length) {
      toast.error("Emails en double détectés. Chaque destinataire doit avoir un email unique.");
      return;
    }

    // Get unique recipients
    const uniqueRecipients = Array.from(
      new Map(recipients.map(r => [r.email.toLowerCase(), r])).values()
    );

    // Add all recipients to checkout in a single call
    const existingItem = checkout.items.find(item => item.id === product.id);
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
    setRecipients(newRecipients.length > 0 ? newRecipients : [{ fullName: "", email: "" }]);
  };

  const handleRecipientChange = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const handleSubmitReview = async () => {
    if (!product || !name || !email || !comment || !rating) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newAvis = {
      type_produit_id: product.id,
      ratings: rating,
      name,
      email,
      comment,
    };

    try {
      const res = await fetch(`${CONFIG.serverUrl}/api/produit/avis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAvis),
      });

      if (res.ok) {
        const responseData = await res.json();
        // const avisAjoute = responseData.avis || responseData;
        setName("");
        setEmail("");
        setComment("");
        setRating(0);
        toast.success("Avis envoyé avec succès");
      } else {
        throw new Error("Erreur lors de l'envoi de l'avis");
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de l'envoi de l'avis.");
    }
  };

  const stars = product?.avg_rating || 0;
  const roundedRating = Math.round(stars * 2) / 2;

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <ToastContainer />
      <h4 className="font-semibold text-4xl mb-4">
        {product ? product.nom : "Chargement..."}
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {product?.image && (
          <img
            className="rounded-lg"
            src={`${CONFIG.serverUrl}/storage/${product.image}`}
            alt={product.nom}
          />
        )}
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

          <div className="font-bold text-secondary text-3xl font-tahoma mb-2">
            {product?.prix} €
          </div>

          <div className="leading-base text-base font-tahoma">
            {product?.description || "Aucune description disponible."}
          </div>
        </div>
      </div>

      {/* Repeater for multiple recipients */}
      <div className="mt-6">
        <h5 className="text-2xl font-semibold mb-4">Ajouter des destinataires pour les cartes cadeaux</h5>
        {recipients.map((recipient, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md mb-4">
            <h6 className="text-lg font-semibold mb-2">Destinataire {index + 1}</h6>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nom et prénom"
                value={recipient.fullName}
                onChange={(e) => handleRecipientChange(index, "fullName", e.target.value)}
              />
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Email du destinataire"
                value={recipient.email}
                onChange={(e) => handleRecipientChange(index, "email", e.target.value)}
              />
              <div className="flex items-center gap-2">
                <span>Quantité :</span>
                <input
                  type="number"
                  className="w-16 border border-gray-300 rounded-lg p-2"
                  value={1}
                  disabled
                />
              </div>
            </div>
            {recipients.length > 1 && (
              <button
                onClick={() => handleRemoveRecipient(index)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Supprimer ce destinataire
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddRecipient}
          className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition mb-4"
        >
          Ajouter un autre destinataire
        </button>

        <div className="flex justify-end">
          <button
            onClick={addProductToCheckout}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            <span>Offrir</span>
          </button>
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
                  {aviss.length > 0 ? (
                    aviss.map((avis, index) => (
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
                    <p className="text-gray-600">Aucun avis pour le moment.</p>
                  )}

                  {/* Formulaire ajouter avis */}
                  <div className="bg-white p-4 rounded-lg border">
                    <h6 className="font-semibold text-lg mb-2">
                      Laisser un avis
                    </h6>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                      placeholder="Votre nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                      placeholder="Votre email"
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
                        onClick={handleSubmitReview}
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