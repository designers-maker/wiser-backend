import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Animation Logic for whole page (Scroll Reveal)
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

  return (
    <main className="min-h-screen font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
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

          /* Background Blob Animation */
          @keyframes floatBlob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .bg-blob {
            animation: floatBlob 10s infinite ease-in-out;
          }

          /* Page Scroll Reveal Animation */
          .reveal-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal-on-scroll.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      {/* 
         SINGLE PAGE BACKGROUND (Blue & Orange)
      */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 -z-20" />
      
      {/* Animated Blue Blob */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] bg-blob -z-10" />
      
      {/* Animated Orange Blob */}
      <div className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-400/20 rounded-full blur-[100px] bg-blob -z-10" style={{ animationDelay: '2s' }} />

      {/* Floating Vertical Button on Left */}
      <button 
        onClick={() => navigate('/about/events')} 
        className="fixed left-0 top-1/4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 px-2 rounded-r-2xl shadow-2xl transition-all hover:pl-3 hover:scale-105 duration-300" 
        style={{ writingMode: 'vertical-rl', transform: 'scaleX(-1)' }}
      >
        <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>Upcoming Events</span>
      </button>

      {/* 1. Hero Section */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden reveal-on-scroll">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/images/1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 text-center space-y-6 px-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold tracking-wide uppercase animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Welcome to Wiser
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-2xl">
            Be The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Future</span>. <br />
            <span className="text-white">Serve Today.</span>
          </h1>
          
          <button
            onClick={() => navigate('/volunteer')}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-orange-500/40"
            style={{ background: 'linear-gradient(to right, #2563eb, #ea580c)' }}
          >
            <span className="absolute w-64 h-64 mt-12 group-hover:-rotate-45 group-hover:-mt-24 transition-all duration-1000 ease-out -translate-x-56 bg-white opacity-20 rotate-45 block"></span>
            <span className="relative z-10">Volunteer with Wiser</span>
          </button>
        </div>
      </section>

      {/* 2. OUR PROGRAMS - Updated Hover Design */}
      <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-10 space-y-8 reveal-on-scroll">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
           <div className="h-16 w-2 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full shadow-lg"></div>
           <div>
             <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-1 block">What We Do</span>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Programs</span></h2>
           </div>
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

      {/* 3. Videos Section */}
      <section className="w-full py-12 reveal-on-scroll">
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

      {/* 4. Our Projects (With Animated Numbers) */}
      <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-16 reveal-on-scroll">
        <div 
          className="flex items-center gap-4 mb-12 cursor-pointer group w-max" 
          onClick={() => navigate('/projects')}
        >
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

          {/* Stats with Animated Counters */}
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

      {/* 5. Our Rock-solid Partners */}
      <section className="w-full py-12 overflow-hidden relative reveal-on-scroll">
        <div className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto mb-8">
           <div className="text-center space-y-3">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 text-blue-700 font-bold text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
                Our Network
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
                Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-500">Industry Leaders</span>
              </h2>
           </div>
        </div>
        
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-12 animate-scroll-x items-center">
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
                className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#eff6ff] via-transparent to-[#fff7ed] pointer-events-none"></div>
        </div>
      </section>

      {/* 6. We've been certified by */}
      <section className="w-full py-20 relative reveal-on-scroll">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-12">
          
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-orange-600 pb-2">
            Certified Excellence
          </h2>
          
          <div className="flex flex-wrap gap-8 md:gap-12 items-center justify-center">
            {['cert1', 'cert2', 'cert3', 'cert4'].map((cert, i) => (
              <div key={i} className="relative group">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                
                <img 
                  src={`/certs/${i % 2 === 0 ? '1.png' : '3.png'}`} 
                  alt={`Certification ${i + 1}`} 
                  className="relative h-12 md:h-16 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-110" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}

// Helper Component for Project Images
function ProjectImage({ title, img, to }) {
  return (
    <Link 
      to={to}
      className="text-left group w-full transition-transform duration-300 block"
    >
      <div className="relative overflow-hidden rounded-2xl mb-3 shadow-lg">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-32 md:h-40 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white font-bold text-sm">View Details</span>
        </div>
      </div>
      <p className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">{title}</p>
    </Link>
  );
}

// Helper Component for Program Cards (Updated Hover Design)
function ProgramCard({ title, image, to, navigate }) {
  return (
    <button
      onClick={() => navigate(to)}
      className="text-left w-full transition-all duration-300 hover:-translate-y-2 group"
    >
      <div className="relative overflow-hidden rounded-3xl mb-4 shadow-xl h-56 md:h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* 
           ✅ NEW HOVER DESIGN:
           - Blue to Orange Gradient Overlay
           - Text "Explore [Title]"
           - White "Learn More" Button
        */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 to-orange-500/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6">
           
           {/* Program Title inside overlay */}
           <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             Explore {title}
           </h3>
           
           {/* Learn More Button */}
           <span className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-orange-100">
             Learn More &rarr;
           </span>
        </div>
      </div>
      
      {/* External Title (Remains same) */}
      <p className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{title}</p>
    </button>
  );
}

// ✅ UPDATED ANIMATED COUNTER COMPONENT (Robust 0 to Actual)
function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp = null;
    // Extract numeric value safely (e.g., "10000+" -> 10000)
    const endValue = parseInt(end.replace(/\D/g, '')) || 0; 
    const suffix = end.replace(/[\d]/g, ''); // Keep "+" if exists

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      // Calculate progress (0 to 1)
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease-out-expo function for a nice finish
      const easeOutExpo = (x) => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };
      
      const currentCount = Math.floor(easeOutExpo(progress) * endValue);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue); // Ensure final number is exact
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{typeof end === 'string' && end.includes('+') ? `${count}+` : count}</>;
}

// Helper Component for Stats Cards
function StatCard({ value, label, color }) {
  // Map basic colors to specific gradient classes
  let textGradient = "from-slate-700 to-slate-900"; // Default fallback
  if (color.includes('blue')) textGradient = "from-blue-600 to-blue-400";
  if (color.includes('orange')) textGradient = "from-orange-600 to-orange-400";
  if (color.includes('green')) textGradient = "from-green-600 to-green-400";
  if (color.includes('purple')) textGradient = "from-purple-600 to-purple-400";
  if (color.includes('red')) textGradient = "from-red-600 to-red-400";
  if (color.includes('indigo')) textGradient = "from-indigo-600 to-indigo-400";

  return (
    <div className="group bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
      {/* Subtle gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Using AnimatedCounter here */}
      <p className={`relative z-10 text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b ${textGradient} mb-2`}>
        <AnimatedCounter end={value} duration={2500} />
      </p>
      <p className="relative z-10 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide group-hover:text-slate-700 transition-colors">{label}</p>
    </div>
  );
}