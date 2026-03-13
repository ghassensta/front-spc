import React from "react";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";

export default function FiltersSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-1">
      <div className="flex justify-center items-center py-20">
        <UniversalSpinner size="lg" text="Chargement des filtres..." />
      </div>
    </div>
  );
}
