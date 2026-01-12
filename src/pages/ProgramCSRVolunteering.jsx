import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgramCSRVolunteering() {
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
    // Close existing first to ensure clean state
    closeMediaModal();
    
    // Small delay to allow close to process
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
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/images/3.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        {/* Main Content Container */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
          
          {/* Education For Everyone Pill */}
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

      {/* Media Modal - Fixed z-index and Back Button */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={closeMediaModal}>
          <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
            
            {/* Back Button (Top Left) */}
            <button
              onClick={closeMediaModal}
              className="absolute -top-16 left-0 text-white font-bold flex items-center gap-2 text-lg hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </button>

            {/* Close Button (Top Right) */}
            <button
              onClick={closeMediaModal}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-transform hover:rotate-90 duration-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {mediaType === 'image' ? (
                <img src={mediaSrc} alt={mediaAlt} className="w-full h-[75vh] object-contain" />
              ) : (
                <video
                  ref={mediaVideoRef}
                  src={mediaSrc}
                  poster={mediaPoster}
                  controls
                  autoPlay
                  className="w-full h-[75vh] object-contain"
                />
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

        {/* Partnership Process - Styled Grid */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Partnership Process</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold mb-2">1</div>
              <h4 className="font-bold text-slate-900">Consultation</h4>
              <p className="text-sm text-slate-600">Understand your CSR goals</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold mb-2">2</div>
              <h4 className="font-bold text-slate-900">Design</h4>
              <p className="text-sm text-slate-600">Custom program design</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold mb-2">3</div>
              <h4 className="font-bold text-slate-900">Execute</h4>
              <p className="text-sm text-slate-600">Coordinate activities</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold mb-2">4</div>
              <h4 className="font-bold text-slate-900">Report</h4>
              <p className="text-sm text-slate-600">Track & report impact</p>
            </div>
          </div>
        </div>

        {/* Impact Stats - Title Inside Box */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-br from-red-500 to-orange-600 rounded-[1.8rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-tight">Our Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="text-5xl font-black mb-2 tracking-tight">100+</div>
                  <div className="text-red-100 font-medium uppercase tracking-wider text-sm">Corporate Partners</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="text-5xl font-black mb-2 tracking-tight">5000+</div>
                  <div className="text-red-100 font-medium uppercase tracking-wider text-sm">Employees Engaged</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="text-5xl font-black mb-2 tracking-tight">50000+</div>
                  <div className="text-red-100 font-medium uppercase tracking-wider text-sm">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Types - Grid Layout */}
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
                <img 
                  src="/images/3.jpg" 
                  alt="Workshop" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
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
                <img 
                  src="/images/4.jpg" 
                  alt="Camp" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
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

        {/* How to Get Involved */}
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold">How to Get Your Organization Involved</h3>
            <p className="text-blue-100 text-lg">
              We work with organizations of all sizes to create customized CSR programs that align with
              your corporate values and social impact goals. Our team handles all coordination and logistics.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Contact Us
            </button>
          </div>
        </div>

        {/* Corporate Success Stories - Text Only Styled Cards */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Corporate Success Stories</h3>
          </div>

          {/* Grid for Side by Side alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Story Card 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">
                
                {/* Left Side: Media Stack */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div 
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('video', '/videos/nasscom.mp4', 'School Video 1', '/images/g1.jpg'); }}
                  >
                    <img src="/images/g1.jpg" alt="Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                       <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2.5 rounded-full group-hover:bg-white/30 transition-colors">
                         <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-xs font-semibold">Watch Video</div>
                  </div>
                  
                  <div 
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/2.jpg', 'Story Image 1'); }}
                  >
                    <img src="/images/2.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                       <span className="bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm transform scale-90 group-hover:scale-100 transition-transform">View Photo</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Text */}
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

            {/* Story Card 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">
                
                {/* Left Side: Media Stack */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div 
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('video', '/videos/nasscom.mp4', 'School Video 2', '/images/g2.jpg'); }}
                  >
                    <img src="/images/g2.jpg" alt="Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                       <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2.5 rounded-full group-hover:bg-white/30 transition-colors">
                         <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-xs font-semibold">Watch Video</div>
                  </div>
                  
                  <div 
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/3.jpg', 'Story Image 2'); }}
                  >
                    <img src="/images/3.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                       <span className="bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm transform scale-90 group-hover:scale-100 transition-transform">View Photo</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Text */}
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

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContactForm(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Get Your Organization Involved</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log({ name: contactName, email: contactEmail, message: contactMessage });
                setShowContactForm(false);
                setContactName(''); setContactEmail(''); setContactMessage('');
              }}
            >
              <input
                value={contactName} onChange={(e) => setContactName(e.target.value)}
                type="text" placeholder="Your Name" required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <input
                value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                type="email" placeholder="Your Email" required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <textarea
                value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Your Message" rows={4} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

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
              onClick={() => navigate('/learn-more')}
            >
              Learn More
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