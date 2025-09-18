import React, { useState } from "react";
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

export default function SpaDetailsView({
  spaData,
  types,
  simlairesEtablissment,
  avis,
}) {
  const initialRatings = {};
  criteria.forEach((key) => {
    initialRatings[key] = 0;
  });
  // const avis = spaData?.avis || [];

  const [ratings, setRatings] = useState(initialRatings);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const validateForm = () => {
    if (!name || !email || !comment) {
      toast.error(
        "Veuillez remplir tous les champs (nom, email et commentaire) !"
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
        setName("");
        setEmail("");
        setComment("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'avis:", error);
      });
  };

  return (
    <div className="mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full ">
          <ImageCarousel images={spaData?.gallerie} />
        </div>
        <div className="w-full">
          <DetailsCard details={spaData} avisTotals={avis.length} />
        </div>
      </div>
      <Services data={types} />
      <div className="space-y-4 max-w-6xl mx-auto font-roboto">
        <div className="flex gap-4 border-b border-gray-200">
          <span className="font-semibold uppercase">Les avis</span>
        </div>
        {avis.length > 0 ? (
          avis.map((avis, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <p className="font-semibold">{avis.name}</p>
              <div className="text-yellow-500 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    fill={i <= avis.average_rating ? "#facc15" : "none"}
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
        <div className="bg-white p-4 rounded-lg border mt-8 ">
          <h6 className="font-semibold text-lg mb-4">Laisser un avis</h6>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 ">
                Nom et prénom
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Votre nom et prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 ">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

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

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 ">
              Commentaire
            </label>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows="4"
              placeholder="Votre commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={(e) => handleSubmit(e)}
              className="w-max px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2"
            >
              envoyer l'avis
            </button>
          </div>
        </div>
      </div>
      <CarteCadeau />
      <div
        style={{
          backgroundImage:
            "url(https://spa-prestige-collection.com/wp-content/uploads/2025/07/1.png)",
        }}
        className="bg-primary w-screen relative left-[calc(-50vw+50%)] mb-8 min-h-32 overflow-hidden bg-center"
      >
        <div className="flex flex-col items-center p-12 text-center bg-slate-300/80 w-[60%] my-36 mx-auto">
          <img
            src={logoSpc}
            alt="Logo Spa & Prestige Collection"
            className="w-36 mb-4"
          />
          <h3 className="text-4xl font-bold mb-4">
            – Le conseil Spa & Prestige Collection –
          </h3>
          <p className="text-lg font-normal font-tahoma">
            {spaData?.nom || "Cet établissement"} incarne à merveille
            l’équilibre entre raffinement, nature et quiétude. Nous vous
            recommandons d’y vivre une parenthèse de détente à deux, en
            conjuguant un soin bien-être personnalisé avec une expérience
            unique, pour savourer pleinement l’essence du bien-être dans un
            cadre inspirant.
          </p>
        </div>
      </div>
      <LocationSection data={spaData} />
      <TestimonialsSection testimonials={simlairesEtablissment} />
    </div>
  );
}
