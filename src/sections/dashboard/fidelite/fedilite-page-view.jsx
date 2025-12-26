import React, { useState, useMemo } from "react";
import { useGetPointsFidelite, useExchangePoints } from "src/actions/fidelite";
import { mutate } from "swr";
import { endpoints } from "src/utils/axios";
import { toast } from "react-toastify";
import ModalConfirme from "src/components/fidelite-modal/ModalConfirme";
import Lottie from "lottie-react";
import confettiAnimation from "src/animations/Confetti.json"; 
import { GiFClef } from "react-icons/gi";
import { Gift } from "lucide-react";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

export default function FidelitePageView() {
  const { points: pointsData, loading } = useGetPointsFidelite();
  const [isExchanging, setIsExchanging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { t } = useTranslation();

  const points = useMemo(() => pointsData?.solde || 0, [pointsData]);
  const pendingPoints = useMemo(
    () => pointsData?.en_attente || 0,
    [pointsData]
  );

  const conversionRates = useMemo(
    () =>
      Object.entries(pointsData?.paliers || {}).map(([ptsStr, value]) => ({
        points: parseInt(ptsStr),
        value,
      })),
    [pointsData]
  );

  const progressPercent = pointsData?.progression_percent || 0;
  const progressMessage = pointsData?.message || "";

  const handleRedeemClick = (rate) => {
    setSelectedRate(rate);
    setModalOpen(true);
  };

  const handleConfirmRedeem = async () => {
    if (!selectedRate) return;

    try {
      setIsExchanging(true);
      setModalOpen(false);
      const res = await useExchangePoints(selectedRate.value);
      await mutate(endpoints.fidelite.get);

      // Affiche animation Lottie confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      toast.success(
        res.message || t(`Vous avez reçu un bon de ${selectedRate.value}€ !`),
        {
          autoClose: 8000, 
        }
      );

      setSelectedRate(null);
    } catch (error) {
      const errMsg =
        typeof error === "string"
          ? error
          : error?.message || t("Erreur lors de l'échange de points.");
      toast.error(errMsg);
    } finally {
      setIsExchanging(false);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedRate(null);
  };

  if (loading) return <p><TranslatedText text="Chargement des points..." /></p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 relative">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span role="img" aria-label="gift">
            <Gift />
          </span>
          <TranslatedText text="Programme de Fidélité" />
        </h2>
        <p className="text-gray-600">
          <TranslatedText text="Gagnez des points et recevez des bons d'achat !" />
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
        <p className="flex items-center gap-2 ">
          <TranslatedText text="1 point pour chaque euro dépensé" />
        </p>
        <p className="flex items-center gap-2 ">
          <TranslatedText text="Les points sont visibles immédiatement après chaque transaction" />
        </p>
        <p className="font-medium">
          <TranslatedText text="250 pts = 10€ , 500 = 15€ , 750 = 20€ , 1000 = 25€" />
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-semibold"><TranslatedText text="Votre solde" /></h3>
          <p className="text-lg font-bold">{points} <TranslatedText text="points" /></p>
          <p className="text-gray-500">+ {pendingPoints} <TranslatedText text="points en attente" /></p>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1"><TranslatedText text="Progrès vers le prochain bon" /></h3>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">{progressMessage}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3"><TranslatedText text="Échanger vos points :" /></h3>
        <div className="flex flex-wrap gap-3">
          {conversionRates.map((rate) => (
            <button
              key={rate.points}
              onClick={() => handleRedeemClick(rate)}
              disabled={points < rate.points || isExchanging}
              className={`px-4 py-2 rounded-lg border font-medium ${
                points >= rate.points
                  ? "bg-[#b6b499] text-white hover:bg-[#b6b499]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {rate.value}€ — {rate.points} pts
            </button>
          ))}
        </div>
      </div>

      <ModalConfirme
        isOpen={modalOpen}
        title={t("Confirmer l'échange")}
        message={t(`Voulez-vous échanger ${selectedRate?.points} points pour ${selectedRate?.value}€ ?`)}
        onConfirm={handleConfirmRedeem}
        onCancel={handleCancel}
        confirmText={t("Échanger")}
      />

      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            style={{ width: 800, height: 800 }}
          />
        </div>
      )}
    </div>
  );
}
