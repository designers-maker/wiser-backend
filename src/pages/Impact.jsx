import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Impact() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. Hero Header Section - No Badge */}
      <section className="relative pt-24 pb-12 px-4 text-center overflow-hidden">
        
        {/* Decorative Abstract Shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Making a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Real Difference</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We measure impact through outcomes, reach and sustained improvements. Here are a few headline metrics that define our journey.
          </p>
        </div>
      </section>

      {/* 2. Stats Section - Modern Card Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Stat Card 1: Lives Impacted */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full transition-transform duration-500 group-hover:scale-150"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-3xl shadow-lg">
                ❤️
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 mb-2">
                  <AnimatedCounter end={'50000+'} duration={2500} />
                </p>
                <p className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-wider">Lives Impacted</p>
              </div>
            </div>
          </div>

          {/* Stat Card 2: Students Supported */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full transition-transform duration-500 group-hover:scale-150"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-3xl shadow-lg">
                📚
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mb-2">
                  <AnimatedCounter end={'5000+'} duration={2200} />
                </p>
                <p className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-wider">Students Supported</p>
              </div>
            </div>
          </div>

          {/* Stat Card 3: Active Volunteers */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full transition-transform duration-500 group-hover:scale-150"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg">
                🤝
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">
                  <AnimatedCounter end={'200+'} duration={2000} />
                </p>
                <p className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-wider">Active Volunteers</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Impact Notes - Centered Alignment, No Icon */}
      <section className="w-full max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-3xl p-12 md:p-20 shadow-xl border border-slate-100 text-center flex flex-col justify-center items-center relative overflow-hidden">
          
          {/* Icon REMOVED as requested */}
          
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-8">
            Impact Notes
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
            These figures represent cumulative impact across programs and partnerships. We are committed to transparency and continuous improvement in our initiatives.
          </p>

          {/* Decorative Circle Background */}
          <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-64 h-64 rounded-full bg-red-50 opacity-30 blur-3xl pointer-events-none"></div>
        </div>
      </section>

    </main>
  );
}