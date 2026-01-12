import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Projects() {
  const navigate = useNavigate();
  const [impactVisible, setImpactVisible] = useState(false);

  // Trigger impact animation when section becomes visible
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
        { number: "80%", metric: "Success Rate" }
      ],
      image: "/images/1.jpg",
      galleryImages: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"],
      text: "Our flagship education program provides quality learning opportunities to underprivileged children across multiple cities.",
      gradient: "bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z"
    },
    {
      id: 2,
      title: "Health & Wellness Initiative",
      numbers: [
        { number: "150+", metric: "Health Camps" },
        { number: "5000+", metric: "Patients Treated" },
        { number: "200+", metric: "Vaccinations Given" },
        { number: "50+", metric: "Awareness Sessions" }
      ],
      image: "/images/5.jpg",
      galleryImages: ["/images/5.jpg", "/images/6.jpg", "/images/7.jpg", "/images/8.jpg"],
      text: "We organize regular health check-up camps in underserved communities with mobile health units.",
      gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
      id: 3,
      title: "Skill Development Program",
      numbers: [
        { number: "2000+", metric: "Youth Trained" },
        { number: "1200+", metric: "Jobs Secured" },
        { number: "300+", metric: "Startups Created" },
        { number: "95%", metric: "Placement Rate" }
      ],
      image: "/images/9.jpg",
      galleryImages: ["/images/9.jpg", "/images/10.jpg", "/images/11.jpg", "/images/12.jpg"],
      text: "Empowering youth with vocational skills and career guidance for employability and entrepreneurship.",
      gradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-red-500",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
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
      galleryImages: ["/images/13.jpg", "/images/14.jpg", "/images/15.jpg", "/images/16.jpg"],
      text: "Holistic development projects addressing sanitation, nutrition, and environmental awareness.",
      gradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
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
      galleryImages: ["/images/17.jpg", "/images/18.jpg", "/images/19.jpg", "/images/20.jpg"],
      text: "Skill training, financial literacy, and support groups for women's economic stability.",
      gradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z"
    },
    {
      id: 6,
      title: "Environmental Conservation",
      numbers: [
        { number: "10000+", metric: "Trees Planted" },
        { number: "500+", metric: "Cleanup Drives" },
        { number: "200+", metric: "Awareness Campaigns" },
        { number: "1000+", metric: "Volunteers Engaged" }
      ],
      image: "/images/21.jpg",
      galleryImages: ["/images/21.jpg", "/images/22.jpg", "/images/23.jpg", "/images/24.jpg"],
      text: "Tree plantation, waste management, and climate change awareness initiatives.",
      gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 00-2-2h-.5a2.5 2.5 0 01-2.5-2.5V8"
    }
  ];

  const impactStats = [
    { num: "25000+", label: "Total Beneficiaries", desc: "Lives positively transformed" },
    { num: "1200+", label: "Active Volunteers", desc: "Dedicated change makers" },
    { num: "35+", label: "Cities Covered", desc: "Nationwide expansion" },
    { num: "6", label: "Active Projects", desc: "Ongoing initiatives" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 sm:py-20 px-4">
      {/* Hero Header */}
      <div className="text-center mb-16 sm:mb-24 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
          Our Transformative Projects
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Creating sustainable social impact through innovative programs across education, health, skills, and community development.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group/card relative rounded-3xl p-8 sm:p-10 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] ${project.gradient} text-white backdrop-blur-xl border border-white/20`}
          >
            {/* Floating Icon */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-700">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-16 h-16 text-white/80 group-hover/card:text-white transition-all duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={project.icon} />
              </svg>
            </div>

            {/* Main Image with Overlay */}
            <div className="relative mb-6 h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Title - Smaller Size */}
            <h2 className="text-xl sm:text-2xl font-black mb-6 text-center leading-tight drop-shadow-lg">
              {project.title}
            </h2>

            {/* Stats Grid - Bigger Numbers, Smaller Text */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {project.numbers.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group/stat text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex flex-col justify-center h-20"
                >
                  <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent mb-1 drop-shadow-lg flex-1 flex items-center justify-center">
                    <AnimatedCounter end={stat.number} duration={2500} />
                  </div>
                  <p className="text-xs font-semibold opacity-90 tracking-wide leading-tight">
                    {stat.metric}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed mb-8 text-center opacity-95 drop-shadow-md">
              {project.text}
            </p>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {project.galleryImages.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative h-20 sm:h-24 rounded-xl overflow-hidden group/gallery hover:scale-105 transition-transform duration-300">
                  <img
                    src={img}
                    alt={`${project.title} gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Action Buttons Container - No Shake */}
            <div className="flex gap-3 justify-center p-1">
              <button
                onClick={() => navigate(`/projects/details/${project.id}`)}
                className="flex-1 max-w-[130px] bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 flex items-center justify-center gap-1.5 group/btn focus:outline-none"
              >
                Read More
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => navigate(`/projects/gallery/${project.id}`)}
                className="max-w-[130px] py-2 px-4 bg-white/90 hover:bg-white text-gray-900 font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1.5 group focus:outline-none"
              >
                View Gallery
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Overall Impact Section - NOW ANIMATED */}
      <section className="mt-24 sm:mt-32 impact-section bg-white/60 backdrop-blur-xl rounded-3xl p-12 sm:p-16 border border-white/40 shadow-2xl max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
          Our Combined Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {impactStats.map((stat, idx) => (
            <div key={idx} className="group text-center hover:scale-110 transition-all duration-500">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl group-hover:shadow-3xl hover:rotate-6 transition-all duration-500 border-4 border-white/30">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-2xl">
                  {impactVisible ? (
                    <AnimatedCounter end={stat.num} duration={3000} />
                  ) : (
                    stat.num
                  )}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {stat.label}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
