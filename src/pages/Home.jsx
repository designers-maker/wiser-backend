import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { SITE } from '../data/siteContent';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    '/images/home1.jpeg',
    '/images/home2.jpg',
    '/images/home3.jpg',
    '/images/home4.jpg',
    '/images/home5.jpg'
  ];
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  useEffect(() => {
    const revealCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll to infographic section logic
  useEffect(() => {
    if (location.hash === '#infographic-section') {
      const timer = setTimeout(() => {
        const element = document.getElementById('infographic-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, null, ' ');
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const infographicFrames = React.useMemo(
    () => ['/animation/1.png', '/animation/2.png', '/animation/3.png', '/animation/4.png', '/animation/5.png'],
    []
  );
  const [infographicIndex] = useState(() => Math.floor(Math.random() * infographicFrames.length));

  return (
    <main className="min-h-screen font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden bg-gradient-to-b from-blue-50 via-purple-50 to-orange-50">
      
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/5 to-orange-500/10 animate-gradient-xy"></div>
        <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-500/15 via-blue-500/10 to-purple-500/15 animate-pulse opacity-70"></div>
        
        {/* Floating Gradient Blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/25 to-cyan-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-500/25 to-red-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4.5s' }}></div>
        
        {/* Dynamic Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-float-page"
              style={{
                width: `${Math.random() * 45 + 15}px`,
                height: `${Math.random() * 45 + 15}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]}40, ${['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'][Math.floor(Math.random() * 5)]}40)`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${25 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
        
        {/* Subtle Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-400 rotate-45 animate-floatPage" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-purple-400 rotate-12 animate-floatPage" style={{ animationDelay: '7s' }}></div>
          <div className="absolute top-2/3 left-1/2 w-20 h-20 border-2 border-orange-400 -rotate-12 animate-floatPage" style={{ animationDelay: '12s' }}></div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-scroll-x { animation: scroll-x 30s linear infinite; }
          .animate-scroll-x:hover { animation-play-state: paused; }

          @keyframes floatBlob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
          .bg-blob { animation: floatBlob 10s infinite ease-in-out; }

          .reveal-on-scroll { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
          .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

          @keyframes breathe { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.05); } }
          .animate-breathe { animation: breathe 4s ease-in-out infinite; }
          
          /* Hero Animations */
          @keyframes fadeInZoom { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
          .animate-fade-in-zoom { animation: fadeInZoom 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          
          @keyframes slideInUp { 0% { opacity: 0; transform: translateY(50px); } 100% { opacity: 1; transform: translateY(0); } }
          .animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
          
          @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); } 50% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); } }
          .animate-pulse-glow { animation: pulseGlow 2s infinite; }
          
          @keyframes wave { 0% { transform: rotate(0deg); } 10% { transform: rotate(14deg); } 20% { transform: rotate(-8deg); } 30% { transform: rotate(14deg); } 40% { transform: rotate(-4deg); } 50% { transform: rotate(10deg); } 60% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }
          .animate-wave { animation: wave 2s ease-in-out; }
          
          @keyframes floatParticle { 0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; } }
          .animate-float-particle { animation: floatParticle 15s infinite linear; }

          @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
          .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
          
          /* Page Background Floating Animation */
          @keyframes floatPage {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            25% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
            50% { transform: translateY(-50px) translateX(40px) rotate(10deg); }
            75% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
          }
          .animate-float-page { animation: floatPage 25s infinite ease-in-out; }

          @keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          .animate-shimmer { background-size: 200% 200%; animation: shimmer 3s ease-in-out infinite; }
        `}
      </style>

      {/* Floating Button (Side) */}
      <button 
        onClick={() => navigate('/about/events')} 
        className="hidden md:block fixed left-0 top-1/4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-orange-500 hover:to-orange-600 active:from-orange-600 active:to-orange-700 text-white font-bold py-3 px-1.5 sm:py-4 sm:px-2 rounded-r-2xl shadow-2xl transition-all hover:pl-2 sm:hover:pl-3 hover:scale-105 active:scale-95 duration-300 text-xs sm:text-sm touch-manipulation" 
        style={{ writingMode: 'vertical-rl', transform: 'scaleX(-1)' }}
      >
        <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>Upcoming Events</span>
      </button>

      {/* ========================================= */}
      {/* MAIN SINGLE SECTION CONTAINER */}
      {/* ========================================= */}
      <section className="relative w-full">
        
        {/* --- HERO AREA --- */}
        <div className="relative w-full min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
          
          {/* Animated Gradient Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-orange-900/40 -z-10 animate-gradient-xy"></div>
          
          {/* Floating Background Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] bg-blob -z-10"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] bg-blob -z-10" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] bg-blob -z-10" style={{ animationDelay: '4s' }}></div>

          {/* Slideshow Background Images with Overlay */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat object-cover transition-all duration-1000 ease-in-out transform ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/40 backdrop-blur-[2px]"></div>
          </div>

          {/* Hero Content Wrapper */}
          <div className="relative z-20 w-full text-center space-y-4 px-4 max-w-5xl mx-auto">
            
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 animate-fade-in-zoom shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-colors cursor-default">
              Welcome to Wiser
            </div>
            
            {/* Main Heading - Reduced Size */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
              Be The <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)'}}>Future.</span><br />
              <span className="text-white drop-shadow-2xl">Serve Today.</span>
            </h1>
            
            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 animate-slide-in-up">
              
              <button
                onClick={() => navigate('/volunteer')}
                className="group/vol relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 font-bold text-white text-sm sm:text-base rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] touch-manipulation bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
              >
                <span className="absolute w-64 h-64 mt-12 group-hover/vol:-rotate-45 group-hover/vol:-mt-24 transition-all duration-1000 ease-out -translate-x-56 bg-white opacity-10 rotate-45 block pointer-events-none"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Volunteer with Wiser
                  <svg className="w-5 h-5 transition-transform group-hover/vol:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </span>
              </button>

              <a
                href={`tel:${SITE.phone.replace(/\s+/g, )}`}
                className="group/call relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 font-bold text-white text-sm sm:text-base rounded-full shadow-[0_0_30px_rgba(234,88,12,0.4)] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] touch-manipulation bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500"
              >
                <span className="absolute w-64 h-64 mt-12 group-hover/call:-rotate-45 group-hover/call:-mt-24 transition-all duration-1000 ease-out -translate-x-56 bg-white opacity-10 rotate-45 block pointer-events-none"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <svg className="w-5 h-5 transition-transform group-hover/call:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </span>
              </a>

            </div>
          </div>

          {/* Slide Indicators with Click Functionality */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                  index === currentSlide 
                    ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                    : 'w-3 bg-white/50 hover:bg-white/80 hover:w-4'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows - Smaller Size */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto space-y-0">
          
          {/* 2. OUR PROGRAMS - Consistent Web/Mobile Design */}
          <div className="py-12 reveal-on-scroll animate-slide-in-up">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-16 w-2 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full shadow-lg"></div>
               <div>
                 <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-1 block">What We Do</span>
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Programs</span></h2>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <ProgramCard title="Teach" image="/images/teach.jpg" to="/programs/teach" navigate={navigate} />
              <ProgramCard title="School Volunteering" image="/images/school.jpg" to="/programs/school-volunteering" navigate={navigate} />
              <ProgramCard title="CSR Volunteering" image="/images/csr.png" to="/programs/csr-volunteering" navigate={navigate} />
            </div>
          </div>

          {/* ========================================= */}
          {/* 🆕 INFOGRAPHIC 1 & 3: TOPIC HUB (DESKTOP) + MOBILE OPTIMIZED 🆕 */}
          {/* ========================================= */}
          <div id="infographic-section" className="py-4 reveal-on-scroll animate-fade-in-zoom">
            <div className="flex flex-col items-center">
               <div className="text-center mb-2 w-full">
                 <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Methodology</span>
                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Function</span></h2>
               </div>
               
               {/* Desktop Infographic (Hidden on mobile) */}
               <div className="hidden sm:block w-full">
                 <HorizontalOvuleInfographic navigateTo={navigate} />
               </div>
               
               {/* Mobile Infographic (Visible only on mobile) */}
               <div className="sm:hidden w-full">
                 <MobileOptimizedInfographic navigateTo={navigate} />
               </div>
               
            </div>
          </div>

          {/* ========================================= */}
          {/* 🆕 INFOGRAPHIC 2: HIERARCHY ANIMATION (CANVAS) 🆕 */}
          {/* ========================================= */}
          <div className="py-4 reveal-on-scroll animate-slide-in-up">
             
             {/* The New Component 2: Hierarchy Animation */}
             <SecondInfographic />
             
          </div>

          {/* 3. Videos Section - Reduced Spacing */}
          <div className="py-4 reveal-on-scroll animate-fade-in-zoom">
            <div className="space-y-4">
              <div className="text-center max-w-3xl mx-auto">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-[2px] w-12 bg-orange-500"></div>
                    <span className="text-orange-600 font-bold uppercase text-xs tracking-[0.2em]">In Action</span>
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                 </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">Watch How We <span className="text-blue-600">Work</span></h2>
                <p className="text-slate-600 text-lg">See our volunteers in action making a real difference.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* YouTube Videos with Separate Links */}
                <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group cursor-pointer" onClick={() => window.open("https://www.youtube.com/watch?v=BIQBqlFa91g", "_blank")}>
                  <iframe className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://www.youtube.com/embed/BIQBqlFa91g" title="Wiser Volunteer Video 1" allowFullScreen />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group cursor-pointer" onClick={() => window.open("https://www.youtube.com/watch?v=BIQBqlFa91g", "_blank")}>
                  <iframe className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://www.youtube.com/embed/BIQBqlFa91g" title="Wiser Volunteer Video 2" allowFullScreen />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group cursor-pointer" onClick={() => window.open("https://www.youtube.com/watch?v=BIQBqlFa91g", "_blank")}>
                  <iframe className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://www.youtube.com/embed/BIQBqlFa91g" title="Wiser Volunteer Video 3" allowFullScreen />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </div>
                  </div>
                </div>
                
                {/* Local Videos - Ready for Implementation */}
                {/* Uncomment and replace with your local video paths when ready */}
                {/*
                <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    controls
                    poster="/path/to/video-thumbnail.jpg"
                  >
                    <source src="/videos/local-video-1.mp4" type="video/mp4" />
                    <source src="/videos/local-video-1.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    controls
                    poster="/path/to/video-thumbnail-2.jpg"
                  >
                    <source src="/videos/local-video-2.mp4" type="video/mp4" />
                    <source src="/videos/local-video-2.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    controls
                    poster="/path/to/video-thumbnail-3.jpg"
                  >
                    <source src="/videos/local-video-3.mp4" type="video/mp4" />
                    <source src="/videos/local-video-3.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                */}
              </div>
            </div>
          </div>

          {/* 4. Our Projects - Reduced Spacing */}
          <div className="py-4 reveal-on-scroll animate-slide-in-up">
            <div className="flex items-center gap-4 mb-4 cursor-pointer group w-max" onClick={() => navigate('/projects')}>
               <div className="flex flex-col items-center">
                  <div className="h-12 w-1 bg-slate-300 group-hover:bg-blue-500 transition-colors rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-300 group-hover:bg-orange-500 rounded-full mt-2 transition-colors"></div>
               </div>
               <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-orange-600 transition-all duration-300">Our Projects</h2>
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                     <span className="text-orange-600 font-bold text-sm tracking-wide">View Impact Gallery</span>
                     <i className="fas fa-arrow-right text-orange-500 group-hover:translate-x-2 transition-transform"></i>
                  </div>
               </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { title: "Education for All", img: "/images/1.jpg", to: "/projects/details/1" },
                  { title: "Health & Wellness", img: "/images/5.jpg", to: "/projects/details/2" },
                  { title: "Skill Development", img: "/images/9.jpg", to: "/projects/details/3" },
                  { title: "Community Outreach", img: "/images/13.jpg", to: "/projects/details/4" }
                ].map((project, i) => (
                  <ProjectImage key={i} {...project} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <StatCard value="10000+" label="Beneficiaries" color="text-blue-600" />
                 <StatCard value="500+" label="Volunteers" color="text-green-600" />
                 <StatCard value="25+" label="Cities" color="text-purple-600" />
                 <StatCard value="6" label="Active Projects" color="text-orange-600" />
                 <StatCard value="50+" label="Communities Served" color="text-red-600" />
                 <StatCard value="1000+" label="Events Organized" color="text-indigo-600" />
              </div>
            </div>
          </div>

          {/* 5. Partners - Reduced Spacing */}
          <div className="py-4 pb-8 overflow-visible relative reveal-on-scroll animate-fade-in-zoom">
            <div className="mb-4 text-center space-y-2">
               <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 text-blue-700 font-bold text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">Our Network</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-500">Industry Leaders</span></h2>
            </div>
            <div className="w-full overflow-visible relative">
              <div className="flex gap-12 animate-scroll-x items-center">
                {Array(20).fill(0).map((_, i) => (
                  <img key={i} src={`/logos/partner${(i % 5) + 1}.png`} alt="Partner" className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#eff6ff] via-transparent to-[#fff7ed] pointer-events-none"></div>
            </div>
          </div>

        </div>
        
      </section>
    </main>
  );
}

// ==========================================
// 🆕 INFOGRAPHIC 1: ROBUST & ANIMATED OVAL HUB
// ==========================================
function HorizontalOvuleInfographic({ navigateTo }) {
  const TOTAL_POINTS = 10;
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const pointsData = [
    { title: "Tech Talks", icon: "🎤", slug: "tech-talks" },
    { title: "Mock Interviews", icon: "👔", slug: "mock-interviews" },
    { title: "Career Counselling", icon: "🧭", slug: "career-counselling" },
    { title: "Communication Skills", icon: "💬", slug: "communication-skills" },
    { title: "Office Visits", icon: "🏢", slug: "office-visits" },
    { title: "Resume Session", icon: "📄", slug: "resume-session" },
    { title: "Soft Skills", icon: "🧩", slug: "soft-skills" },
    { title: "Faculty Training", icon: "👨‍🏫", slug: "faculty-training" },
    { title: "Industry Visits", icon: "🏭", slug: "industry-visits" },
    { title: "Personality Development", icon: "📈", slug: "personality-development" }
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 ||
                           ('ontouchstart' in window) ||
                           (navigator.maxTouchPoints > 0) ||
                           (navigator.msMaxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };
    
    // Initial check
    checkMobile();
    
    // Event listeners
    window.addEventListener('resize', checkMobile, { passive: true });
    window.addEventListener('orientationchange', checkMobile, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // IMPROVED LINE UPDATE LOGIC
  useEffect(() => {
    const updateLines = () => {
      if (!wrapperRef.current || !svgRef.current) return;
      
      // Use getBoundingClientRect to get accurate positions
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      
      // Calculate center relative to SVG container
      const centerX = (wrapperRect.left - svgRect.left) + (wrapperRect.width / 2);
      const centerY = (wrapperRect.top - svgRect.top) + (wrapperRect.height / 2);

      const lines = svgRef.current.querySelectorAll('line');
      const points = wrapperRef.current.querySelectorAll('.point-rect');

      points.forEach((point, i) => {
        if (point.offsetParent) { // Ensure element is visible
          const pointRect = point.getBoundingClientRect();
          const pointX = (pointRect.left - svgRect.left) + (pointRect.width / 2);
          const pointY = (pointRect.top - svgRect.top) + (pointRect.height / 2);

          if (lines[i]) {
            lines[i].setAttribute('x1', centerX);
            lines[i].setAttribute('y1', centerY);
            lines[i].setAttribute('x2', pointX);
            lines[i].setAttribute('y2', pointY);
            lines[i].style.display = 'block'; // Ensure line is visible
          }
        } else {
          if (lines[i]) {
            lines[i].style.display = 'none';
          }
        }
      });
    };

    // Run immediately and on resize
    const updateTimer = setTimeout(updateLines, 100);
    window.addEventListener('resize', updateLines);
    window.addEventListener('scroll', updateLines, { passive: true });
    
    // Additional updates for dynamic content
    const interval = setInterval(updateLines, 500);

    return () => {
      clearTimeout(updateTimer);
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('scroll', updateLines);
      clearInterval(interval);
    };
  }, []);

  const handleHover = (index) => setActiveIndex(index);
  const handleLeave = () => setActiveIndex(-1);
  const handleTouch = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const navigate = useNavigate(); // Add navigate to this component too
  
  return (
    <div className="relative w-full max-w-full mx-auto h-auto min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] py-2 sm:py-3 px-2 sm:px-3 md:px-4 overflow-visible">
      
      {/* SVG Layer - Show on desktop, hide on mobile for better performance */}
      {!isMobile && (
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {pointsData.map((_, i) => (
            <line 
              key={i}
              className="origin-center"
              style={{
                stroke: activeIndex === i ? '#2563EB' : '#93C5FD', 
                strokeWidth: activeIndex === i ? 4 : 2,
                opacity: activeIndex === i ? 1 : 0.4,
                strokeDasharray: activeIndex === i ? "0" : "8, 8", 
                filter: activeIndex === i ? "url(#glow)" : "none",
                animation: activeIndex === i ? 'none' : 'dash 30s linear infinite',
                transition: 'all 0.4s ease-out'
              }}
            />
          ))}
        </svg>
      )}

      <div ref={wrapperRef} className="absolute inset-0 z-10">
        
        {/* Central Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[50%] shadow-[0_0_40px_rgba(37,99,235,0.4)] flex flex-col items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-widest animate-breathe z-20 border border-white/30 backdrop-blur-md relative">
             <div className="absolute inset-0 rounded-[50%] border-2 border-blue-400 opacity-30 animate-ping"></div>
             <span className="relative z-10 text-shadow-sm">TOPICS</span>
             <span className="text-xs font-bold opacity-90 tracking-normal mt-1">We Covered</span>
        </div>

        {/* Points */}
        {pointsData.map((data, i) => {
          const angleDeg = (i * 360) / TOTAL_POINTS;
          const angleRad = (angleDeg * Math.PI) / 180;
          
          const radiusX = isMobile ? 25 : 40; 
          const radiusY = isMobile ? 18 : 28; 
          
          const leftPercent = 50 + (radiusX * Math.cos(angleRad)); 
          const topPercent = 50 + (radiusY * Math.sin(angleRad));

          const isLeft = Math.cos(angleRad) < 0;
          const isActive = activeIndex === i;
          
          const entranceDelay = `${i * 0.08}s`;
          const floatDelay = `${(i % 2) * 2}s`;

          return (
            <div
              key={i}
              className={`point-rect absolute flex items-center gap-2 sm:gap-3 md:gap-4 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl border shadow-lg cursor-pointer transition-all duration-300 ease-out select-none z-30
                ${isActive 
                  ? 'scale-110 shadow-2xl border-blue-500 bg-white ring-2 ring-blue-200 z-50 translate-y-[-5px]' 
                  : 'scale-100 border-slate-200 hover:scale-105 hover:border-blue-400 hover:shadow-xl hover:bg-white active:scale-105 active:border-blue-400'
                }
                ${isLeft ? 'justify-end text-right flex-row-reverse' : 'justify-start text-left flex-row'}
              `}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                animation: `zoomIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${entranceDelay}, gentleFloat 4s ease-in-out infinite ${floatDelay}`,
                opacity: '0'
              }}
              onMouseEnter={() => !isMobile && handleHover(i)}
              onMouseLeave={() => !isMobile && handleLeave()}
              onTouchStart={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  handleTouch(i);
                }
              }}
              onTouchEnd={(e) => {
                if (isMobile) {
                  e.preventDefault();
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                if (isMobile) {
                  if (activeIndex !== i) {
                    handleTouch(i);
                  } else {
                    // Navigate to the link if already active
                    navigateTo(`/foundation/${data.slug}`);
                  }
                } else {
                  // On desktop, navigate immediately
                  navigateTo(`/foundation/${data.slug}`);
                }
              }}>
              <div className={`absolute rounded-full blur-2xl -z-10 transition-all duration-300 ${isActive ? 'bg-blue-500/30 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' : 'bg-blue-200/0 w-0 h-0'}`}></div>
              <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl transition-transform duration-300 flex-shrink-0 ${isActive ? 'scale-125 -rotate-6' : 'hover:scale-110'}`}>{data.icon}</div>
              <span className={`font-bold text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-700 whitespace-nowrap transition-colors leading-tight ${isActive ? 'text-blue-700' : ''}`}>
                {data.title}
              </span>
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -1000; } }
        @keyframes zoomIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes gentleFloat { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 5px)); } }
      `}</style>
    </div>
  );
}

// ==========================================
// 🆕 INFOGRAPHIC 2: HIERARCHY ANIMATION (REPLACED)
// ==========================================
function SecondInfographic() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mainBoxRef = useRef(null);
  const subBoxesRefs = useRef([]);
  
  // Store sub-box refs
  const setSubBoxRef = (index) => (el) => {
    subBoxesRefs.current[index] = el;
  };

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const mainBox = mainBoxRef.current;
    const subBoxes = subBoxesRefs.current;

    let animationFrameId;
    let progress = 0;

    const resizeCanvas = () => {
      if (container && canvas) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        startLineAnimation();
      }
    };

    const startLineAnimation = () => {
      progress = 0;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animateLines();
    };

    const animateLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Check if elements exist
      if (!mainBox || !container) return;

      // Get coordinates relative to container
      const mainRect = mainBox.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const startX = mainRect.left - containerRect.left + (mainRect.width / 2);
      const startY = mainRect.bottom - containerRect.top;

      ctx.strokeStyle = '#6366f1'; 
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      subBoxes.forEach(box => {
        if (!box) return;
        const boxRect = box.getBoundingClientRect();
        const endX = boxRect.left - containerRect.left + (boxRect.width / 2);
        const endY = boxRect.top - containerRect.top;

        // Calculate Bezier Control Points
        const cp1x = startX;
        const cp1y = startY + (endY - startY) / 2;
        const cp2x = endX;
        const cp2y = startY + (endY - startY) / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        if (progress > 0) {
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
          const length = 1000; // Approximate max length to ensure full draw
          ctx.setLineDash([length * progress, length]);
          ctx.stroke();
          ctx.setLineDash([]); 
        }
      });

      // Increment progress
      if (progress < 1) {
        progress += 0.015; 
        animationFrameId = requestAnimationFrame(animateLines);
      }
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Small delay to allow layout to settle, then start
    const timer = setTimeout(() => {
        resizeCanvas();
    }, 800);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[400px] py-4">
        <style>{`
            /* --- Scoped CSS Variables --- */
            .hierarchy-root {
                --h-bg-color: #0f172a;
                --h-main-gradient: linear-gradient(135deg, #6366f1, #a855f7);
                --h-box-bg: #1e293b;
                --h-text-main: #ffffff;
                --h-text-sub: #cbd5e1;
                --h-line-color: #475569;
                --h-glow-color: rgba(99, 102, 241, 0.5);
            }

            .hierarchy-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 1200px;
                position: relative;
                padding: 0 20px;
            }

            /* --- LEVEL 1: MAIN BOX --- */
            .top-level {
                margin-bottom: 80px; 
                z-index: 10;
            }

            .main-box {
                background: var(--h-main-gradient);
                color: white;
                padding: 25px 50px;
                border-radius: 16px;
                font-size: 1.8rem;
                font-weight: bold;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 30px var(--h-glow-color);
                text-align: center;
                min-width: 250px;
                cursor: pointer;
                
                /* Animation: Tilt Drop */
                opacity: 0;
                transform: rotateX(45deg) translateY(-50px) scale(0.8);
                animation: h-tiltDrop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.2s;
            }

            .main-box:hover {
                transform: scale(1.05);
                box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.5);
            }

            /* --- LEVEL 2: 6 BOXES --- */
            .bottom-level {
                display: flex;
                justify-content: space-between;
                width: 100%;
                position: relative;
                z-index: 10;
                gap: 20px; 
            }

            .sub-box {
                background-color: var(--h-box-bg);
                border: 1px solid #334155;
                padding: 20px 15px;
                border-radius: 12px;
                flex: 1; 
                min-width: 140px; /* Responsive Minimum */
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                color: var(--h-text-main);
                font-weight: 500;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: visible; /* Changed from hidden to visible to prevent text cropping */

                /* Animation: Flip Up */
                opacity: 0;
                transform: rotateY(-90deg);
                animation: h-flipUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }

            .sub-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--h-main-gradient);
                transform: scaleX(0);
                transition: transform 0.3s ease;
                transform-origin: left;
            }

            .sub-box:hover {
                transform: translateY(-10px);
                border-color: #6366f1;
                box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.3);
            }

            .sub-box:hover::before {
                transform: scaleX(1);
            }

            /* Styles for Content inside Box */
            .box-title {
                color: #ffffff;
                font-size: 1rem;
                font-weight: bold;
                margin-bottom: 12px;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-bottom: 8px;
                width: 100%;
            }

            .box-list {
                list-style: none;
                padding: 0;
                margin: 0;
                width: 100%;
                text-align: left;
            }

            .box-list li {
                color: var(--h-text-sub);
                font-size: 0.8rem;
                margin-bottom: 6px;
                padding-left: 15px;
                position: relative;
                line-height: 1.4;
            }

            .box-list li::before {
                content: '•';
                color: #a855f7; /* Purple bullet */
                position: absolute;
                left: 0;
                font-weight: bold;
            }

            /* Staggered Delays for 6 boxes */
            .sub-box:nth-child(1) { animation-delay: 0.8s; }
            .sub-box:nth-child(2) { animation-delay: 0.9s; }
            .sub-box:nth-child(3) { animation-delay: 1.0s; }
            .sub-box:nth-child(4) { animation-delay: 1.1s; }
            .sub-box:nth-child(5) { animation-delay: 1.2s; }
            .sub-box:nth-child(6) { animation-delay: 1.3s; }

            /* --- CANVAS LINES --- */
            #h-lineCanvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                pointer-events: none;
            }

            /* --- ANIMATIONS --- */
            @keyframes h-tiltDrop {
                to { opacity: 1; transform: rotateX(0) translateY(0) scale(1); }
            }

            @keyframes h-flipUp {
                to { opacity: 1; transform: rotateY(0); }
            }

            /* --- MOBILE OVERRIDES --- */
            @media (max-width: 768px) {
                .hierarchy-container {
                    padding: 0 10px;
                }
                .bottom-level {
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 15px;
                }
                .sub-box {
                    min-width: 45%; /* Two columns on mobile */
                    flex: 0 0 calc(50% - 10px);
                }
                .top-level {
                    margin-bottom: 40px; /* Reduce space for mobile */
                }
            }
            @media (max-width: 480px) {
                 .sub-box {
                    min-width: 100%; /* Full width on very small screens */
                    flex: 0 0 100%;
                }
            }
        `}</style>

        <div className="hierarchy-root">
            <div className="hierarchy-container" ref={containerRef}>
                {/* Canvas for animated lines */}
                <canvas ref={canvasRef} id="h-lineCanvas"></canvas>

                {/* Main Box */}
                <div className="top-level">
                    <div className="main-box" ref={mainBoxRef}>Volunteers Projects</div>
                </div>

                {/* 6 Sub Boxes with Sub Points */}
                <div className="bottom-level">
                    
                    {/* Box 1 */}
                    <div className="sub-box" ref={setSubBoxRef(0)}>
                        <div className="box-title">Venue</div>
                        <ul className="box-list">
                            <li>Any City of your choice</li>
                        </ul>
                    </div>

                    {/* Box 2 */}
                    <div className="sub-box" ref={setSubBoxRef(1)}>
                        <div className="box-title">Type of Institutions</div>
                        <ul className="box-list">
                            <li>School</li>
                            <li>College</li>
                        </ul>
                    </div>

                    {/* Box 3 */}
                    <div className="sub-box" ref={setSubBoxRef(2)}>
                        <div className="box-title">Specializations</div>
                        <ul className="box-list">
                            <li>Engineering</li>
                            <li>Degree</li>
                            <li>Polytechnic</li>
                        </ul>
                    </div>

                    {/* Box 4 */}
                    <div className="sub-box" ref={setSubBoxRef(3)}>
                        <div className="box-title">Session</div>
                        <ul className="box-list">
                            <li>1 hour to multiple hours</li>
                        </ul>
                    </div>

                    {/* Box 5 */}
                    <div className="sub-box" ref={setSubBoxRef(4)}>
                        <div className="box-title">Date</div>
                        <ul className="box-list">
                            <li>As per your convenience</li>
                        </ul>
                    </div>

                    {/* Box 6 */}
                    <div className="sub-box" ref={setSubBoxRef(5)}>
                        <div className="box-title">Number of volunteers</div>
                        <ul className="box-list">
                            <li>1 - 100</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
}

// Helper Component for Project Images
function ProjectImage({ title, img, to }) {
  return (
    <Link to={to} className="text-left group w-full transition-transform duration-300 block">
      <div className="relative overflow-hidden rounded-2xl mb-3 shadow-lg">
        <img src={img} alt={title} className="w-full h-32 md:h-40 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white font-bold text-sm">View Details</span>
        </div>
      </div>
      <p className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">{title}</p>
    </Link>
  );
}

// Helper Component for Program Cards
function ProgramCard({ title, image, to, navigate }) {
  return (
    <button onClick={() => navigate(to)} className="text-left w-full transition-all duration-300 hover:-translate-y-2 active:translate-y-0 group touch-manipulation">
      <div className="relative overflow-hidden rounded-3xl mb-4 shadow-xl h-48 sm:h-56 md:h-64">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 to-orange-500/95 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6">
           <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300">Explore {title}</h3>
           <span className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 delay-75 hover:bg-orange-100 text-sm sm:text-base">Learn More &rarr;</span>
        </div>
      </div>
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{title}</p>
    </button>
  );
}

// Helper Component for Stats Cards
function StatCard({ value, label, color }) {
  return (
    <div className="group bg-white/30 backdrop-blur-md border border-white/50 p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 relative overflow-hidden touch-manipulation">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <p className={`relative z-10 text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 ${color}`}>
        <AnimatedCounter end={value} duration={2500} />
      </p>
      <p className="relative z-10 text-[10px] sm:text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wide group-hover:text-slate-700 transition-colors leading-tight">{label}</p>
    </div>
  );
}

// ==========================================
// 🆕 INFOGRAPHIC 3: MOBILE ANIMATED INTERACTIVE LAYOUT
// ==========================================
function MobileOptimizedInfographic({ navigateTo }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const pointsData = [
    { title: "Tech Talks", icon: "🎤", slug: "tech-talks", color: "from-purple-500 to-pink-500" },
    { title: "Mock Interviews", icon: "👔", slug: "mock-interviews", color: "from-blue-500 to-cyan-500" },
    { title: "Career Counselling", icon: "🧭", slug: "career-counselling", color: "from-green-500 to-teal-500" },
    { title: "Communication Skills", icon: "💬", slug: "communication-skills", color: "from-yellow-500 to-orange-500" },
    { title: "Office Visits", icon: "🏢", slug: "office-visits", color: "from-red-500 to-pink-500" },
    { title: "Resume Session", icon: "📄", slug: "resume-session", color: "from-indigo-500 to-purple-500" },
    { title: "Soft Skills", icon: "🧩", slug: "soft-skills", color: "from-pink-500 to-rose-500" },
    { title: "Faculty Training", icon: "👨‍🏫", slug: "faculty-training", color: "from-emerald-500 to-green-500" },
    { title: "Industry Visits", icon: "🏭", slug: "industry-visits", color: "from-amber-500 to-yellow-500" },
    { title: "Personality Development", icon: "📈", slug: "personality-development", color: "from-violet-500 to-purple-500" }
  ];

  const handleTouch = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="w-full bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Central Topic Header with Animation */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl text-white font-bold text-lg shadow-xl animate-bounce-subtle">
          <span className="flex items-center gap-2">
            <span className="animate-pulse">🎯</span>
            TOPICS WE COVERED
            <span className="animate-pulse">🎯</span>
          </span>
        </div>
      </div>

      {/* Interactive Animated List */}
      <div className="space-y-4 relative z-10">
        {pointsData.map((data, index) => (
          <div
            key={index}
            onClick={() => {
              // Navigate immediately on single tap
              navigateTo(`/foundation/${data.slug}`);
            }}
            className={`relative cursor-pointer transition-all duration-500 ease-out transform ${
              activeIndex === index 
                ? 'scale-105 -translate-y-1' 
                : 'hover:scale-102 hover:-translate-y-0.5'
            }`}
          >
            {/* Animated Card */}
            <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              activeIndex === index
                ? 'bg-white shadow-2xl border-2 border-blue-300'
                : 'bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200 hover:border-blue-200'
            }`}>
              
              {/* Animated Icon Container */}
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${
                activeIndex === index
                  ? `bg-gradient-to-br ${data.color} scale-110 rotate-6`
                  : `bg-gradient-to-br ${data.color} group-hover:scale-110 group-hover:rotate-3`
              }`}>
                <span className={`${activeIndex === index ? 'animate-bounce' : 'group-hover:animate-pulse'}`}>
                  {data.icon}
                </span>
              </div>
              
              {/* Content Area */}
              <div className="flex-grow overflow-hidden">
                <h3 className={`font-bold transition-all duration-300 ${
                  activeIndex === index 
                    ? 'text-blue-700 text-lg' 
                    : 'text-slate-800 group-hover:text-blue-600'
                }`}>
                  {data.title}
                </h3>
                
                {/* Expandable Description */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  activeIndex === index ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-xs text-slate-600 italic">
                    Tap to explore this program in detail
                  </p>
                </div>
              </div>
              
              {/* Animated Arrow */}
              <div className={`flex-shrink-0 transition-all duration-300 ${
                activeIndex === index
                  ? 'text-blue-600 rotate-90 scale-125'
                  : 'text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Click Ripple Effect */}
            {activeIndex === index && (
              <div className="absolute inset-0 rounded-2xl bg-blue-500/10 animate-ping"></div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Badge */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-sm font-bold animate-pulse">
          <span>✨</span>
          <span>10 Programs Available</span>
          <span>✨</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        @media (max-width: 640px) {
          .mobile-infographic-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    const endValue = parseInt(end.replace(/\D/g, '')) || 0; 
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      const currentCount = Math.floor(easeOutExpo(progress) * endValue);
      setCount(currentCount);
      if (progress < 1) window.requestAnimationFrame(step);
      else setCount(endValue);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{typeof end === 'string' && end.includes('+') ? `${count}+` : count}</>;
}