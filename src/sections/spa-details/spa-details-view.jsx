import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "./comp/image-carousel";
import DetailsCard from "./comp/details-card";
import Services from "./comp/services";
import CarteCadeau from "./comp/carte-cadeau";
import logoSpc from "../../assets/logo-small.png";
import LocationSection from "./comp/location-section";
import TestimonialsSection from "./comp/others-section";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import ButtonIcon from "src/components/button-icon/button-icon";

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
  const { id } = useParams(); // Récupère le slug ou l'ID depuis l'URL
  const [spaData, setSpaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "http://127.0.0.1:8000";

  const initialRatings = {};
  criteria.forEach((key) => {
    initialRatings[key] = 0;
  });
  const [ratings, setRatings] = useState(initialRatings);

  // Récupération des données de l'établissement
  useEffect(() => {
    const fetchSpaData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/etablissements/${id}`);
        if (!response.ok) {
          throw new Error("Établissement non trouvé");
        }
        const data = await response.json();
        console.log("Spa data:", data);
        setSpaData({
          nom: data.nom,
          logo: data.logo ? `${API_URL}/storage/${data.logo}` : null,
          slug: data.slug,
          description: data.description,
          gallerie: data.gallerie || [],
          adresse: data.adresse,
          email: data.email,
          telephone: data.telephone,
          horaires_ouverture: data.horaires_ouverture,
          image_avant: data.image_avant,
          description_avant: data.description_avant,
          portrait_equipe: data.portrait_equipe,
          commission: data.commission,
          avgRating: data.avg_rating || 4,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSpaData();
  }, [id, API_URL]);

  // Gestion des changements de note
  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  // Soumission des évaluations
  const handleSubmitReview = async () => {
    try {
      const response = await fetch(`${API_URL}/api/etablissements/${id}/avis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratings),
      });
      if (response.ok) {
        alert("Avis envoyé avec succès !");
        setRatings(initialRatings); // Réinitialiser les notes
      } else {
        alert("Erreur lors de l'envoi de l'avis.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <ImageCarousel images={spaData.gallerie} />
        </div>
        <DetailsCard details={spaData} />
      </div>
      <Services />
      <div className="bg-white p-4 rounded-lg border max-w-6xl mx-auto mt-8">
        <h6 className="font-semibold text-lg mb-4">Laisser un avis</h6>
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
        <div className="flex justify-end">
          <ButtonIcon title="Envoyer l'avis" onClick={handleSubmitReview} />
        </div>
      </div>
      <CarteCadeau />
      <div
        style={{
          backgroundImage:
            "ur[](https://spa-prestige-collection.com/wp-content/uploads/2025/07/1.png)",
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
            {spaData?.name || "Cet établissement"} incarne à merveille
            l’équilibre entre raffinement, nature et quiétude. Nous vous
            recommandons d’y vivre une parenthèse de détente à deux, en
            conjuguant un soin bien-être personnalisé avec une expérience
            unique, pour savourer pleinement l’essence du bien-être dans un
            cadre inspirant.
          </p>
        </div>
      </div>
      <LocationSection />
      <TestimonialsSection />
    </div>
  );
}
