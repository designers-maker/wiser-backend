import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgramCSRVolunteering() {
  const navigate = useNavigate();
  
  // --- State & Refs for Media Modal ---
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState('image');
  const [mediaSrc, setMediaSrc] = useState('');
  const [mediaAlt, setMediaAlt] = useState('');
  const [mediaPoster, setMediaPoster] = useState('');
  const mediaVideoRef = useRef(null);

  // --- State & Refs for New Slider ---
  const wrapperRef = useRef(null);
  const progressRef = useRef(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  // --- Media Modal Logic ---
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        closeMediaModal();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function openMediaModal(type, src, alt = '', poster = '') {
    closeMediaModal();
    setTimeout(() => {
      setMediaType(type);
      setMediaSrc(src);
      setMediaAlt(alt);
      setMediaPoster(poster);
      setMediaModalOpen(true);
      setTimeout(() => {
        try {
          document.querySelectorAll('video').forEach((v) => {
            if (mediaVideoRef.current && v === mediaVideoRef.current) return;
            try { v.pause(); } catch (e) {}
          });
          try { document.body.style.overflow = 'hidden'; } catch (e) {}
        } catch (e) {}
      }, 50);
    }, 50);
  }

  function closeMediaModal() {
    setMediaModalOpen(false);
    try {
      if (mediaVideoRef.current) {
        mediaVideoRef.current.pause();
        mediaVideoRef.current.currentTime = 0;
      }
    } catch (e) {}
    try { document.body.style.overflow = ''; } catch (e) {}
  }

  // --- New Slider Logic ---
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const progressBar = progressRef.current;
    if (!wrapper || !progressBar) return;

    function updateProgress() {
      const scrollLeft = wrapper.scrollLeft;
      const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;
      const percentage = (scrollLeft / maxScrollLeft) * 100;
      
      if (progressBar) {
        progressBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
      }

      // Update dots for mobile
      if (window.innerWidth < 768) {
        const cards = Array.from(wrapper.children);
        const cardWidth = cards[0].offsetWidth + 24; // width + gap
        const index = Math.round(scrollLeft / cardWidth);
        setActiveDotIndex(index);
      }
    }

    wrapper.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
    window.addEventListener('resize', updateProgress);

    return () => {
      wrapper.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const scrollLeft = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/images/3.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold tracking-wide uppercase animate-pulse">
            Education For Everyone
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            CSR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Volunteering</span>
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Corporate social responsibility initiatives that create lasting community impact
          </p>
        </div>
      </section>

      {/* Media Modal */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={closeMediaModal}>
          <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeMediaModal} className="absolute -top-16 left-0 text-white font-bold flex items-center gap-2 text-lg hover:text-gray-300 transition-colors z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </button>
            <button onClick={closeMediaModal} className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-transform hover:rotate-90 duration-300 z-10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {mediaType === 'image' ? (
                <img src={mediaSrc} alt={mediaAlt} className="w-full h-[75vh] object-contain" />
              ) : (
                <video ref={mediaVideoRef} src={mediaSrc} poster={mediaPoster} controls autoPlay className="w-full h-[75vh] object-contain" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Wrapper */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 space-y-20">
        
        {/* About Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">About CSR Volunteering Program</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Our CSR Volunteering Program partners with corporations and organizations to align their
            corporate social responsibility goals with meaningful community impact. We provide
            structured volunteering opportunities for employees that create sustainable change
            while building team cohesion and corporate social consciousness.
          </p>
        </div>

        {/* Features - Glass Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 text-2xl">🤝</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">CSR Activities</h3>
              <ul className="space-y-4">
                {['Employee volunteer placement programs', 'Skill-building workshops for communities', 'Educational infrastructure development', 'Community health & wellness programs', 'Environmental sustainability initiatives'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-sm">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 text-2xl">🏆</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Corporate Benefits</h3>
              <ul className="space-y-4">
                {['Meaningful CSR goal alignment', 'Enhanced corporate reputation', 'Employee engagement & satisfaction', 'Team building opportunities', 'Impact reporting & documentation'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --- NEW PARTNERSHIP PROCESS (HORIZONTAL SLIDER) --- */}
        <section className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Partnership Process</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto"></p>
          </div>

          <div className="relative">
            {/* Progress Bar */}
            <div className="h-1 w-full bg-slate-200 rounded-full mb-10 overflow-hidden">
              <div ref={progressRef} className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 w-0 transition-all duration-300 ease-out"></div>
            </div>

            {/* Slider Window */}
            <div className="relative group">
              {/* Navigation Arrows */}
              <button onClick={scrollLeft} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-xl items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={scrollRight} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-xl items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              {/* Cards Wrapper */}
              <div ref={wrapperRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-2 overflow-visible">
                {/* Card 1 */}
                <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[350px] lg:w-[400px]">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-4">STEP 01</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Consultation</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        We meet to understand your CSR vision, employee interests, and budget to define perfect scope for your organization.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[350px] lg:w-[400px]">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <svg className="w-24 h-24 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-4">STEP 02</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Design</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        We curate a bespoke program—selecting beneficiaries, activities, and locations that align with your brand values.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[350px] lg:w-[400px]">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <svg className="w-24 h-24 text-fuchsia-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-fuchsia-50 text-fuchsia-700 rounded-full text-xs font-bold mb-4">STEP 03</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Execute</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        We handle all on-ground logistics, safety protocols, and coordination to ensure a seamless experience for your team.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[350px] lg:w-[400px]">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <svg className="w-24 h-24 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-bold mb-4">STEP 04</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Report</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        You receive a comprehensive impact report, including photos, volunteer hours, and feedback to share with stakeholders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator (Mobile) */}
            <div className="flex justify-center gap-2 mt-8 md:hidden">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDotIndex === i ? 'bg-indigo-600' : 'bg-slate-300'}`}
                />
              ))}
            </div>
          </div>
        </section>
        {/* --- END NEW DESIGN --- */}

        {/* --- REPLACEMENT: Our Impact Section (Horizontal Split Dark Theme) --- */}
        <ImpactStatsComponent />
        
        {/* Program Types */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border border-blue-200 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">One-time Events</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">Team volunteering days, skill development workshops, community clean-up drives, and donation drives.</p>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">Duration: 1-5 days</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-3xl border border-emerald-200 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">Long-term Programs</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">Mentorship programs, ongoing skill training, infrastructure projects, and sustained community partnerships.</p>
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-200 text-emerald-800 text-sm font-bold">Duration: 3-12 months</div>
          </div>
        </div>

        {/* Program in Action */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Corporate Volunteers in Action</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/3.jpg', 'CSR Activity 1'); }}>
                <img src="/images/3.jpg" alt="Workshop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mb-2">
                  <span>📅</span> 1 day
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">Employee Skill-Building Workshop</h4>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Bengaluru
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/4.jpg', 'CSR Activity 2'); }}>
                <img src="/images/4.jpg" alt="Camp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5,12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mb-2">
                  <span>📅</span> 3 days
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">Community Health & Wellness Camp</h4>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Chennai
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Success Stories */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Corporate Success Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md" onClick={(e) => { e.stopPropagation(); openMediaModal('video', '/videos/nasscom.mp4', 'School Video 1', '/images/g1.jpg'); }}>
                    <img src="/images/g1.jpg" alt="Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                       <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2.5 rounded-full group-hover:bg-white/30 transition-colors">
                         <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-xs font-semibold">Watch Video</div>
                  </div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/2.jpg', 'Story Image 1'); }}>
                    <img src="/images/2.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                       <span className="bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm transform scale-90 group-hover:scale-100 transition-transform">View Photo</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  <div className="mb-3">
                    <div className="flex justify-center md:justify-start gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
                    <h5 className="text-xl font-bold text-slate-900 mb-1">Volunteer</h5>
                    <p className="text-sm text-blue-600 font-medium mb-4">Community Participant</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "Volunteering at local schools transformed my perspective on teaching and community."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md" onClick={(e) => { e.stopPropagation(); openMediaModal('video', '/videos/nasscom.mp4', 'School Video 2', '/images/g2.jpg'); }}>
                    <img src="/images/g2.jpg" alt="Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                       <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2.5 rounded-full group-hover:bg-white/30 transition-colors">
                         <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-xs font-semibold">Watch Video</div>
                  </div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/3.jpg', 'Story Image 2'); }}>
                    <img src="/images/3.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                       <span className="bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm transform scale-90 group-hover:scale-100 transition-transform">View Photo</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  <div className="mb-3">
                    <div className="flex justify-center md:justify-start gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
                    <h5 className="text-xl font-bold text-slate-900 mb-1">Volunteer</h5>
                    <p className="text-sm text-emerald-600 font-medium mb-4">Mentor</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "The mentorship opportunities were rewarding and helped students improve significantly."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Call to Action */}
      <section className="w-full bg-slate-900 py-7 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Partner with Us for Your CSR Goals</h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Create meaningful social impact while strengthening your corporate brand and employee engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-red-900/20"
              onClick={() => navigate('/volunteer')}
            >
              Partner With Us
            </button>
            <button 
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              onClick={() => navigate('/donate')}
            >
              Make a Donation
            </button>
          </div>
        </div>
      </section>

      {/* Back Button - Right Aligned */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors hover:bg-blue-50 rounded-full text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Programs
          </button>
        </div>
      </section>

    </main>
  );
}

// --- Extracted Component for the New "Our Impact" Section ---
const ImpactStatsComponent = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // --- Intersection Observer for Trigger ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // --- Counter Logic ---
  const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const end = target;
        const duration = 2000; // ms
        const incrementTime = 20;
        const steps = duration / incrementTime;
        const increment = end / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, incrementTime);

        return () => clearInterval(timer);
      }
    }, [isVisible, target]);

    return <span>{count.toLocaleString()}+</span>;
  };

  const statsData = [
    { icon: '🏢', value: 100, label: 'Corporate Partners' },
    { icon: '👥', value: 5000, label: 'Employees Engaged' },
    { icon: '❤️', value: 50000, label: 'Lives Impacted' },
  ];

  return (
    <div ref={sectionRef} className="bg-gradient-to-br from-white to-slate-50 py-12 px-4 rounded-[2rem] my-6 border border-slate-200 shadow-xl">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl text-slate-900 uppercase tracking-[0.2em] font-bold relative inline-block">
            Our Impact
            <span className="block w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-4" />
          </h1>
        </div>

        {/* Stats List */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-16">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className={`
                flex-1 flex flex-col items-center justify-center transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {/* Visual Side */}
              <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg flex items-center justify-center relative overflow-hidden shadow-xl mb-8 border border-slate-200">
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-1000 delay-500 ${isVisible ? 'w-full' : 'w-0'}`} />
                <div className="text-5xl text-slate-700">
                  {stat.icon}
                </div>
              </div>

              {/* Text Side */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-none mb-2 font-variant-numeric">
                  <Counter target={stat.value} />
                </div>
                <div className="text-slate-600 text-sm md:text-base uppercase tracking-widest font-semibold mb-4">
                  {stat.label}
                </div>
                {/* Decorative Bar */}
                <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mx-auto transition-all duration-1000 delay-700" style={{ width: isVisible ? '100%' : '0%' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};