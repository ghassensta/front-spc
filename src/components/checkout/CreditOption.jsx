// src/components/checkout/CreditOption.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { Check, AlertCircle } from "lucide-react";

const CreditOption = ({
  credits = [],
  totalTTC = 0,
  onValueChange,
  title = "Utiliser mes crédits",
  theme = "normal",        // "parrainage" → violet, sinon beige
  forceSingleUse = false,
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const prevCreditsRef = useRef([]);

  // Crédits valides
  const availableCredits = useMemo(() => {
    return credits.filter(
      (c) =>
        !c.utilise &&
        (c.date_expiration === null || new Date(c.date_expiration) >= new Date())
    );
  }, [credits]);

  // Montant sélectionné
  const totalSelected = useMemo(() => {
    return availableCredits
      .filter((c) => selectedIds.has(c.id))
      .reduce((sum, c) => sum + Number(c.montant), 0);
  }, [availableCredits, selectedIds]);

  const depassement = totalSelected > totalTTC;

  // Toggle
  const toggleCredit = (credit) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(credit.id)) {
        next.delete(credit.id);
      } else {
        if (forceSingleUse) next.clear();
        const futurTotal = forceSingleUse ? credit.montant : totalSelected + credit.montant;
        if (futurTotal > totalTTC) return prev;
        next.add(credit.id);
      }
      return next;
    });
  };

  // Envoi au parent (seulement quand les valeurs changent vraiment)
  const prevValuesRef = useRef({ total: 0, ids: [] });
  useEffect(() => {
    const currentIds = Array.from(selectedIds);
    if (
      totalSelected !== prevValuesRef.current.total ||
      JSON.stringify(currentIds) !== JSON.stringify(prevValuesRef.current.ids)
    ) {
      prevValuesRef.current = { total: totalSelected, ids: currentIds };
      onValueChange?.(totalSelected, currentIds);
    }
  }, [totalSelected, selectedIds, onValueChange]);

  // Reset uniquement si les crédits changent vraiment (évite la boucle)
  useEffect(() => {
    const prev = prevCreditsRef.current;
    const current = availableCredits.map((c) => c.id).sort().join(",");
    const previous = prev.map((c) => c.id).sort().join(",");

    if (current !== previous) {
      prevCreditsRef.current = availableCredits;
      // Ne reset que si un crédit sélectionné a disparu
      setSelectedIds((prevSet) => {
        const valid = new Set(availableCredits.map((c) => c.id));
        const newSet = new Set([...prevSet].filter((id) => valid.has(id)));
        return newSet.size !== prevSet.size ? newSet : prevSet;
      });
    }
  }, [availableCredits]);

  if (availableCredits.length === 0) return null;

  const isParrainage = theme === "parrainage";
  const accentColor = isParrainage
    ? "bg-purple-600 ring-purple-500"
    : "bg-[#B6B499] ring-[#B6B499]";

  return (
    <div className="bg-white rounded-md p-6 shadow border border-gray-200 space-y-5">
      <h3 className="text-base font-semibold text-gray-800">
        {title}
        <span className="text-sm font-normal text-gray-500 ml-3">
          ({availableCredits.length} disponible{availableCredits.length > 1 ? "s" : ""})
        </span>
      </h3>

      {depassement && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-md border border-red-200">
          <AlertCircle size={16} />
          <span>Les crédits sélectionnés dépassent le total de la commande.</span>
        </div>
      )}

      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5">
        {availableCredits.map((credit) => {
          const isSelected = selectedIds.has(credit.id);
          const seraitDepasse = !isSelected && totalSelected + Number(credit.montant) > totalTTC;

          return (
            <button
              key={credit.id}
              onClick={() => toggleCredit(credit)}
              disabled={!isSelected && seraitDepasse}
              className={`
                relative rounded-md overflow-hidden transition-all duration-200 transform
                ${isSelected
                  ? `${accentColor} text-white shadow-md ring-2 ${accentColor.split(" ")[1]}/40 scale-105`
                  : seraitDepasse
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-800 shadow-sm hover:shadow border border-gray-200"
                }
              `}
            >
              <div className="py-3 px-1.5 text-center">
                <div className="text-xl font-bold leading-none">
                  {credit.montant.toFixed(0)} €
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-0.5 right-0.5 bg-white/40 rounded-full p-0.5">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedIds.size > 0 && (
        <div className={`rounded-md p-4 border ${depassement ? "bg-red-50 border-red-200" : "bg-[#B6B499]/5 border-[#B6B499]/20"}`}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              {selectedIds.size} crédit{selectedIds.size > 1 && !forceSingleUse ? "s" : ""} appliqué{selectedIds.size > 1 && !forceSingleUse ? "s" : ""}
            </span>
            <span className={`text-xl font-bold ${depassement ? "text-red-600" : isParrainage ? "text-purple-600" : "text-[#B6B499]"}`}>
              - {totalSelected.toFixed(2)} €
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {depassement ? "Dépassement → désélectionnez un crédit" : "Déduit automatiquement"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreditOption;