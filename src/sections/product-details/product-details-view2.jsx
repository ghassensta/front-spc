import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageCarousel from "../spa-details/comp/image-carousel";
import ProductCarousel from "./comp/product-carousel";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import exclusive from "../../assets/exclusive.png";
import { paths } from "src/router/paths";
import { useCheckoutContext } from "../checkout/context";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import LocationSection from "./comp/location-section";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useToggleWishlist } from "src/actions/wishlists";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "src/hooks";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import { usePostProductAvis } from "src/actions/products";
import ProductDetailsSkeleton from "./product-details-skeleton";
import { CONFIG } from "src/config-global";
import Section3 from "src/sections/home2/comp/section2";

export default function ProductDetailsView({
  product,
  avis = [],
  like = false,
  etablissement,
  loading,
}) {
  console.log(etablissement);
  const gallery = [
    ...(etablissement?.image_avant ? [etablissement.image_avant] : []),
    ...(etablissement?.gallerie?.length > 0
      ? etablissement.gallerie.map((img) => img)
      : []),
  ].filter(Boolean);

  const categories = [
    "Offre exclusive",
    "Sauna",
    "Douche sensorielle",
    "Tisanerie",
  ];

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  const spaData = {
    iframeUrl: etablissement?.iframeUrl,
    nom: etablissement?.nom,
    adresse: etablissement?.avant_adresse,
    telephone: etablissement?.telephone,
    horaires_ouverture: etablissement?.horaires_ouverture,
    email: etablissement?.email,
  };
  const navigate = useNavigate();
  const checkout = useCheckoutContext();
  const { user } = useAuthContext();
  const [rating, setRating] = useState(0);

  const [name, setName] = useState(user?.name + " " + user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [isFav, setIsFav] = useState(false);
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
        console.error("Erreur lors de l'envoi de l'avis:", error);
      });
  };

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const addProductToCheckout = () => {
    if (!product) {
      toast.error("Produit non disponible.");
      return;
    }
    // Check for duplicate emails (ignore empty emails)
    const emails = recipients
      .map((r) => (r.email || "").toLowerCase())
      .filter((e) => e.trim() !== "");
    const emailSet = new Set(emails);
    if (emailSet.size !== emails.length) {
      toast.error(
        "Emails en double détectés. Chaque destinataire doit avoir un email unique."
      );
      return;
    }

    // Get unique recipients.
    // If email is empty, use an index-based key so multiple recipients
    // without emails are kept distinct.
    const uniqueRecipients = Array.from(
      new Map(
        recipients.map((r, i) => {
          const key = (r.email || "").trim() !== "" ? r.email.toLowerCase() : `__idx_${i}`;
          return [key, r];
        })
      ).values()
    );

    // Add all recipients to checkout in a single call
    const existingItem = checkout.items.find((item) => item.id === product.id);
    checkout.onAddToCart({
      id: product.id,
      name: product.nom,
      slug: product.slug,
      price: product.prix,
      image: CONFIG.serverUrl + "/storage/" + product.image,
      description: product.description,
      destinataires: recipients,
      expediteur: {},
      quantity: existingItem
        ? existingItem.destinataires.length + uniqueRecipients.length
        : uniqueRecipients.length,
    });

    // Clear repeater state after adding (preserve today as default date)
    setRecipients([
      { fullName: "", email: "", message: "", date: new Date().toISOString().slice(0, 10) },
    ]);
    navigate(paths.checkout);
  };
  const [recipients, setRecipients] = useState([
    { fullName: "", email: "", message: "", date: new Date().toISOString().slice(0, 10) },
  ]);
  const handleAddRecipient = () => {
    setRecipients([
      ...recipients,
      { fullName: "", email: "", message: "", date: new Date().toISOString().slice(0, 10) },
    ]);
  };

  const handleRemoveRecipient = (index) => {
    const newRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(
      newRecipients.length > 0
        ? newRecipients
        : [
            {
              fullName: "",
              email: "",
              message: "",
              date: new Date().toISOString().slice(0, 10),
            },
          ]
    );
  };

  const handleRecipientChange = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const stars = product?.avg_rating || 0;
  const roundedRating = Math.round(stars * 2) / 2;

  useEffect(() => {
    setIsFav(like);
  }, [like]);

  const toggleFav = async () => {
    const promise = useToggleWishlist(product.id);

    toast.promise(promise, {
      pending: isFav ? "Retirer de favoris..." : "Ajouter aux favoris...",
    });

    try {
      if (!user) {
        router.push(paths.auth.root);
        return;
      }
      await promise;
      setIsFav((prev) => !prev);
    } catch (err) {
      console.error(err);

      throw err;
    }
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const router = useRouter();

  const goToAuth = () => {
    const signInPath = paths.auth.root;
    const href = `${signInPath}?${createQueryString("returnTo", pathname)}`;
    router.replace(href);
    return;
  };
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col col-span-2 h-[300px] md:h-[600px]">
            <ImageCarousel images={gallery} height="300px" />
          </div>

          <div className="bg-[beige] px-8 py-4 col-span-2 lg:col-span-1 rounded-2xl">
            <Link
              to={paths.spa.details(etablissement?.slug)}
              className="text-4xl font-bold mb-4 text-[#333]"
            >
              {etablissement?.nom}
            </Link>

            <div className="relative">
              <ProductCarousel
                gallery={product?.galleries_images}
                image={product?.image}
              />
            </div>
            <div className="flex flex-wrap gap-3 mt-10 font-tahoma">
              {categories.map((cat) => (
                <span className="bg-[#e2dfba] px-2 py-1 text-sm rounded">
                  {cat}
                </span>
              ))}
            </div>

            {product?.remise_produit > 0 && (
              <span className="inline-block bg-[#B6B499] text-black font-bold font-roboto px-4 py-2 rounded-full text-sm mt-4">
                {product.remise_produit}% de remise
              </span>
            )}

            <h1 className="text-4xl font-bold mb-4 text-[#333] my-2">
              {product?.nom}
            </h1>

            <div className="flex font-tahoma items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  fill={
                    i <= Math.floor(roundedRating)
                      ? "#facc15"
                      : i === Math.ceil(roundedRating) &&
                        roundedRating % 1 !== 0
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
              <span className="text-sm text-gray-500 line-through font-tahoma">
                {product?.prix_barre}
              </span>
            )}

            <div className="font-normal text-[#333] text-lg font-tahoma mb-2">
              {product?.prix ? `${product.prix} €` : "Prix non disponible"}
            </div>
            {!!product?.prix_au_lieu_de && (
              <TranslatedText
                text={`Au lieu de ${product?.prix_au_lieu_de}€`}
                className="text-sm text-gray-500 font-tahoma"
                as="span"
              />
            )}

            <div className="leading-base text-base font-light font-tahoma text-[#333] my-3">
              {product?.description || "Aucune description disponible."}
            </div>

            {product?.conditions_utilisation && (
              <div className="leading-base text-base font-tahoma">
                {product.conditions_utilisation}
              </div>
            )}

            <Link
              to={paths.spa.details(etablissement?.slug)}
              className="w-max rounded-md mx-auto mt-10 px-5 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2"
            >
              <TranslatedText text="Voir l'établissement" />
            </Link>
          </div>

          <div className="bg-[beige] px-8 py-4 col-span-2 lg:col-span-1 rounded-2xl">
            {!!product?.prix_barre && (
              <span className="text-sm text-gray-500 line-through font-tahoma">
                {product?.prix_barre}
              </span>
            )}

            <div className="font-normal text-[#333] text-2xl font-tahoma mb-2">
              {product?.prix ? `${product.prix} €` : "Prix non disponible"}
            </div>
            {!!product?.prix_au_lieu_de && (
              <TranslatedText
                text={`Au lieu de ${product?.prix_au_lieu_de}€`}
                className="text-sm text-gray-500 font-tahoma"
                as="span"
              />
            )}
            {!!product?.exclusivite_spc && (
              <img
                loading="lazy"
                src={exclusive}
                alt="Exclusivité"
                className="w-auto h-auto my-2"
              />
            )}
            <div className="mt-4 font-tahoma">
              <span className="text-xl font-semibold mb-4">
                Destinataire : {recipients.length}
              </span>
              {recipients.map((recipient, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-normal">
                      Destinataire {index + 1}
                    </span>
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
                      placeholder="Email du destinataire (optionnel)"
                      value={recipient.email}
                      onChange={(e) =>
                        handleRecipientChange(index, "email", e.target.value)
                      }
                    />
                    <textarea
                      className="w-full border border-gray-300 p-2 mt-2"
                      placeholder="Votre message (optionnel)"
                      value={recipient.message || ""}
                      onChange={(e) =>
                        handleRecipientChange(index, "message", e.target.value)
                      }
                      rows={3}
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      Choisissez la date d'envoi (la carte cadeau sera envoyée
                      à 7h du matin le jour J)
                    </p>
                    <input
                      type="date"
                      className="w-full border border-gray-300 p-2 mt-1"
                      value={recipient.date || new Date().toISOString().slice(0, 10)}
                      onChange={(e) =>
                        handleRecipientChange(index, "date", e.target.value)
                      }
                    />
                    <button
                      onClick={toggleFav}
                      className="z-10  top-3 right-3 text-lg"
                    >
                      {isFav ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaHeart className="text-red-500" />
                          <span className="text-sm">
                            Retirer de votre whishliste
                          </span>{" "}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FaRegHeart className="text-red-500" />
                          <span className="text-sm">
                            Ajouter à votre whisliste
                          </span>
                        </span>
                      )}
                    </button>
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
                className="px-4 py-2 bg-gray-200 text-black text-sm rounded-full hover:bg-gray-300 transition mb-4"
              >
                Ajouter un autre destinataire
              </button>

              <div className="flex">
                <button
                  onClick={addProductToCheckout}
                  className="w-max px-5 py-3 bg-black leading-4 rounded-full text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2"
                >
                  <span>Ajouter au panier</span>
                </button>
              </div>
            </div>

            <div className="border-b border-black my-4 font-tahoma">
              <div className="py-3 gap-2">
                <FaHeart className="inline-block mr-1" />
                <TranslatedText text="Programme fidélité 1€ = 1 point : " />
                <Link to={paths.recompense}>
                  <TranslatedText text="en savoir plus" className="underline" />
                </Link>
              </div>
            </div>
            <LocationSection data={spaData} />
          </div>
        </div>

        <div
          id="avis"
          className="mt-10 bg-[beige] p-4 font-tahoma rounded-xl shadow-sm"
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
              Créer votre avis
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
                            <p className="whitespace-pre-wrap break-words text-base text-gray-600">
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
                  {/* Formulaire ajouter avis */}
                  <div className="bg-white p-4 rounded-lg border border-black">
                    {user ? (
                      <>
                        <span className="font-semibold text-lg mb-2">
                          Laisser un avis
                        </span>
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
                        <div className="flex flex-col justify-center items-center">
                          <p className="text-xl mb-4">
                            Veuillez vous connecter pour mettre un avis
                          </p>
                          <button
                            onClick={() => goToAuth()}
                            className="w-max px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2 rounded-full"
                          >
                            Connecter Vous
                          </button>
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
      <Section3 />
    </div>
  );
}
