import React from "react";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";

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
          className="
            px-10 py-4 bg-black text-white font-medium rounded-full
            transition-all duration-300 shadow-md
            hover:bg-gray-800 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
          "
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