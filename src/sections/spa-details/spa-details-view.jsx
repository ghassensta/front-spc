import React, { useEffect, useState, memo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCarousel from "./comp/image-carousel";
import DetailsCard from "./comp/details-card";
import Services from "./comp/services";
import CarteCadeau from "./comp/carte-cadeau";
import logoSpc from "../../assets/logo-small.png";
import LocationSection from "./comp/location-section";
import TestimonialsSection from "./comp/others-section";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import { CONFIG } from "src/config-global";
import { usePostEtablissementsAvis } from "src/actions/etablissements";
import { FaStar } from "react-icons/fa";
import SpaDetailsSkeleton from "./spa-details-skeleton";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { motion, AnimatePresence } from "framer-motion";

const criteria = [
  "Practicien(ne)",
  "Accueil",
  "Vestiaires",
  "Cabine",
  "Soin",
  "Détente",
  "Équipements",
  "Boutique",
];

const initialRatings = {};
criteria.forEach((key) => {
  initialRatings[key] = 0;
});

function SpaDetailsView({
  spaData,
  types,
  simlairesEtablissment,
  avis,
  marquesPartenaires,
  loading,
}) {
  const { user } = useAuthContext();
  const [ratings, setRatings] = useState(initialRatings);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");
  const [visibleReviews, setVisibleReviews] = useState(5);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
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
        usePostEtablissementsAvis({
          name,
          email,
          comment,
          ratings,
          id: spaData.id,
        }),
        {
          pending: "Envoi de votre avis...",
          success: "Avis envoyé avec succès !",
          error: "Erreur lors de l'envoi de l'avis.",
        }
      )
      .then(() => {
        setRatings(initialRatings);
        setComment("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'avis:", error);
      });
  };

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  if (loading) {
    return <SpaDetailsSkeleton />;
  }

  return (
    <div className="mx-auto xl:px-4 md:py-12 py-6">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-3/5 h-[300px] md:h-[600px] rounded-md">
          <ImageCarousel images={spaData?.gallerie} />
        </div>
        <div className="w-full md:w-2/5">
          <DetailsCard
            details={spaData}
            avisTotals={avis.length}
            marquesPartenaires={marquesPartenaires}
          />
        </div>
      </div>
      <Services data={types} />

      <div id="avis" className="mt-10 rounded-xl max-w-7xl mx-auto bg-[#f9f7ed] p-4 font-tahoma shadow-sm">
        <div className="flex gap-4 border-b border-gray-200 ">
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
                                  fill={i <= avis.average_rating ? "#facc15" : "#f4efe5"}
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
                            className="w-auto mx-auto mt-4 px-4 py-3 bg-transparent leading-4 text-black border border-black uppercase font-normal text-xs tracking-[3px] hover:bg-black hover:text-white transition font-tahoma flex items-center justify-center gap-2"
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
                        {spaData?.nom || "ce produit"}" !
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {criteria.map((criterion) => (
                          <div key={criterion}>
                            <label className="block text-sm font-medium mb-1 ">
                              {criterion}
                            </label>
                            <StarRatingInput
                              value={ratings[criterion]}
                              onChange={(value) => handleRatingChange(criterion, value)}
                            />
                          </div>
                        ))}
                      </div>
                      <textarea
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                        placeholder="Partagez votre expérience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
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
                        <p className="text-xl mb-2">Veuillez vous connecter pour mettre un avis</p>
                        <Link to={paths.auth.root} className="w-max rounded-full px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2">
                          Connecter Vous
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

      <CarteCadeau />
      <div
        style={{
          backgroundImage: `url('${CONFIG.serverUrl}/storage/${spaData?.image_conseil}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="bg-white w-screen relative left-[calc(-50vw+50%)] mb-8 py-24 overflow-hidden bg-center"
      >
        <div className="flex flex-col items-center p-5 pb-4 pt-10 text-center bg-white/80 mx-[4%] md:mx-[20%]">
          <img
            loading="lazy"
            src={logoSpc}
            alt="Logo Spa & Prestige Collection"
            className="w-36 mb-4"
          />
          <span className="text-3xl font-bold mb-4">
            – Le conseil Spa & Prestige Collection –
          </span>
          <p className="text-lg font-normal font-tahoma">
            {spaData?.text_conseil}
          </p>
        </div>
      </div>
      <LocationSection data={spaData} />
      <TestimonialsSection testimonials={simlairesEtablissment} />
      <div className="flex items-center justify-center gap-2">
        <Link to={paths.spa.list} className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white">
          Nos établissements
        </Link>
        <Link to={paths.main} className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white">
          Accueil
        </Link>
      </div>
    </div>
  );
}

export default memo(SpaDetailsView);