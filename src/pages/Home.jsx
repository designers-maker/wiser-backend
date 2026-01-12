import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Home() {
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const hdr = document.querySelector('header');
    function updateHeaderHeight() {
      if (hdr) setHeaderHeight(hdr.offsetHeight);
    }
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      
      {/* CSS Animation for Infinite Scroll */}
      <style>
        {`
          @keyframes scroll-x {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-x {
            animation: scroll-x 30s linear infinite;
          }
          .animate-scroll-x:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Floating Vertical Button on Left */}
      <button 
        onClick={() => navigate('/about/events')} 
        className="fixed left-0 top-1/4 z-50 bg-blue-600 hover:bg-orange-600 text-white font-bold py-4 px-2 rounded-r-2xl shadow-2xl transition-all hover:pl-3 hover:scale-105 duration-300" 
        style={{ writingMode: 'vertical-rl', transform: 'scaleX(-1)' }}
      >
        <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>Upcoming Events</span>
      </button>

      {/* 1. Hero Section - Updated Button */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/images/1.jpg')" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        
        <div className="relative z-10 text-center space-y-6 px-4">
          
          {/* Pill Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold tracking-wide uppercase animate-pulse">
            Welcome to Wiser
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-2xl">
            Be The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Future Serve Today.</span> <br />
            
          </h1>
          
          {/* ✅ More Attractive Animated Button */}
          <button
            onClick={() => navigate('/volunteer')}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-red-500/40"
            style={{ background: 'linear-gradient(to right, #dc2626, #ea580c)' }}
          >
            <span className="absolute w-64 h-64 mt-12 group-hover:-rotate-45 group-hover:-mt-24 transition-all duration-1000 ease-out -translate-x-56 bg-white opacity-20 rotate-45 block"></span>
            <span className="relative z-10">Volunteer with Wiser</span>
          </button>
        </div>
      </section>

      {/* 2. OUR PROGRAMS */}
      <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-10 space-y-8">
        <div className="flex items-center gap-2 mb-6">
           <div className="h-1 w-10 bg-red-600 rounded-full"></div>
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Our Programs</h2>
        </div>
        
        <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-3">
          <ProgramCard
            title="Teach"
            image="/images/1.jpg"
            to="/programs/teach"
            navigate={navigate}
          />
          <ProgramCard
            title="School Volunteering"
            image="/images/2.jpg"
            to="/programs/school-volunteering"
            navigate={navigate}
          />
          <ProgramCard
            title="CSR Volunteering"
            image="/images/3.jpg"
            to="/programs/csr-volunteering"
            navigate={navigate}
          />
        </div>
      </section>

      {/* 3. Videos Section - Reduced Padding (Space Removed) */}
      <section className="w-full bg-white py-2">
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto space-y-2">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Watch How We Work</h2>
            <p className="text-slate-600 text-lg">See our volunteers in action making a real difference.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
              <iframe
                className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                src="https://www.youtube.com/embed/BIQBqlFa91g"
                title="Wiser Volunteer Video 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
              <iframe
                className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                src="https://www.youtube.com/embed/BIQBqlFa91g"
                title="Wiser Volunteer Video 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
              <iframe
                className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                src="https://www.youtube.com/embed/BIQBqlFa91g"
                title="Wiser Volunteer Video 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Projects: Photos + Styled Stats */}
      <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-11">
        <div className="flex items-center gap-2 mb-10">
           <div className="h-1 w-10 bg-red-600 rounded-full"></div>
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Our Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: clickable project photos */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <ProjectImage
              title="Education for All"
              img="/images/1.jpg"
              to="/projects/details/1"
            />
            <ProjectImage
              title="Health & Wellness"
              img="/images/5.jpg"
              to="/projects/details/2"
            />
            <ProjectImage
              title="Skill Development"
              img="/images/9.jpg"
              to="/projects/details/3"
            />
            <ProjectImage
              title="Community Outreach"
              img="/images/13.jpg"
              to="/projects/details/4"
            />
          </div>

          {/* Right: Redesigned Stats (Grid of Cards) */}
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

      {/* 5. Our Rock-solid Partners: Clean Background (Gray/White) */}
      <section className="w-full bg-slate-50 py-2 overflow-hidden relative">
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Our Rock-solid Partners</h2>
        </div>
        
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-12 animate-scroll-x items-center">
            {/* Duplicate logos to create seamless loop */}
            {[
              'partner1', 'partner2', 'partner3', 'partner4', 'partner5',
              'partner1', 'partner2', 'partner3', 'partner4', 'partner5',
              'partner1', 'partner2', 'partner3', 'partner4', 'partner5',
              'partner1', 'partner2', 'partner3', 'partner4', 'partner5'
            ].map((name, i) => (
              <img
                key={i}
                src={`/logos/${name}.png`}
                alt={`Partner ${i + 1}`}
                className="h-12 md:h-16 w-auto object-contain"
              />
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 pointer-events-none"></div>
        </div>
      </section>

      {/* 6. We've been certified by */}
      <section className="w-full py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">We've been certified by</h2>
          
          <div className="flex flex-wrap gap-8 md:gap-12 items-center justify-center">
            {[
              'cert1', 'cert2', 'cert3', 'cert4'
            ].map((cert, i) => (
              <img 
                key={i} 
                src={`/certs/${i % 2 === 0 ? '1.png' : '3.png'}`} 
                alt={`Certification ${i + 1}`} 
                className="h-16 md:h-20 object-contain drop-shadow-lg transition-transform hover:scale-110 duration-300" 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* ✅ "Ready to make a difference?" REMOVED AS REQUESTED */}

    </main>
  );
}

// Helper Component for Project Images
function ProjectImage({ title, img, to }) {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(to)} 
      className="text-left group w-full transition-transform duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl mb-3 shadow-lg">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-32 md:h-40 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
      </div>
      <p className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-red-600 transition-colors">{title}</p>
    </button>
  );
}

// Helper Component for Program Cards
function ProgramCard({ title, image, to, navigate }) {
  return (
    <button
      onClick={() => navigate(to)}
      className="text-left w-full transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden rounded-3xl mb-4 shadow-xl group">
        <img
          src={image}
          alt={title}
          className="w-full h-56 md:h-64 object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
           <span className="text-white font-bold text-lg">Learn More &rarr;</span>
        </div>
      </div>
      <p className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">{title}</p>
    </button>
  );
}

// Helper Component for Stats Cards (Redesigned)
function StatCard({ value, label, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <p className={`text-3xl sm:text-4xl font-black ${color} mb-1`}>
        <AnimatedCounter end={value} duration={2000} />
      </p>
      <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}