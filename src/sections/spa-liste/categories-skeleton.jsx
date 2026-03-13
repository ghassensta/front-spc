import React from "react";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";

export default function CategoriesSkeleton() {
  return (
    <div className="flex justify-center items-center py-20">
      <UniversalSpinner size="lg" text="Chargement des catégories..." />
    </div>
  );
}
