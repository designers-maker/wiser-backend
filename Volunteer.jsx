import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Volunteer() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. Header Section - NO IMAGE, Clean Typography */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-visible">
        
        {/* Background Decoration (Abstract Shapes) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Volunteer <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">With Us</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join us as a volunteer and help create real impact in community.
          </p>

          {/* Buttons Section */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* 1. Corporate Volunteering Button */}
            <button
              onClick={() => navigate('/volunteer/csr')}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-red-500/40"
              style={{ background: 'linear-gradient(to right, #dc2626, #ea580c)' }}
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-out"></span>
              <span className="relative z-10">Corporate Volunteering</span>
            </button>

            {/* 2. Individual Volunteering Button */}
            <button
              onClick={() => navigate('/volunteer/form')}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-red-500/40"
              style={{ background: 'linear-gradient(to right, #dc2626, #ea580c)' }}
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-out"></span>
              <span className="relative z-10">Individual Volunteering</span>
            </button>

            {/* 3. Request for Volunteering Button */}
            <button
              onClick={() => navigate('/volunteer/request')}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-red-500/40"
              style={{ background: 'linear-gradient(to right, #dc2626, #ea580c)' }}
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-out"></span>
              <span className="relative z-10">Request for Volunteering</span>
            </button>

          </div>
        </div>
      </section>

      {/* 2. Content Section - Grid Layout with Same Size Cards */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        
        {/* items-stretch ensures both columns stretch to same height */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Left: Why Volunteer */}
          <div className="bg-white p-8 md:p-5 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">💡</div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Why Volunteer?</h3>
            </div>
            
            <div className="space-y-6 flex-grow">
              {[
                { icon: '⏱️', title: 'Contribute Time', text: 'Contribute time and skills to meaningful projects.' },
                { icon: '🤝', title: 'Supportive Team', text: 'Work with a supportive team and mentors.' },
                { icon: '📈', title: 'Career Growth', text: 'Build experience that strengthens your career profile.' },
                { icon: '❤️', title: 'Community Impact', text: 'Make a positive difference in your community.' },
                { icon: '🌐', title: 'Networking', text: 'Network with like-minded individuals.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group hover:bg-slate-50 p-4 rounded-2xl transition-colors duration-300 cursor-default">
                  <div className="flex-shrink-0 text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-600 mt-1 text-sm md:text-base">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: How to Start */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-7 md:p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden h-full flex flex-col">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-red-600 opacity-10 blur-3xl"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-2xl">🚀</div>
              <h3 className="text-2xl md:text-3xl font-bold">How to get started</h3>
            </div>
            
            <div className="space-y-6 flex-grow">
              <div className="relative pl-8 border-l-2 border-slate-600 pb-6 last:pb-0 last:border-0">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-red-500 border-2 border-slate-900"></div>
                <h4 className="font-bold text-lg text-yellow-400 mb-1">Step 1: Register</h4>
                <p className="text-slate-300 text-sm md:text-base">Fill out volunteer form with your details, interests, and availability.</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-slate-600 pb-6 last:pb-0 last:border-0">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-orange-500 border-2 border-slate-900"></div>
                <h4 className="font-bold text-lg text-yellow-400 mb-1">Step 2: Review</h4>
                <p className="text-slate-300 text-sm md:text-base">Our team will review your profile and get back to you within 2-3 business days.</p>
              </div>

              <div className="relative pl-8 border-l-2 border-slate-600 pb-6 last:pb-0 last:border-0">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900"></div>
                <h4 className="font-bold text-lg text-yellow-400 mb-1">Step 3: Start</h4>
                <p className="text-slate-300 text-sm md:text-base">Once approved, you'll be onboarded and ready to make a difference!</p>
              </div>
            </div>

            {/* Button at bottom of card */}
            <div className="mt-6">
              <button 
                onClick={() => navigate('/volunteer/form')}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>Apply Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTIONS BELOW REMOVED AS REQUESTED */}
      
    </main>
  );
}