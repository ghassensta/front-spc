import React from "react";
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
export default function SpaDetailsSkeleton() {
  return (
    <div className="mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full">
          <div className="aspect-[16/9] bg-gray-200 animate-pulse rounded-lg" />
        </div>
        <div className="w-full">
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>
      <div className="mt-8">
        <div className="h-8 bg-gray-200 animate-pulse w-1/4 mb-4 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-48 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="space-y-4 max-w-6xl mx-auto mt-8">
        <div className="flex gap-4 border-b border-gray-200">
          <div className="h-6 w-24 bg-gray-200 animate-pulse" />
        </div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md space-y-2">
            <div className="h-4 bg-gray-200 animate-pulse w-32 rounded" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="h-4 w-4 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
            <div className="h-4 bg-gray-200 animate-pulse w-full rounded" />
            <div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded" />
          </div>
        ))}
        <div className="bg-white p-4 rounded-lg border mt-8 space-y-4">
          <div className="h-6 bg-gray-200 animate-pulse w-40 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {criteria.map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse w-24 rounded" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="h-5 w-5 bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="h-32 bg-gray-200 animate-pulse rounded" />
          <div className="flex justify-end">
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
      <div className="mt-8 h-48 bg-gray-200 animate-pulse rounded-lg" />
      <div className="min-h-32 h-96 bg-gray-200 animate-pulse mt-8" />
      <div className="mt-8 h-64 bg-gray-200 animate-pulse rounded-lg" />
      <div className="mt-8">
        <div className="h-8 bg-gray-200 animate-pulse w-1/4 mb-4 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-48 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
