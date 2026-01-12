import React from 'react';

export default function Testimonials() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Section - Feedback button removed */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-12 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
        
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Video Testimonials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch stories from our volunteers and partners about their journey with WISER.
          </p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Testimonial 1 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100">
            
            {/* Custom Thumbnail Wrapper */}
            <div className="relative aspect-video bg-gray-900 cursor-pointer">
              {/* The Video uses the 'poster' attribute as the thumbnail image */}
              <video 
                src="/videos/nasscom.mp4" 
                controls 
                poster="/images/1.jpg" 
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay (Only visible on hover to enhance the thumbnail feel) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/10 transition-colors duration-300">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Suresh Kumar</h3>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Mumbai</span>
              </div>
              
              <p className="text-gray-600 italic leading-relaxed border-l-4 border-red-200 pl-4">
                "Volunteering with WISER helped me connect with students and see the impact of everyday mentoring."
              </p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100">
            
            {/* Custom Thumbnail Wrapper */}
            <div className="relative aspect-video bg-gray-900 cursor-pointer">
              <video 
                src="/videos/nasscom.mp4" 
                controls 
                poster="/images/2.jpg" 
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/10 transition-colors duration-300">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Anita Rao</h3>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Pune</span>
              </div>
              
              <p className="text-gray-600 italic leading-relaxed border-l-4 border-red-200 pl-4">
                "The structured sessions and support materials made it easy to contribute meaningfully."
              </p>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}