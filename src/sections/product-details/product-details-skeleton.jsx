import React from "react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="flex flex-col col-span-2">
          <div className="h-[300px] bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {}
        <div className="bg-[#f9f7ed] px-8 py-4 col-span-2 lg:col-span-1 rounded-2xl">
          <div className="h-9 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="relative">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-9 w-1/2 bg-gray-200 rounded mt-2 mb-4 animate-pulse" />
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            ))}
            <div className="h-4 w-20 bg-gray-200 rounded ml-2 animate-pulse" />
          </div>
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="space-y-2 my-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded mx-auto mt-10 animate-pulse" />
        </div>

        {}
        <div className="bg-[#f9f7ed] px-8 py-4 col-span-2 lg:col-span-1 rounded-2xl">
          <div className="h-6 w-10 bg-gray-200 rounded my-2 animate-pulse" />
          <div className="mt-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="h-10 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="border-b border-black my-4" />
          {}
          <div className="space-y-4">
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {}
      <div className="mt-10 bg-[#f9f7ed] p-4 rounded-xl shadow-sm">
        <div className="flex gap-4 border-b border-gray-200">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="mt-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-black p-4 rounded-md">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-4 w-full bg-gray-200 rounded mt-2 animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
