import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCarousel from "./comp/image-carousel";
import DetailsCard from "./comp/details-card";
import Services from "./comp/services";
import CarteCadeau from "./comp/carte-cadeau";
import logoSpc from "../../assets/logo-small.png";
import LocationSection from "./comp/location-section";
import TestimonialsSection from "./comp/others-section";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import ButtonIcon from "src/components/button-icon/button-icon";
import { API_URL_base } from "src/api/data";
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

export default function SpaDetailsView() {
  const { id } = useParams();
  const [spaData, setSpaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://spc.emc1001.online";
  const initialRatings = {};
  criteria.forEach((key) => {
    initialRatings[key] = 0;
  });
  const [ratings, setRatings] = useState(initialRatings);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchSpaData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/etablissements/${id}`);
        if (!response.ok) {
          throw new Error("Établissement non trouvé");
        }
        const data = await response.json();
        setSpaData({
          id: data.etablissement.id,
          nom: data.etablissement.nom,
          logo: data.etablissement.logo
            ? `${API_URL_base}storage/${data.etablissement.logo}`
            : null,
          slug: data.etablissement.slug,
          iframeUrl:
            data.etablissement.iframe_url ||
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354763.3592293863!2d4.01975!3d45.99944!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f405246498f805%3A0x7566dacf927d37de!2sDavid%20GRAND!5e0!3m2!1sen!2us!4v1745410814942!5m2!1sen!2sus",
          description: data.etablissement.description,
          gallerie: data.etablissement.gallerie || [],
          adresse: data.etablissement.adresse,
          email: data.etablissement.email,
          telephone: data.etablissement.telephone,
          horaires_ouverture: data.etablissement.horaires_ouverture,
          image_avant: data.etablissement.image_avant,
          description_avant: data.etablissement.description_avant,
          portrait_equipe: data.etablissement.portrait_equipe,
          commission: data.etablissement.commission,
          avgRating: data.etablissement.avg_rating || 4,
          types: data.types.map((type) => ({
            ...type,
            type_soin: type.type_soin || null,
            type_equipement: type.type_equipement || [],
            type_media: type.type_media || [],
            type_produit: type.type_produit || [],
          })),
          similairesEtablissement: data.simlairesEtablissment || [],
        });

        setLoading(false);
        console.log("SPA Data:", data.types);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSpaData();
  }, [id, API_URL]);

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmitReview = async () => {
    if (!name || !email || !comment) {
      toast.error(
        "Veuillez remplir tous les champs (nom, email et commentaire) !"
      );
      return;
    }

    if (!spaData || !spaData.id) {
      toast.error("Erreur : Données de l'établissement non disponibles.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer un email valide.");
      return;
    }

    if (Object.values(ratings).every((value) => value === 0)) {
      toast.error("Veuillez attribuer au moins une note.");
      return;
    }

    const reviewData = {
      id: spaData.id,
      name,
      email,
      comment,
      ratings,
    };

    try {
      const response = await fetch(`${API_URL}/api/etablissements/avis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        toast.success("Avis envoyé avec succès !");
        setRatings(initialRatings);
        setName("");
        setEmail("");
        setComment("");
      } else {
        const errorData = await response.json();
        toast.error(
          `Erreur lors de l'envoi de l'avis : ${
            errorData.error || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue.");
    }
  };

  if (loading) return ;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <ImageCarousel images={spaData.gallerie} />
        </div>
        <DetailsCard details={spaData} />
      </div>
      <Services data={spaData.types} />
      <div className="bg-white p-4 rounded-lg border max-w-6xl mx-auto mt-8">
        <h6 className="font-semibold text-lg mb-4">Laisser un avis</h6>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 font-roboto">
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
            <label className="block text-sm font-medium mb-1 font-roboto">
              Email
            </label>
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
              <label className="block text-sm font-medium mb-1 font-roboto">
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
          <label className="block text-sm font-medium mb-1 font-roboto">
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
            onClick={handleSubmitReview}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            type="button"
          >
            Envoyer l'avis
          </button>
        </div>
      </div>

      <CarteCadeau />
      <div
        style={{
          backgroundImage:
            "url(https://spa-prestige-collection.com/wp-content/uploads/2025/07/1.png)",
        }}
        className="bg-primary w-screen relative left-[calc(-50vw+50%)] mb-16 min-h-32 overflow-hidden bg-center"
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
      <TestimonialsSection testimonials={spaData.simlairesEtablissment} />
    </div>
  );
}
