import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Projects() {
  const navigate = useNavigate();
  const [impactVisible, setImpactVisible] = useState(false);

  // Intersection Observer for impact section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImpactVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
      observer.observe(impactSection);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Education for All",
      numbers: [
        { number: "5000+", metric: "Students Reached" },
        { number: "200+", metric: "Schools Partnered" },
        { number: "150+", metric: "Volunteer Teachers" },
        { number: "95%", metric: "Success Rate" }
      ],
      image: "/images/1.jpg",
      gradient: "bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z",
      desc: "Quality learning opportunities for underprivileged children"
    },
    {
      id: 2,
      title: "Health & Wellness",
      numbers: [
        { number: "150+", metric: "Health Camps" },
        { number: "5000+", metric: "Patients Treated" },
        { number: "200+", metric: "Vaccinations Given" },
        { number: "50+", metric: "Awareness Sessions" }
      ],
      image: "/images/5.jpg",
      gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      desc: "Free medical camps in underserved communities"
    },
    {
      id: 3,
      title: "Skill Development",
      numbers: [
        { number: "2000+", metric: "Youth Trained" },
        { number: "1200+", metric: "Jobs Secured" },
        { number: "300+", metric: "Startups Created" },
        { number: "95%", metric: "Placement Rate" }
      ],
      image: "/images/9.jpg",
      gradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-red-500",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      desc: "Vocational training and job placement"
    },
    {
      id: 4,
      title: "Community Outreach",
      numbers: [
        { number: "50+", metric: "Communities Served" },
        { number: "100+", metric: "Projects Completed" },
        { number: "5000+", metric: "Families Impacted" },
        { number: "200+", metric: "Events Organized" }
      ],
      image: "/images/13.jpg",
      gradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      desc: "Holistic development projects"
    },
    {
      id: 5,
      title: "Women Empowerment",
      numbers: [
        { number: "800+", metric: "Women Empowered" },
        { number: "300+", metric: "Businesses Started" },
        { number: "500+", metric: "Training Sessions" },
        { number: "70%", metric: "Financial Independence" }
      ],
      image: "/images/17.jpg",
      gradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z",
      desc: "Skill training and financial independence"
    },
    {
      id: 6,
      title: "Environmental Conservation",
      numbers: [
        { number: "10000+", metric: "Trees Planted" },
        { number: "1000+", metric: "Volunteers Engaged" },
        { number: "200+", metric: "Awareness Campaigns" },
        { number: "500+", metric: "Cleanup Drives" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 00-2-2h-.5a2.5 2.5 0 01-2.5-2.5V8",
      desc: "Tree plantation and climate awareness"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 sm:py-10 px-4">
      {/* Hero Header */}
<div className="text-center mb-16 sm:mb-24 max-w-4xl mx-auto">
  {/* Added font-bold and changed gradient to red-orange */}
  <h1 className="font-bold text-4xl sm:text-6xl md:text-6xl text-gray-900 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6 sm:mb-2 leading-tight">
    Our Transformative Projects
  </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Creating sustainable social impact across 6 key areas
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group relative rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/20 backdrop-blur-sm ${project.gradient}`}
          >
            {/* Floating Icon */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-white/80">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={project.icon} />
              </svg>
            </div>
      
            {/* Main Image */}
            <div className="relative mb-4 h-40 sm:h-48 rounded-2xl overflow-hidden mx-auto shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
      
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center drop-shadow-lg whitespace-normal">
              {project.title}
            </h3>
      
            {/* Stats - ANIMATED NUMBERS */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.numbers.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                    <AnimatedCounter end={stat.number} duration={2000} />
                  </div>
                  <span className="text-[9px] sm:text-xs font-bold text-white/90 text-center uppercase tracking-wide">{stat.metric}</span>
                </div>
              ))}
            </div>
      
            {/* Short Description */}
            <p className="text-xs sm:text-sm text-white/95 text-center mb-4 leading-relaxed">
              {project.desc}
            </p>
      
            {/* 4 Images Gallery Preview */}
            <div className="grid grid-cols-2 gap-2 mb-4 px-1">
              {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className="h-16 sm:h-20 rounded-lg overflow-hidden bg-white/20 border border-white/10 shadow-md hover:scale-105 transition-transform duration-300">
                   <img src={project.image} alt="Gallery" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                 </div>
              ))}
            </div>
      
            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/projects/details/${project.id}`)}
                className="px-3 py-2 sm:px-4 sm:py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-bold text-white text-xs sm:text-sm transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 group-btn"
              >
                Read More
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => navigate(`/projects/gallery/${project.id}`)}
                className="px-3 py-2 sm:px-4 sm:py-2.5 bg-white text-indigo-900 hover:bg-gray-100 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 group-btn"
              >
                View Gallery
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

     {/* Professional Impact Section */}
<section className="mt-20 impact-section max-w-7xl mx-auto">
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
    {/* Section Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
      <h2 className="text-3xl font-bold text-white mb-2">
        Our Combined Impact
      </h2>
      <p className="text-blue-100 text-lg">
        Measuring our commitment to social change
      </p>
    </div>

    {/* Stats Grid - Clean and Professional */}
    <div className="p-8 sm:p-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { num: "25000+", label: "Beneficiaries", desc: "Lives transformed", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
          { num: "1200+", label: "Volunteers", desc: "Active contributors", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
          { num: "35+", label: "Cities", desc: "Nationwide presence", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 00-2-2h-.5a2.5 2.5 0 01-2.5-2.5V8" },
          { num: "6", label: "Projects", desc: "Active initiatives", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }
        ].map((stat, idx) => (
          <div key={idx} className="text-center group">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
              </svg>
            </div>
            
            {/* Number */}
            <div className="mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {impactVisible ? <AnimatedCounter end={stat.num} duration={2000} /> : stat.num}
              </span>
            </div>
            
            {/* Labels */}
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</h3>
            <p className="text-sm text-gray-600">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
    </main>
  );
}