import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter'; // Adjust path if needed

export default function MissionVisionValues() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-12 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          Mission, Vision & <span className="text-red-700">Values</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Driving change through education, opportunity, and unwavering commitment.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-20 max-w-6xl">

        {/* Mission Section */}
        <section className="relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-red-600 rounded-full"></span> Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to enable education and opportunity for disadvantaged children through volunteer-led programs, partnerships, and community initiatives.
              </p>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="group bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600 hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl">
                  <div className="mb-4 bg-red-50 w-14 h-14 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter end={'5000+'} duration={2500} />
                  </p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Students Reached</p>
                </div>
                {/* Card 2 */}
                <div className="group bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500 hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl">
                  <div className="mb-4 bg-red-50 w-14 h-14 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter end={'200+'} duration={2200} />
                  </p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Volunteers</p>
                </div>
                {/* Card 3 */}
                <div className="group bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-400 hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl">
                  <div className="mb-4 bg-red-50 w-14 h-14 rounded-full flex items-center justify-center text-red-400 group-hover:bg-red-400 group-hover:text-white transition-colors duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter end={'100+'} duration={2000} />
                  </p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Partner Schools</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/3 text-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-end gap-2">
                Our Vision <span className="w-8 h-1 bg-red-600 rounded-full"></span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We envision a future where every child has access to quality education and the tools to build a better life.
              </p>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="group bg-gray-50 p-8 rounded-2xl shadow border border-gray-100 hover:border-red-200 hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-4 text-red-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter end={2030} duration={1800} />
                  </p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Target Year for Scale</p>
                </div>
                {/* Card 2 */}
                <div className="group bg-gray-50 p-8 rounded-2xl shadow border border-gray-100 hover:border-red-200 hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-4 text-red-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter end={'100000+'} duration={2500} />
                  </p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Lives Impacted</p>
                </div>
                {/* Card 3 */}
                <div className="group bg-gray-50 p-8 rounded-2xl shadow border border-gray-100 hover:border-red-200 hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-4 text-red-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">National</p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Reach Across India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
                <span className="w-8 h-1 bg-red-600 rounded-full"></span> Core Values <span className="w-8 h-1 bg-red-600 rounded-full"></span>
             </h2>
             <p className="text-gray-600 text-lg">
               Integrity, Inclusion, Collaboration, Excellence, and Empathy.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
               <p className="text-gray-500 text-sm">We act with honesty and transparency in all our interactions.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
               <p className="text-gray-500 text-sm">We strive for the highest quality in our programs and partnerships.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Inclusion</h3>
               <p className="text-gray-500 text-sm">We believe in giving everyone an equal opportunity to succeed.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
               <p className="text-gray-500 text-sm">We work together with communities, volunteers, and partners.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Empathy</h3>
               <p className="text-gray-500 text-sm">We care deeply about the people we serve and their stories.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}