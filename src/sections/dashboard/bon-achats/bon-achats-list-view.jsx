import React, { useState, useMemo } from "react";
import { useGetBonAchats } from "src/actions/bonachats";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

export default function BonAchatsListView() {
  const { bonachats, loading, validating } = useGetBonAchats();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { t } = useTranslation();

  // Pagination
  const totalPages = Math.ceil((bonachats?.length || 0) / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return bonachats?.slice(start, start + itemsPerPage);
  }, [bonachats, currentPage, itemsPerPage]);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const formatDateFR = (dateStr) => {
    if (!dateStr) return "—";

    const [day, month, yearAndTime] = dateStr.split("/");
    const [year, time] = yearAndTime.split(" "); // année et heure
    const isoString = `${year}-${month}-${day}T${time}:00`; // ISO 8601
    return new Date(isoString).toLocaleDateString("fr-FR");
  };

  if (loading || validating) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-300">
              <tr>
                <th><TranslatedText text="Montant" /></th>
                <th><TranslatedText text="Source" /></th>
                <th><TranslatedText text="Description" /></th>
                <th><TranslatedText text="Statut" /></th>
              </tr>
            </thead>
            <tbody className="text-center text-sm">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b-2 py-2">
                  {[...Array(4)].map((__, i) => (
                    <td key={i}>
                      <div className="h-4 bg-gray-200 animate-pulse w-24 mx-auto rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <p className="text-sm text-gray-600">
          Page {currentPage} sur {totalPages || 1}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-600 whitespace-nowrap">
            <TranslatedText text="Lignes par page" /> :
          </label>
          <select
            id="itemsPerPage"
            className="border rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="table w-full min-w-[640px]">
              <thead className="bg-gray-300">
                <tr>
                  <th className="whitespace-nowrap"><TranslatedText text="Montant" /></th>
                  <th className="whitespace-nowrap"><TranslatedText text="Source" /></th>
                  <th className="whitespace-nowrap"><TranslatedText text="Description" /></th>
                  <th className="whitespace-nowrap"><TranslatedText text="Statut" /></th>
                  <th className="whitespace-nowrap"><TranslatedText text="Utilisé le" /></th>
                </tr>
              </thead>

              <tbody className="text-center text-secondary text-sm">
                {!bonachats?.length && (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex flex-col items-center">
                        <p className="py-2"><TranslatedText text="Vous n'avez pas de bons d'achat" /></p>
                      </div>
                    </td>
                  </tr>
                )}

                {currentData?.map((bon) => {
                  const sourceLabel =
                    bon.source === 0
                      ? t("Parrainage")
                      : bon.source === 1
                      ? t("Fidélité")
                      : bon.source;

                  const typeLabel =
                    bon.type === "points"
                      ? `${bon.montant} ${t("points")}`
                      : `${bon.montant} €`;

                  const statusClass = bon.used ? "text-red-600" : "text-green-600";
                  const statusLabel = bon.used ? t("Utilisé") : t("Disponible");

                  const usedDate = formatDateFR(bon.used_at);

                  return (
                    <tr key={bon.id} className="border-b-2 py-2">
                      <td className="whitespace-nowrap">{typeLabel}</td>
                      <td className="whitespace-nowrap">{sourceLabel}</td>
                      <td className="text-left max-w-xs truncate px-2">
                        {bon.description}
                      </td>
                      <td className={`${statusClass} whitespace-nowrap`}>{statusLabel}</td>
                      <td className="whitespace-nowrap">{usedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <TranslatedText text="Précédent" />
          </button>
          <span className="text-sm text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <TranslatedText text="Suivant" />
          </button>
        </div>
      )}
    </div>
  );
}
