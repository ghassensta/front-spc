import React from "react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 font-tahoma">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="aspect-[4/3] bg-gray-200 animate-pulse rounded-lg" />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
        <div className="bg-white px-8 rounded-2xl">
          <div className="mb-2 w-full flex items-end justify-end">
            <div className="h-8 w-40 bg-gray-200 animate-pulse rounded-lg" />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-6 px-3 bg-gray-200 animate-pulse rounded-ss-xl rounded-ee-xl"
              />
            ))}
          </div>
          <div className="h-10 bg-gray-200 animate-pulse w-3/4 mb-4 rounded" />
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-5 w-5 bg-gray-200 animate-pulse rounded"
              />
            ))}
            <div className="h-4 bg-gray-200 animate-pulse w-10 ml-2 rounded" />
          </div>
          <div className="h-6 bg-gray-200 animate-pulse w-24 mb-2 rounded" />
          <div className="space-y-2 mb-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-200 animate-pulse w-full rounded"
              />
            ))}
            <div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded" />
          </div>
          <div className="mt-6">
            <div className="h-6 bg-gray-200 animate-pulse w-64 mb-4 rounded" />
            <div className="space-y-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 animate-pulse w-32 rounded" />
                <div className="h-4 bg-gray-200 animate-pulse w-24 rounded" />
              </div>
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
              <div className="flex items-center gap-2 text-xs">
                <div className="h-4 bg-gray-200 animate-pulse w-16 rounded" />
                <div className="h-10 w-16 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
            <div className="h-8 bg-gray-200 animate-pulse w-48 rounded-md mb-4" />
            <div className="flex justify-end">
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-3 rounded-xl shadow-sm">
        <div className="flex gap-4 border-b border-gray-200">
          <div className="px-4 py-2 h-8 w-20 bg-gray-200 animate-pulse" />
        </div>
        <div className="mt-6 space-y-4 min-h-[150px]">
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
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
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse w-full rounded" />
              <div className="h-4 bg-gray-200 animate-pulse w-full rounded" />
              <div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border space-y-4">
            <div className="h-6 bg-gray-200 animate-pulse w-40 rounded" />
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
            <div className="h-32 bg-gray-200 animate-pulse rounded" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-6 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
            <div className="flex justify-end mt-3">
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
