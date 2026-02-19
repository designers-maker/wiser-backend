import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgramSchoolVolunteering() {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMessage, setContactMessage] = React.useState('');
  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);
  const [mediaType, setMediaType] = React.useState('image');
  const [mediaSrc, setMediaSrc] = React.useState('');
  const [mediaAlt, setMediaAlt] = React.useState('');
  const [mediaPoster, setMediaPoster] = React.useState('');
  const mediaVideoRef = React.useRef(null);

  // --- STATE FOR IMPACT ANIMATION ---
  const [impactCounts, setImpactCounts] = React.useState({ students: 0, volunteers: 0, schools: 0 });
  const [isImpactVisible, setImpactVisible] = React.useState(false);
  const impactRef = React.useRef(null);
  // ----------------------------------

  // Animation State
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);
  const hasAnimatedRef = React.useRef(false);

  // --- OBSERVER LOGIC ---
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setIsVisible(true);
          hasAnimatedRef.current = true;
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // --- OBSERVER & COUNTER LOGIC FOR IMPACT ---
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImpactVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (impactRef.current) observer.observe(impactRef.current);
    return () => {
      if (impactRef.current) observer.unobserve(impactRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!isImpactVisible) return;

    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = duration / 1000 * frameRate;

    let frame = 0;
    const targets = {
      students: 2000,
      volunteers: 150,
      schools: 40
    };

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - (1 - progress) * (1 - progress);

      setImpactCounts({
        students: Math.floor(ease * targets.students),
        volunteers: Math.floor(ease * targets.volunteers),
        schools: Math.floor(ease * targets.schools),
      });

      if (frame >= totalFrames) {
        clearInterval(counter);
        setImpactCounts(targets);
      }
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [isImpactVisible]);
  // --------------------------------------------

  // Handle Escape key to close modal
  React.useEffect(() => {
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

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      
      {/* Standard Style Block for Animation */}
      <style>{`
        .roadmap-line-fill {
          width: 0%;
          transition: width 1.5s ease-out;
        }
        .roadmap-container.visible .roadmap-line-fill {
          width: 100%;
        }
        
        .roadmap-box {
          transform: translateY(30px);
          opacity: 0;
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .roadmap-container.visible .roadmap-box {
          transform: translateY(0);
          opacity: 1;
        }

        .roadmap-container.visible .delay-1 { transition-delay: 0.1s; }
        .roadmap-container.visible .delay-2 { transition-delay: 0.3s; }
        .roadmap-container.visible .delay-3 { transition-delay: 0.5s; }
        .roadmap-container.visible .delay-4 { transition-delay: 0.7s; }

        @media (max-width: 768px) {
          .roadmap-line-fill {
            width: 100%;
            height: 0%;
            transition: height 1.5s ease-out;
          }
          .roadmap-container.visible .roadmap-line-fill {
            height: 100%;
          }
        }

        /* ANIMATIONS FOR IMPACT SECTION */
        .impact-title {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .impact-visible .impact-title {
          opacity: 1;
          transform: translateY(0);
        }

        .impact-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .impact-visible .impact-card {
          opacity: 1;
          transform: translateY(0);
        }

        .impact-visible .impact-delay-1 { transition-delay: 0.2s; }
        .impact-visible .impact-delay-2 { transition-delay: 0.4s; }
        .impact-visible .impact-delay-3 { transition-delay: 0.6s; }

        .impact-card:hover {
          transform: translateY(-10px) scale(1.03);
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>

      {/* Hero Section - Fixed Height to prevent cropping */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/images/2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-semibold tracking-wide uppercase animate-pulse">
            Education For Everyone
          </div>
          {/* Updated Title with Gradient and improved spacing */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] sm:leading-[1.15] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            School Volunteering
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Supporting students in government and low-income schools through dedicated volunteering
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
            <div className="bg-black rounded-2xl overflow-visible shadow-2xl border border-white/10">
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
        
        {/* About Section - Gradient Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Fixed Cropping: Added leading-snug/tight adjustment and px padding */}
          <h2 className="px-2 text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-tight sm:leading-snug">
            About School Volunteering Program
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Our School Volunteering Program brings passionate volunteers directly into schools serving
            underprivileged communities. Volunteers work collaboratively with teachers to provide
            extra support, tutoring, and mentorship to students, creating a nurturing environment
            that helps them reach their full potential.
          </p>
        </div>

        {/* Features - Glass Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 text-2xl">📋</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">What Volunteers Do</h3>
              <ul className="space-y-4">
                {['Assist students with academics in small groups', 'Conduct activity-based learning sessions', 'Support skill development programs', 'Organize sports and extracurricular activities', 'Mentor students for career guidance'].map((item, i) => (
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
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 text-2xl">✨</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Program Benefits</h3>
              <ul className="space-y-4">
                {['Flexible volunteer schedules (part-time/full-time)', 'Comprehensive training provided', 'Direct impact on student performance', 'Build meaningful relationships with students', 'Certificate of appreciation upon completion'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ANIMATED ROADMAP - Gradient Title */}
        <div ref={sectionRef} className={`roadmap-container w-full max-w-6xl mx-auto transition-all ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">How It Works</h3>
          </div>

          <div className="relative w-full py-8">
            <div className="hidden md:block absolute top-[30%] left-0 right-0 h-1 bg-slate-200 z-0 rounded"></div>
            <div className="hidden md:block absolute top-[30%] left-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 z-0 rounded roadmap-line-fill"></div>

            <div className="md:hidden absolute left-[20px] top-0 bottom-0 w-1 bg-slate-200 z-0 rounded"></div>
            <div className="md:hidden absolute left-[20px] top-0 w-1 bg-gradient-to-b from-orange-400 to-yellow-400 z-0 rounded roadmap-line-fill"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="roadmap-box delay-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-200 text-slate-400 font-bold mb-4 flex items-center justify-center shadow-sm z-10">1</div>
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl w-full shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Register</h4>
                  <p className="text-sm text-slate-600">Sign up as a volunteer</p>
                </div>
              </div>

              <div className="roadmap-box delay-2 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-200 text-slate-400 font-bold mb-4 flex items-center justify-center shadow-sm z-10">2</div>
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl w-full shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Train</h4>
                  <p className="text-sm text-slate-600">Receive orientation & training</p>
                </div>
              </div>

              <div className="roadmap-box delay-3 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-200 text-slate-400 font-bold mb-4 flex items-center justify-center shadow-sm z-10">3</div>
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl w-full shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Contribute</h4>
                  <p className="text-sm text-slate-600">Start volunteering at schools</p>
                </div>
              </div>

              <div className="roadmap-box delay-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-200 text-slate-400 font-bold mb-4 flex items-center justify-center shadow-sm z-10">4</div>
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl w-full shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Impact</h4>
                  <p className="text-sm text-slate-600">See students thrive</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ANIMATED IMPACT SECTION (White Text) --- */}
        <div 
          ref={impactRef} 
          className={`relative w-full max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ${isImpactVisible ? 'impact-visible' : ''}`}
        >
          <div className="bg-gradient-to-br from-red-600 to-red-500 p-10 md:p-16 text-white relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center">
              {/* Explicitly White Text */}
              <h3 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight impact-title text-white">Our Impact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="impact-card impact-delay-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-lg cursor-default">
                  <span className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-white">
                    {impactCounts.students}+
                  </span>
                  <span className="text-white/90 font-semibold uppercase tracking-wider text-xs md:text-sm text-center leading-tight">
                    Students Reached
                  </span>
                </div>

                <div className="impact-card impact-delay-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-lg cursor-default">
                  <span className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-white">
                    {impactCounts.volunteers}+
                  </span>
                  <span className="text-white/90 font-semibold uppercase tracking-wider text-xs md:text-sm text-center leading-tight">
                    Active Volunteers
                  </span>
                </div>

                <div className="impact-card impact-delay-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-lg cursor-default">
                  <span className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-white">
                    {impactCounts.schools}+
                  </span>
                  <span className="text-white/90 font-semibold uppercase tracking-wider text-xs md:text-sm text-center leading-tight">
                    Partner Schools
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program in Action - Gradient Title */}
        <div className="space-y-8">
          <div className="text-center">
            {/* Fixed Cropping: Added px-2 and adjusted leading */}
            <h3 className="px-2 text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-tight sm:leading-snug">
              Program in Action
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/2.jpg', 'School Activity 1'); }}>
                <img src="/images/2.jpg" alt="School Activity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mb-2"><span>📅</span> Feb 2024 — Apr 2024</div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">Classroom Tutoring Drive</h4>
                <p className="text-slate-500 mt-2 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Thane</p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/3.jpg', 'School Activity 2'); }}>
                <img src="/images/3.jpg" alt="Sessions" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5,12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mb-2"><span>📅</span> May 2024 — Jul 2024</div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">After-school Remedial Sessions</h4>
                <p className="text-slate-500 mt-2 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Nashik</p>
              </div>
            </div>
          </div>
        </div>

        {/* REMOVED: How to Get Involved Section */}

        {/* Volunteer Stories - Gradient Title */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Volunteer Stories</h3>
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

      {/* Call to Action - Updated Buttons */}
      <section className="w-full bg-slate-900 py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Join Our School Volunteering Program</h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Your dedication can transform lives of hundreds of students. Apply today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-red-900/20"
              onClick={() => navigate('/volunteer')}
            >
              Volunteer Now
            </button>
            {/* New Donate Now Button */}
            <button 
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              onClick={() => navigate('/donate')}
            >
              Donate Now
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