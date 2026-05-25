import React from "react";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

/* CTA Principal — pagination "Charger plus" (même forme + hover doré que le système) */
export default function LoadMoreButton({
  hasMore,
  loading,
  onLoadMore,
  label = "Charger plus d'offres",
  finishedText = "Toutes les offres ont été chargées",
}) {
  return (
    <div className="text-center mt-12 mb-8">
      {hasMore ? (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="inline-flex items-center gap-2 uppercase tracking-widest rounded-full px-6 py-3 text-sm font-normal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          style={{ backgroundColor: "#1a1a1a", color: "#ffffff", fontFamily: FONT }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <UniversalSpinner size="sm" />
              Chargement...
            </span>
          ) : (
            label
          )}
        </button>
      ) : (
        <p className="text-gray-500 text-lg font-medium">
          {finishedText}
        </p>
      )}
    </div>
  );
}