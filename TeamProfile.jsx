import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

const team = [
  { name: 'Vinod Prabhu B', role: 'Managing Trustee', img: '/images/Vinod sir photo.jpg' },
  // You can add more members here, and the counter below will update automatically!
];

export default function TeamProfile() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-16 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
        
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Core Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the passionate leaders and volunteers driving our mission forward.
          </p>
        </div>
      </div>

      {/* Stats Counter Banner - One Line, Dynamic Length */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-16">
        <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-full shadow-xl py-4 px-8 md:px-12 text-center text-white max-w-2xl mx-auto flex items-center justify-center gap-3">
          <span className="text-lg font-medium tracking-wide">Total Team Members:</span>
          <span className="text-4xl font-extrabold">
            <AnimatedCounter end={team.length} duration={1500} />
          </span>
        </div>
      </div>

      {/* Team Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={member.name} 
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 pt-16 pb-8 px-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Decorative Circle Background */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors duration-300 z-0"></div>

              {/* Profile Image */}
              <div className="relative z-10 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-red-500 uppercase tracking-wide bg-red-50 px-3 py-1 rounded-full mb-4">
                {member.role}
              </p>

              {/* Simple Social Placeholder (Visual Only) */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 w-full justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-gray-400 transition-colors cursor-pointer">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-gray-400 transition-colors cursor-pointer">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}