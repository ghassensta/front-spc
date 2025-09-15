import React, { useState } from "react";

export default function FedilitePageView() {
  const [points, setPoints] = useState(320); // confirmed points
  const [pendingPoints] = useState(80); // pending
  const conversionRates = [
    { points: 250, value: 10 },
    { points: 500, value: 15 },
    { points: 750, value: 20 },
    { points: 1000, value: 25 },
  ];

  const nextReward = conversionRates.find(r => r.points > points);
  const progressPercent = nextReward
    ? (points / nextReward.points) * 100
    : 100;

  const handleRedeem = (rate) => {
    if (points >= rate.points) {
      alert(`✅ You redeemed ${rate.points} points for ${rate.value}€`);
      setPoints(points - rate.points);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span role="img" aria-label="gift">🎁</span>
          Programme de Fidélité
        </h2>
        <p className="text-gray-600">
          Gagnez des points et recevez des bons d'achat !
        </p>
      </div>

      {/* Rules */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
        <p className="flex items-center gap-2 text-green-600">
          ✔️ 1 point pour chaque euro dépensé
        </p>
        <p className="flex items-center gap-2 text-green-600">
          ✔️ Les points sont visibles immédiatement après chaque transaction
        </p>
        <p className="font-medium">
          250 pts = 10€ , 500 = 15€ , 750 = 20€ , 1000 = 25€
        </p>
      </div>

      {/* Balance & Progress */}
      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-semibold">Votre solde</h3>
          <p className="text-lg font-bold">{points} points</p>
          <p className="text-gray-500">+ {pendingPoints} points en attente</p>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Progrès vers le prochain bon</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {nextReward && (
            <p className="text-sm text-gray-500 mt-1">
              Encore {nextReward.points - points} points pour le bon de {nextReward.value}€
            </p>
          )}
        </div>
      </div>

      {/* Redeem */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Échanger vos points :</h3>
        <div className="flex flex-wrap gap-3">
          {conversionRates.map((rate) => (
            <button
              key={rate.points}
              onClick={() => handleRedeem(rate)}
              disabled={points < rate.points}
              className={`px-4 py-2 rounded-lg border font-medium ${
                points >= rate.points
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {rate.value}€ — {rate.points} pts
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
