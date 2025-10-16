import React from "react";

export default function FiltersSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-1">
      {/* Filters Skeleton */}
      <div className="grid grid-cols-3 gap-4 font-roboto mb-16">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-10 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[3/2] bg-gray-200 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 animate-pulse w-3/4 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 bg-gray-200 animate-pulse w-5/6 rounded" />
              <div className="h-4 bg-gray-200 animate-pulse w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
