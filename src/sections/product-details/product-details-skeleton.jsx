import React from "react";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";

export default function ProductDetailsSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <UniversalSpinner size="lg" text="Chargement des détails du produit..." />
    </div>
  );
}
