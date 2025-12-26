import React from 'react'

export default function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-[#FBF6EC] shadow rounded overflow-hidden flex flex-col font-roboto animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-4 flex flex-col flex-1">
                <div className="h-6 bg-gray-200 mb-6 w-3/4" />
                <div className="h-4 bg-gray-200 mb-2" />
                <div className="h-4 bg-gray-200 mb-2" />
                <div className="h-4 bg-gray-200 w-1/2" />
                <div className="mt-4 h-8 bg-gray-200 w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {}
        <div>
          <div className="mb-6">
            <div className="w-full h-10 bg-gray-200 rounded" />
          </div>
          <div className="h-8 bg-gray-200 mb-4 w-1/2" />
          <ul className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <li key={i} className="h-4 bg-gray-200 w-full" />
            ))}
          </ul>
        </div>
      </div>
  )
}
