import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { SITE } from '../data/siteContent';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  
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
    <main className="min-h-screen font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
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
        `}
      </style>

      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 -z-20" />
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] bg-blob -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-400/20 rounded-full blur-[100px] bg-blob -z-10" style={{ animationDelay: '2s' }} />

      {/* Floating Button */}
      <button 
        onClick={() => navigate('/about/events')} 
        className="hidden md:block fixed left-0 top-1/4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-orange-500 hover:to-orange-600 active:from-orange-600 active:to-orange-700 text-white font-bold py-3 px-1.5 sm:py-4 sm:px-2 rounded-r-2xl shadow-2xl transition-all hover:pl-2 sm:hover:pl-3 hover:scale-105 active:scale-95 duration-300 text-xs sm:text-sm touch-manipulation" 
        style={{ writingMode: 'vertical-rl', transform: 'scaleX(-1)' }}
      >
        <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>Upcoming Events</span>
      </button>

      {/* 1. Hero Section */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-cover bg-center transform scale-105" style={{ backgroundImage: "url('/images/1.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="relative z-10 text-center space-y-6 px-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold tracking-wide uppercase animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Welcome to Wiser
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight drop-shadow-2xl leading-tight">
            Be The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Future</span>. <br />
            <span className="text-white">Serve Today.</span>
          </h1>
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/volunteer')}
              className="group/vol relative inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 font-bold text-white text-base sm:text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-orange-500/40 touch-manipulation"
              style={{ background: 'linear-gradient(to right, #2563eb, #ea580c)' }}
            >
              <span className="absolute w-64 h-64 mt-12 group-hover/vol:-rotate-45 group-hover/vol:-mt-24 transition-all duration-1000 ease-out -translate-x-56 bg-white opacity-20 rotate-45 block pointer-events-none"></span>
              <span className="relative z-10">Volunteer with Wiser</span>
            </button>
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
              className="group/call relative inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 font-bold text-white text-base sm:text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-blue-500/40 touch-manipulation"
              style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)' }}
            >
              <span className="absolute w-64 h-64 mt-12 group-hover/call:-rotate-45 group-hover/call:-mt-24 transition-all duration-1000 ease-out -translate-x-56 bg-white opacity-20 rotate-45 block pointer-events-none"></span>
              <span className="relative z-10">Contact Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. OUR PROGRAMS */}
      <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-6 space-y-6 reveal-on-scroll">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 md:mb-8">
           <div className="h-16 w-2 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full shadow-lg"></div>
           <div>
             <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-1 block">What We Do</span>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Programs</span></h2>
           </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          <ProgramCard title="Teach" image="/images/1.jpg" to="/programs/teach" navigate={navigate} />
          <ProgramCard title="School Volunteering" image="/images/2.jpg" to="/programs/school-volunteering" navigate={navigate} />
          <ProgramCard title="CSR Volunteering" image="/images/3.jpg" to="/programs/csr-volunteering" navigate={navigate} />
        </div>
      </section>

      {/* ========================================= */}
      {/* 🆕 INFOGRAPHIC 1: TOPIC HUB 🆕 */}
      {/* ========================================= */}
      <section id="infographic-section" className="w-full relative reveal-on-scroll bg-gradient-to-br from-white via-slate-50 to-white py-2 sm:py-4 px-4">
        <div className="w-full px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center">
           <div className="text-center mb-3 sm:mb-4 w-full">
             <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Methodology</span>
             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Function</span></h2>
           </div>
           {/* The Component 1 */}
           <HorizontalOvuleInfographic />
        </div>
      </section>

      {/* ========================================= */}
      {/* 🆕 INFOGRAPHIC 2: ORBITING CORE VALUES 🆕 */}
      {/* ========================================= */}
      <section className="w-full relative bg-slate-900 text-white py-6 sm:py-8 px-4 overflow-hidden">
         {/* <div className="text-center mb-12">
             <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase mb-2 block">Core Values</span>
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Architecture</span></h2>
         </div> */}
         
         {/* The New Component 2 */}
         <SecondInfographic />
         
         {/* "TELL US" BUTTON REMOVED */}
      </section>

      {/* 3. Videos Section */}
      <section className="w-full py-10 reveal-on-scroll">
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
             <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-[2px] w-12 bg-orange-500"></div>
                <span className="text-orange-600 font-bold uppercase text-xs tracking-[0.2em]">In Action</span>
                <div className="h-[2px] w-12 bg-blue-500"></div>
             </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Watch How We <span className="text-blue-600">Work</span></h2>
            <p className="text-slate-600 text-lg">See our volunteers in action making a real difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Wiser Volunteer Video 1', 'Wiser Volunteer Video 2', 'Wiser Volunteer Video 3'].map((title, i) => (
              <div key={i} className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
                <iframe className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://www.youtube.com/embed/BIQBqlFa91g" title={title} allowFullScreen />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Projects */}
      <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-12 reveal-on-scroll">
        <div className="flex items-center gap-4 mb-12 cursor-pointer group w-max" onClick={() => navigate('/projects')}>
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
      </section>

      {/* 5. Partners */}
      <section className="w-full py-8 overflow-hidden relative reveal-on-scroll">
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto mb-8 text-center space-y-3">
           <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 text-blue-700 font-bold text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">Our Network</span>
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-500">Industry Leaders</span></h2>
        </div>
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-12 animate-scroll-x items-center">
            {Array(20).fill(0).map((_, i) => (
              <img key={i} src={`/logos/partner${(i % 5) + 1}.png`} alt="Partner" className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#eff6ff] via-transparent to-[#fff7ed] pointer-events-none"></div>
        </div>
      </section>


    </main>
  );
}

// ==========================================
// 🆕 INFOGRAPHIC 1: ROBUST & ANIMATED OVAL HUB
// ==========================================
function HorizontalOvuleInfographic() {
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
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // ROBUST LINE UPDATE LOGIC
  useEffect(() => {
    const updateLines = () => {
      if (!wrapperRef.current || !svgRef.current) return;
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      
      // Calculate center relative to SVG
      const centerX = (wrapperRect.left + wrapperRect.width / 2) - svgRect.left;
      const centerY = (wrapperRect.top + wrapperRect.height / 2) - svgRect.top;

      const lines = svgRef.current.querySelectorAll('line');
      const points = wrapperRef.current.querySelectorAll('.point-rect');

      points.forEach((point, i) => {
        const pointRect = point.getBoundingClientRect();
        const pointX = (pointRect.left + pointRect.width / 2) - svgRect.left;
        const pointY = (pointRect.top + pointRect.height / 2) - svgRect.top;

        if (lines[i]) {
          lines[i].setAttribute('x1', centerX);
          lines[i].setAttribute('y1', centerY);
          lines[i].setAttribute('x2', pointX);
          lines[i].setAttribute('y2', pointY);
        }
      });
    };

    // Run immediately and on resize
    updateLines();
    window.addEventListener('resize', updateLines);
    const timer = setTimeout(updateLines, 100); // Fallback for font loading

    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timer);
    };
  }, []);

  const handleHover = (index) => setActiveIndex(index);
  const handleLeave = () => setActiveIndex(-1);
  const handleTouch = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="relative w-full max-w-full mx-auto h-auto min-h-[400px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] py-2 sm:py-3 px-2 sm:px-3 md:px-4 overflow-visible">
      
      {/* SVG Layer */}
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
          
          const radiusX = isMobile ? 30 : 40; 
          const radiusY = isMobile ? 22 : 28; 
          
          const leftPercent = 50 + (radiusX * Math.cos(angleRad)); 
          const topPercent = 50 + (radiusY * Math.sin(angleRad));

          const isLeft = Math.cos(angleRad) < 0;
          const isActive = activeIndex === i;
          
          const entranceDelay = `${i * 0.08}s`;
          const floatDelay = `${(i % 2) * 2}s`;

          return (
            <Link
              key={i}
              to={`/foundation/${data.slug}`}
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
              onTouchStart={() => {
                if (isMobile) {
                  handleTouch(i);
                }
              }}
              onClick={(e) => {
                if (isMobile && activeIndex !== i) {
                  e.preventDefault();
                  handleTouch(i);
                }
              }}
            >
              <div className={`absolute rounded-full blur-2xl -z-10 transition-all duration-300 ${isActive ? 'bg-blue-500/30 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' : 'bg-blue-200/0 w-0 h-0'}`}></div>
              <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl transition-transform duration-300 flex-shrink-0 ${isActive ? 'scale-125 -rotate-6' : 'hover:scale-110'}`}>{data.icon}</div>
              <span className={`font-bold text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-700 whitespace-nowrap transition-colors leading-tight ${isActive ? 'text-blue-700' : ''}`}>
                {data.title}
              </span>
            </Link>
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
// 🆕 INFOGRAPHIC 2: ORBITING CORE VALUES (FIXED ICONS)
// ==========================================
function SecondInfographic() {
  const items = [
    { 
      id: 1, title: "Analysis", desc: "Data driven", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg> 
    },
    { 
      id: 2, title: "Strategy", desc: "Roadmap", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 
    },
    { 
      id: 3, title: "Design", desc: "UI / UX", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg> 
    },
    { 
      id: 4, title: "Develop", desc: "Code build", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> 
    },
    { 
      id: 5, title: "Testing", desc: "QA checks", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> 
    },
    { 
      id: 6, title: "Deploy", desc: "Go live", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg> 
    },
    { 
      id: 7, title: "Monitor", desc: "Performance", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> 
    },
    { 
      id: 8, title: "Scale", desc: "Growth", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> 
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex justify-center items-center py-0">
      <style>{`
        /* --- Scoped CSS Variables --- */
        .orbit-infographic-root {
            --orbit-bg-dark: #0f172a;
            --orbit-box-bg: rgba(30, 41, 59, 0.9);
            --orbit-box-border: rgba(148, 163, 184, 0.3);
            --orbit-accent-primary: #38bdf8; /* Cyan */
            --orbit-accent-secondary: #818cf8; /* Indigo */
            --orbit-text-main: #f1f5f9;
            --orbit-text-sub: #94a3b8;
            --orbit-glow: 0 0 25px rgba(56, 189, 248, 0.6);
            /* Box Sizes */
            --orbit-box-width: 200px;
            --orbit-box-height: 180px;
        }

        .orbit-infographic-wrapper {
            position: relative;
            /* EXPANDED HORIZONTALLY: 1400px */
            width: 100%;
            max-width: 1400px; 
            height: 1400px; /* Square container */
            transform-style: preserve-3d;
            transform: rotateX(10deg);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0; /* Remove margin */
        }

        /* --- Rotating Decorative Rings --- */
        .orbit-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1px dashed rgba(56, 189, 248, 0.2);
            pointer-events: none;
        }

        .orbit-ring-1 {
            width: 650px;
            height: 650px;
            border-color: rgba(129, 140, 248, 0.15);
            animation: orbit-rotate-cw 20s linear infinite;
        }

        .orbit-ring-2 {
            width: 1050px;
            height: 1050px;
            border-color: rgba(56, 189, 248, 0.15);
            animation: orbit-rotate-ccw 30s linear infinite;
        }

        /* --- Center Node --- */
        .orbit-center-node {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 280px;
            height: 280px;
            background: linear-gradient(135deg, var(--orbit-accent-secondary), var(--orbit-accent-primary));
            border-radius: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.4);
            z-index: 10;
            animation: orbit-pulse 4s ease-in-out infinite;
        }

        .orbit-center-node h1 {
            font-size: 2.2rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1;
        }

        /* --- The 8 Orbiting Boxes --- */
        .orbit-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
        }

        .orbit-point-box {
            position: absolute;
            width: var(--orbit-box-width);
            height: var(--orbit-box-height);
            background: var(--orbit-box-bg);
            border: 1px solid var(--orbit-box-border);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            text-align: center;
            padding: 20px 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            top: 50%;
            left: 50%;
            margin-top: calc(var(--orbit-box-height) / -2); 
            margin-left: calc(var(--orbit-box-width) / -2); 
            transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            backface-visibility: hidden;
        }

        /* Hover Effect */
        .orbit-point-box:hover {
            background: rgba(56, 189, 248, 0.25);
            border-color: var(--orbit-accent-primary);
            box-shadow: var(--orbit-glow);
            cursor: pointer;
        }

        /* --- Icon Styling & Wrapper --- */
        .orbit-icon-wrapper {
            width: 60px;
            height: 60px;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 12px;
            transition: all 0.3s ease;
        }

        .orbit-point-box:hover .orbit-icon-wrapper {
            background: var(--orbit-accent-primary);
            box-shadow: 0 0 15px var(--orbit-accent-primary);
            border-color: #fff;
        }

        .orbit-point-box:hover .orbit-icon-wrapper svg {
            stroke: #fff; /* Change icon to white on hover */
        }

        /* Direct Icon Styling */
        .orbit-icon {
            color: var(--orbit-accent-primary);
            transition: color 0.3s ease;
        }

        .orbit-point-box h3 {
            font-size: 1.1rem;
            color: var(--orbit-text-main);
            margin-bottom: 6px;
            font-weight: 600;
        }

        .orbit-point-box p {
            font-size: 0.8rem;
            color: var(--orbit-text-sub);
            line-height: 1.3;
        }

        /* --- Positioning Logic --- */
        .orbit-pos-1 { transform: rotate(0deg) translate(525px) rotate(0deg); }
        .orbit-pos-2 { transform: rotate(45deg) translate(525px) rotate(-45deg); }
        .orbit-pos-3 { transform: rotate(90deg) translate(525px) rotate(-90deg); }
        .orbit-pos-4 { transform: rotate(135deg) translate(525px) rotate(-135deg); }
        .orbit-pos-5 { transform: rotate(180deg) translate(525px) rotate(-180deg); }
        .orbit-pos-6 { transform: rotate(225deg) translate(525px) rotate(-225deg); }
        .orbit-pos-7 { transform: rotate(270deg) translate(525px) rotate(-270deg); }
        .orbit-pos-8 { transform: rotate(315deg) translate(525px) rotate(-315deg); }

        /* --- Animations --- */
        @keyframes orbit-rotate-cw {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes orbit-rotate-ccw {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(0deg); }
        }

        @keyframes orbit-pulse {
            0% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.4); transform: translate(-50%, -50%) scale(1); }
            50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.7); transform: translate(-50%, -50%) scale(1.03); }
            100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.4); transform: translate(-50%, -50%) scale(1); }
        }

        /* --- Responsive Design --- */
        @media (max-width: 1450px) {
            .orbit-infographic-wrapper {
                height: auto;
                transform: none;
                flex-direction: column;
                padding-bottom: 40px;
            }

            .orbit-ring { display: none; }

            .orbit-container {
                position: relative;
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 30px;
            }

            .orbit-center-node {
                position: relative;
                top: auto;
                left: auto;
                transform: none !important;
                width: 100%;
                max-width: 300px;
                height: 120px;
                border-radius: 15px;
                margin-bottom: 10px;
                animation: none;
            }

            .orbit-point-box {
                position: relative;
                top: auto;
                left: auto;
                margin: 0;
                transform: none !important;
                width: 100%;
                height: auto;
                min-height: 140px;
            }
        }
      `}</style>

      <div className="orbit-infographic-root">
        <div className="orbit-infographic-wrapper">
            {/* Decorative Rings */}
            <div className="orbit-ring orbit-ring-1"></div>
            <div className="orbit-ring orbit-ring-2"></div>

            {/* Center Title */}
            <div className="orbit-center-node">
                <h1>Core</h1>
                <h1>Values</h1>
            </div>

            {/* Orbiting Container */}
            <div className="orbit-container">
                {items.map((item) => (
                    <article key={item.id} className={`orbit-point-box orbit-pos-${item.id}`}>
                        {/* Dedicated Space for Icon */}
                        <div className="orbit-icon-wrapper">
                            {/* Direct SVG Icon */}
                            <div className="orbit-icon">
                                {item.icon}
                            </div>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </article>
                ))}
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
