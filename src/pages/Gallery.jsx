import React from 'react'

export default function Gallery(){
  const images = [1,2,3,4,5,6].map(n=>`/assets/gallery-${n}.jpg`)
  return (
    <div className="container py-8 sm:py-12 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {images.map((src,i)=>(
          <div key={i} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img src={src} alt={`gallery-${i + 1}`} className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-300"/>
          </div>
        ))}
      </div>
    </div>
  )
}
