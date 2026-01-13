import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

// Simple Icon Components for visual appeal in stats
const UserIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BuildingIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CheckIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChartIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
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
        { number: "5000+", metric: "Students Reached", icon: <UserIcon /> },
        { number: "200+", metric: "Schools Partnered", icon: <BuildingIcon /> },
        { number: "150+", metric: "Volunteer Teachers", icon: <CheckIcon /> },
        { number: "80%", metric: "Success Rate", icon: <ChartIcon /> }
      ],
      image: "/images/1.jpg",
      gradient: "bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z",
      desc: "Quality learning opportunities for underprivileged children. Our flagship education program provides quality learning opportunities to underprivileged children across multiple cities. We focus on holistic development, combining academic support with extracurricular activities."
    },
    {
      id: 2,
      title: "Health & Wellness",
      numbers: [
        { number: "150+", metric: "Health Camps", icon: <BuildingIcon /> },
        { number: "5000+", metric: "Patients Treated", icon: <UserIcon /> },
        { number: "200+", metric: "Vaccinations Given", icon: <CheckIcon /> },
        { number: "50+", metric: "Awareness Sessions", icon: <ChartIcon /> }
      ],
      image: "/images/5.jpg",
      gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      desc: "Free medical camps in underserved communities. We organize regular health check-up camps in underserved communities with mobile health units, providing essential medicines and referrals."
    },
    {
      id: 3,
      title: "Skill Development",
      numbers: [
        { number: "2000+", metric: "Youth Trained", icon: <UserIcon /> },
        { number: "1200+", metric: "Jobs Secured", icon: <CheckIcon /> },
        { number: "300+", metric: "Startups Created", icon: <ChartIcon /> },
        { number: "95%", metric: "Placement Rate", icon: <BuildingIcon /> }
      ],
      image: "/images/9.jpg",
      gradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-red-500",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      desc: "Vocational training and job placement. Empowering youth with vocational skills and career guidance for employability and entrepreneurship. We offer courses in computer literacy, tailoring, and more."
    },
    {
      id: 4,
      title: "Community Outreach",
      numbers: [
        { number: "50+", metric: "Communities Served", icon: <BuildingIcon /> },
        { number: "100+", metric: "Projects Completed", icon: <CheckIcon /> },
        { number: "5000+", metric: "Families Impacted", icon: <UserIcon /> },
        { number: "200+", metric: "Events Organized", icon: <ChartIcon /> }
      ],
      image: "/images/13.jpg",
      gradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      desc: "Holistic development projects. Addressing sanitation, nutrition, and environmental awareness through community-led initiatives and sustainable development goals."
    },
    {
      id: 5,
      title: "Women Empowerment",
      numbers: [
        { number: "800+", metric: "Women Empowered", icon: <UserIcon /> },
        { number: "300+", metric: "Businesses Started", icon: <ChartIcon /> },
        { number: "500+", metric: "Training Sessions", icon: <CheckIcon /> },
        { number: "70%", metric: "Financial Independence", icon: <BuildingIcon /> }
      ],
      image: "/images/17.jpg",
      gradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z",
      desc: "Skill training and financial independence. Skill training, financial literacy, and support groups for women's economic stability and social empowerment."
    },
    {
      id: 6,
      title: "Environmental Conservation",
      numbers: [
        { number: "10000+", metric: "Trees Planted", icon: <ChartIcon /> },
        { number: "500+", metric: "Cleanup Drives", icon: <CheckIcon /> },
        { number: "200+", metric: "Awareness Campaigns", icon: <BuildingIcon /> },
        { number: "1000+", metric: "Volunteers Engaged", icon: <UserIcon /> }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 00-2-2h-.5a2.5 2.5 0 01-2.5-2.5V8",
      desc: "Tree plantation and climate awareness. Tree plantation, waste management, and climate change awareness initiatives to create a greener and more sustainable future."
    }
  ];

  const project = projects.find((p) => String(p.id) === String(projectId)) || projects[0];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Section (Copied from ProjectGallery) */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
        
        <div className="container mx-auto px-4 max-w-7xl">
          <button
            onClick={() => navigate('/projects')}
            className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full border border-gray-200 hover:border-red-200 transition-all duration-300 font-semibold text-sm mb-6 w-fit"
          >
            <svg className="w-4 h-4 transition-transform -rotate-180 group-hover:-rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Back to Projects
          </button>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div>
              <span className="text-sm font-bold text-red-500 tracking-widest uppercase mb-2 block">Project Overview</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-12">
        
        {/* Stats Section (Copied from ProjectGallery) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.numbers.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="mb-1">
                <h3 className="text-4xl font-extrabold text-gray-900">
                  <AnimatedCounter end={stat.number} duration={2000} />
                </h3>
              </div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {stat.metric}
              </p>
            </div>
          ))}
        </div>

        {/* Content Section: Image and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-8 bg-red-500 rounded-full"></span>
                    About the Project
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {project.desc}
                </p>
            </div>
        </div>
        
        {/* Gallery Section REMOVED as per request */}
        
      </div>
    </main>
  );
}
