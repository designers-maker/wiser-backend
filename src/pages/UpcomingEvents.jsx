import React, { useState, useEffect, useRef } from 'react';

// Original Data
const events = [
  { 
    title: 'Volunteer Drive', 
    img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800', 
    duration: '10 Jan 2026', 
    location: 'Mumbai',
    description: 'Join hundreds of volunteers for a day of service, cleaning, and community support. Bring your energy!'
  },
  { 
    title: 'Community Workshop', 
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800', 
    duration: '20 Feb 2026', 
    location: 'Pune',
    description: 'Learn new skills, network with local leaders, and discuss ways to improve our neighborhood facilities.'
  },
  { 
    title: 'Charity Marathon', 
    img: 'https://images.unsplash.com/photo-1552674605-46952368d0ee?auto=format&fit=crop&q=80&w=800', 
    duration: '15 Mar 2026', 
    location: 'Delhi',
    description: 'Run for a cause! All proceeds go to local schools. Open to runners of all levels and ages.'
  },
];

// Reusable Icon Component
const Icon = ({ path, className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
  </svg>
);

export default function UpcomingEvents() {
  // Helper to split date string for badge
  const getBadgeDate = (dateStr) => {
    const parts = dateStr.split(' ');
    return { day: parts[0], month: parts[1] };
  };

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-card').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col overflow-visible">

      {/* Custom Styles */}
      <style jsx global>{`
        /* --- Fade In Up Animation --- */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* --- Blob Float Animation --- */
        @keyframes floatBlob {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(10deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* --- Pulse Animation for Badges --- */
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }

        .reveal-card {
          opacity: 0;
          /* Will be filled in by JS based on index */
          animation: none; 
        }

        .reveal-card.is-visible {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-blob {
          animation: floatBlob 10s ease-in-out infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section with Animated Background */}
        <header className="relative bg-indigo-600 text-white pt-20 pb-24 px-4 overflow-hidden">
          {/* Hero Background Decor */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Radial Gradients */}
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,rgba(255,255,255,0.1)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(99,102,241,0.3)_0px,transparent_50%)]"></div>
             
             {/* Animated SVG Blobs */}
             <svg className="absolute top-10 left-10 w-64 h-64 text-indigo-500 opacity-30 animate-blob" fill="currentColor" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50"/>
             </svg>
             <svg className="absolute bottom-10 right-10 w-80 h-80 text-white opacity-10 animate-blob" style={{animationDelay: '2s'}} fill="currentColor" viewBox="0 0 100 100">
                <rect x="0" y="0" width="100" height="100" rx="20"/>
             </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-semibold uppercase tracking-wider mb-6 animate-bounce">
              2026 Schedule
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Upcoming <span className="text-amber-400">Community</span> Events
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
              Connect, learn, and contribute. Join us for a series of inspiring gatherings designed to make a real difference in your community.
            </p>
          </div>

          {/* Curve Separator */}
          <div className="absolute bottom-0 left-0 right-0">
             <svg className="w-full h-auto text-slate-50" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
             </svg>
          </div>
        </header>

        {/* Events Grid Section */}
        <section className="container mx-auto px-4 py-16 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((e, index) => {
              const { day, month } = getBadgeDate(e.duration);
              
              return (
                <EventCard 
                  key={e.title} 
                  event={e}
                  day={day}
                  month={month}
                  // Pass index for staggered animation
                  index={index} 
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

// Sub-component for Card
function EventCard({ event, day, month, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <article 
      // We add the reveal-card class here. We set animation delay dynamically via style
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col overflow-hidden border border-slate-100 reveal-card"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-slate-200">
        <img 
          src={event.img} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Date Badge with Pulse Ring */}
        <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur text-slate-800 p-3 rounded-xl text-center shadow-lg z-10 min-w-[70px] border border-slate-100 group-hover:scale-110 transition-transform duration-300 ${isExpanded ? 'animate-pulse-ring' : ''}`}>
          <span className="block text-2xl font-bold text-indigo-600 leading-none">{day}</span>
          <span className="block text-xs font-bold text-slate-500 uppercase mt-1 tracking-wide">{month}</span>
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className="text-white text-sm font-medium">{event.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">{event.title}</h3>
        
        {/* Description with Smooth Height Toggle */}
        <div className="mb-4">
          <p 
            className={`text-slate-500 text-sm leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-40 opacity-100' : 'max-h-10 opacity-90'
            }`}
          >
            {event.description}
          </p>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold uppercase tracking-wide self-start mt-2 transition-transform hover:translate-x-1 inline-block"
          >
            {isExpanded ? 'Show Less' : 'Read More...'}
          </button>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <Icon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4 text-indigo-500 group-hover:animate-spin" />
            {event.duration}
          </div>
          {/* Arrow Removed */}
        </div>
      </div>
    </article>
  );
}