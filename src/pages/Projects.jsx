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
            className={`group relative rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/20 backdrop-blur-sm ${project.gradient}`}
          >
            {/* Floating Icon */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-white/80">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={project.icon} />
              </svg>
            </div>

            {/* Main Image */}
            <div className="relative mb-6 h-64 rounded-2xl overflow-hidden mx-auto shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
              {project.title}
            </h3>

            {/* Stats - ANIMATED NUMBERS */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {project.numbers.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                    <AnimatedCounter end={stat.number} duration={2000} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white/90 text-center uppercase tracking-wide">{stat.metric}</span>
                </div>
              ))}
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-white/95 text-center mb-8 leading-relaxed line-clamp-2">
              {project.desc}
            </p>

            {/* 4 Images Gallery Preview */}
            <div className="grid grid-cols-2 gap-3 mb-8 px-2">
              {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className="h-24 rounded-lg overflow-hidden bg-white/20 border border-white/10 shadow-md hover:scale-105 transition-transform duration-300">
                   <img src={project.image} alt="Gallery" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                 </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate(`/projects/details/${project.id}`)}
                className="px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-bold text-white text-sm transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 group-btn"
              >
                Read More
                <svg className="w-4 h-4 group-btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => navigate(`/projects/gallery/${project.id}`)}
                className="px-5 py-3 bg-white text-indigo-900 hover:bg-gray-100 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 group-btn"
              >
                View Gallery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

     {/* Combined Impact Section */}
<section className="mt-24 sm:mt-32 impact-section bg-white/50 backdrop-blur-xl rounded-3xl p-12 sm:p-16 border border-white/40 shadow-2xl max-w-6xl mx-auto">
  {/* Added font-bold and updated gradient color */}
  <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-12 sm:mb-16 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
    Our Combined Impact
  </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "25000+", label: "Total Beneficiaries", desc: "Lives transformed" },
            { num: "1200+", label: "Active Volunteers", desc: "Change makers" },
            { num: "35+", label: "Cities Covered", desc: "Nationwide reach" },
            { num: "6", label: "Active Projects", desc: "Ongoing initiatives" }
          ].map((stat, idx) => (
            <div key={idx} className="group text-center hover:scale-105 transition-all duration-500 perspective-[1000px]">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-2 border-white/30 hover:-translate-y-1 hover:rotate-x-3">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-xl">
                  {impactVisible ? <AnimatedCounter end={stat.num} duration={2500} /> : stat.num}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{stat.label}</h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}