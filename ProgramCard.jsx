import React from 'react'

export default function ProgramCard({ p }) {
  return (
    <article className="border rounded overflow-visible shadow-sm hover:shadow-md transition-shadow md:flex md:items-stretch">
      {p.image && (
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-48 sm:h-56 object-cover md:h-auto md:w-48"
        />
      )}

      <div className="p-4 sm:p-6 flex-1">
        <h4 className="font-semibold text-base sm:text-lg">{p.title}</h4>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">{p.excerpt}</p>
        <p className="text-xs sm:text-sm text-gray-700 mt-3 leading-relaxed">{p.details}</p>
      </div>
    </article>
  )
}
