import React, { useState, useEffect } from 'react';

export default function Gallery() {
  // State to track which gallery is active
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // --- ADD YOUR IMAGES HERE ---
  // This is where you manually type your image paths for each category.
  const galleryData = {
    all: {
      label: 'All Photos',
      description: 'Capturing moments of change, compassion, and community impact.',
      images: [
        // Paste images here for "All Photos"
        '/images/9.jpg', 
        '/images/10.jpg', 
        '/images/11.jpg', 
        '/images/12.jpg',
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg', 
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg',
        '/images/16.jpg'
      ]
    },
    events: {
      label: 'Events',
      description: 'Photos from our various community and fundraising events.',
      images: [
        // I added your requested images here
        '/images/9.jpg', 
        '/images/10.jpg', 
        '/images/11.jpg', 
        '/images/12.jpg',
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg', 
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg',
        '/images/16.jpg'
      ]
    },
    csr: {
      label: 'CSR',
      description: 'Corporate volunteering initiatives and partnership drives.',
      images: [
        // Add your CSR images here
        '/images/9.jpg', 
        '/images/10.jpg', 
        '/images/11.jpg', 
        '/images/12.jpg',
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg', 
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg',
        '/images/16.jpg'
      ]
    },
    teaching: {
      label: 'Teaching',
      description: 'Moments from our teaching and mentoring sessions.',
      images: [
        // Add your Teaching images here
        '/images/9.jpg', 
        '/images/10.jpg', 
        '/images/11.jpg', 
        '/images/12.jpg',
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg', 
        '/images/13.jpg', 
        '/images/14.jpg', 
        '/images/15.jpg',
        '/images/16.jpg'
      ]
    }
  };

  const openModal = (src) => {
    setSelectedImage(src);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Handle Button Clicks
  const handleFilterClick = (category) => {
    setActiveCategory(category);
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-12 px-4 text-center overflow-hidden transition-all duration-500">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            {galleryData[activeCategory].label} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {galleryData[activeCategory].description}
          </p>
        </div>
      </section>

      {/* 2. Filter/Navigation Buttons */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(galleryData).map((key) => {
            const isActive = activeCategory === key;
            const category = galleryData[key];
            return (
              <button 
                key={key}
                onClick={() => handleFilterClick(key)}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 border ${
                  isActive 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-900 hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* 3. Image Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {galleryData[activeCategory].images.map((src, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              onClick={() => openModal(src)}
            >
              {/* Image */}
              <img 
                src={src} 
                alt={`Gallery ${activeCategory} ${index + 1}`} 
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      {isOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" 
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-6xl mx-auto transform transition-all duration-300" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-16 right-0 text-white hover:text-red-400 transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={selectedImage} 
                alt="Full size" 
                className="w-full h-[80vh] object-contain" 
              />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}