import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useCheckoutContext } from "../checkout/context/use-checkout-context";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import { Star } from "lucide-react";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CONFIG } from "src/config-global";
import { usePostProductAvis } from "src/actions/products";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useToggleWishlist } from "src/actions/wishlists";
import ProductDetailsSkeleton from "./product-details-skeleton";
import ImageCarousel from "../spa-details/comp/image-carousel";
import { TranslatedText } from "src/components/translated-text/translated-text";

export default function ProductDetailsView({
  product,
  avis = [],
  loading,
  like = false,
}) {
  const navigate = useNavigate();
  const checkout = useCheckoutContext();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");
  const [recipients, setRecipients] = useState([{ fullName: "", email: "" }]);
  const { user } = useAuthContext();
  const [isFav, setIsFav] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    setIsFav(like);
  }, [like]);

  const gallery = [
    ...(product?.image ? [product.image] : []),
    ...(Array.isArray(product?.galleries_images)
      ? product.galleries_images.filter((img) => img && img.trim() !== "")
      : []),
  ];
  const [view, setView] = useState(null);

  useEffect(() => {
    if (view === null && product) {
      setView(product?.image || "");
    }
  }, [product, view]);

  const addProductToCheckout = () => {
    if (!product) {
      toast.error("Produit non disponible.");
      return;
    }

    if (recipients.some((r) => !r.fullName || !r.email)) {
      toast.error("Veuillez remplir tous les champs pour chaque destinataire.");
      return;
    }

    const emailSet = new Set(recipients.map((r) => r.email.toLowerCase()));
    if (emailSet.size !== recipients.length) {
      toast.error(
        "Emails en double détectés. Chaque destinataire doit avoir un email unique."
      );
      return;
    }

  
    const uniqueRecipients = Array.from(
      new Map(recipients.map((r) => [r.email.toLowerCase(), r])).values()
    );

    const existingItem = checkout.items.find((item) => item.id === product.id);
    checkout.onAddToCart({
      id: product.id,
      name: product.nom,
      price: product.prix,
      image: CONFIG.serverUrl + "/storage/" + product.image,
      description: product.description,
      destinataires: recipients,
      expediteur: {},
      quantity: existingItem
        ? existingItem.destinataires.length + uniqueRecipients.length
        : uniqueRecipients.length,
    });

  
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

  const toggleFav = async () => {
    const promise = useToggleWishlist(product.id);

    toast.promise(promise, {
      pending: isFav ? "Retirer de favoris..." : "Ajouter aux favoris...",
    });

    try {
      if (!user) return;
      await promise;
      setIsFav((prev) => !prev);
    } catch (err) {

      throw err;
    }
  };

  const validateForm = () => {
    if (!name || !email) {
      toast.error("Veuillez remplir tous les champs (nom, email) !");
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
          slug: product.slug,
        }),
        {
          pending: "Envoi de votre avis...",
          success: "Avis envoyé avec succès !",
          error: "Erreur lors de l'envoi de l'avis.",
        }
      )
      .then(() => {
        setRating(0);
        setComment("");
      })
      .catch((error) => {
      });
  };

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const stars = product?.avg_rating || 0;
  const roundedRating = Math.round(stars * 2) / 2;

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 font-tahoma py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col col-span-2">
          <ImageCarousel images={gallery} height={"300px"} />
        </div>
        <div className="bg-[#f9f7ed] px-8 py-4 rounded-2xl">
          {user && (
            <div className="mb-2 w-full flex items-end justify-end">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleFav}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition font-tahoma text-xs
                    ${
                      isFav
                        ? "bg-yellow-100 border-yellow-400 text-yellow-600"
                        : "bg-gray-100 border-gray-300 text-gray-600"
                    }
                  `}
              >
                <Star
                  size={18}
                  className={`transition ${
                    isFav
                      ? "fill-yellow-500 stroke-yellow-500"
                      : "stroke-gray-500"
                  }`}
                />
                {isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
              </motion.button>
            </div>
          )}
          {}
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
              ({stars.toFixed(1)} avis){" "}
              <a href="#avis">
                <TranslatedText text="Déposer un avis" />
              </a>
            </span>
          </div>

          {!!product?.prix_barre && (
            <span className="text-sm text-gray-500 line-through">
              {product?.prix_barre}
            </span>
          )}

          <div className="font-normal text-[#958e09] text-lg font-tahoma mb-2">
            {product?.prix ? `${product.prix} €` : "Prix non disponible"}
          </div>
          {!!product?.prix_au_lieu_de && (
            <TranslatedText
              text={`Au lieu de ${product?.prix_au_lieu_de}€`}
              className="text-sm text-gray-500"
              as="span"
            />
          )}

          <div className="leading-base text-base font-light font-tahoma text-[#333]">
            {product?.description || "Aucune description disponible."}
          </div>
          {product?.conditions_utilisation && (
            <div className="leading-base text-base font-tahoma">
              {product.conditions_utilisation}
            </div>
          )}
          {}
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

      <div
        id="avis"
        className="mt-10 bg-[#f9f7ed] p-4 font-tahoma rounded-xl shadow-sm"
      >
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
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "createReview"
                ? "border-b-2 border-secondary text-secondary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("createReview")}
          >
            Créez votre avis
          </button>
        </div>

        <div className="min-h-[150px] mt-2">
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
                    <>
                      {avis.slice(0, visibleReviews).map((avis, index) => (
                        <div
                          key={index}
                          className="bg-white border border-black p-4 rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-yellow-500 flex gap-1">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <FaStar
                                  key={i}
                                  fill={
                                    i <= avis.ratings ? "#facc15" : "#f4efe5"
                                  }
                                  stroke="#facc15"
                                />
                              ))}
                            </div>
                            <p className="font-normal">- {avis.name}</p>
                          </div>
                          <p className="text-base text-gray-600">
                            {avis.comment}
                          </p>
                        </div>
                      ))}
                      {avis.length > visibleReviews && (
                        <div className="flex justify-center mt-4">
                          <button
                            onClick={handleLoadMore}
                            className="px-4 py-2 bg-gray-200 text-black text-sm rounded-md hover:bg-gray-300 transition"
                          >
                            Charger plus d'avis
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        Aucun avis pour le moment.
                      </p>
                      <p className="text-gray-600">
                        Soyez le premier à laisser votre avis sur "
                        {product?.nom || "ce produit"}" !
                      </p>
                      <p className="text-gray-600">
                        Votre adresse e-mail ne sera pas publiée. Les champs
                        obligatoires sont indiqués avec *
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "createReview" && (
              <>
                {}
                <div className="bg-white p-4 rounded-lg border border-black">
                  {user ? (
                    <>
                      <h6 className="font-semibold text-lg mb-2">
                        Laisser un avis
                      </h6>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                        placeholder="Votre nom*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!!name}
                      />
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                        placeholder="Votre email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!!name}
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
                          className="w-max px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2"
                          type="button"
                        >
                          Envoyer l'avis
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-60 flex flex-col justify-center items-center">
                        <p className="text-xl mb-2">
                          Veuillez vous connecter pour mettre un avis
                        </p>
                        <Link
                          to={paths.auth.root}
                          className="w-max px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2"
                        >
                          Connectez vous
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
