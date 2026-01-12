import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const statRefs = useRef([]);

  const projects = {
    1: {
      title: "School Renewed",
      number: "125+",
      metric: "Schools Upgraded",
      stats: [
        { number: 450, metric: "Classrooms Modernized", suffix: "+" },
        { number: 280, metric: "Teachers Trained", suffix: "+" },
        { number: 92, metric: "Student Satisfaction", suffix: "%" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600",
      fullText: `Comprehensive school renewal program transforming infrastructure across India.

✅ Modern classrooms with smart boards
✅ Science labs & computer centers  
✅ Library upgrades & activity rooms
✅ Teacher training workshops
✅ Playground renovations`,
    },
    2: {
      title: "Volunteer Teacher", 
      number: "2.3K+",
      metric: "Volunteers Active",
      stats: [
        { number: 8000, metric: "Students Mentored", suffix: "+" },
        { number: 320, metric: "Schools Partnered", suffix: "+" },
        { number: 450, metric: "Sessions Conducted", suffix: "+" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600",
      fullText: `Vidyanjali platform connecting volunteers with schools.

🔗 Skill-based volunteer matching
📅 Flexible scheduling system
🎓 Ongoing training programs
📊 Impact tracking dashboard`,
    },
    3: {
      title: "Digital Literacy",
      number: "4.8K+",
      metric: "Students Trained",
      stats: [
        { number: 280, metric: "Computer Labs Built", suffix: "+" },
        { number: 720, metric: "Teachers Certified", suffix: "+" },
        { number: 88, metric: "Proficiency Achieved", suffix: "%" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-600", 
      fullText: `Bridging digital divide through computer education programs.

💾 Basic computing & internet skills
🛡️ Digital citizenship & safety
📱 MS Office & Google Workspace
🎮 Coding fundamentals`,
    },
    4: {
      title: "Team Preparation",
      number: "380+",
      metric: "Teams Formed",
      stats: [
        { number: 1200, metric: "Members Trained", suffix: "+" },
        { number: 240, metric: "Projects Completed", suffix: "+" },
        { number: 87, metric: "Team Performance", suffix: "%" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600",
      fullText: `Building high-performance school teams through training.

🎯 Leadership development
🤝 Collaboration workshops
📋 Project management training
⚡ Conflict resolution skills`,
    },
    5: {
      title: "Health & Wellness", 
      number: "150+",
      metric: "Health Camps",
      stats: [
        { number: 5000, metric: "Patients Treated", suffix: "+" },
        { number: 200, metric: "Vaccinations Given", suffix: "+" },
        { number: 50, metric: "Awareness Sessions", suffix: "+" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600",
      fullText: `Regular health check-up camps in underserved communities.

🏥 Free medical consultations
📚 Health awareness sessions
🚐 Mobile health units
💉 Essential healthcare services`,
    },
    6: {
      title: "Skill Development",
      number: "2K+",
      metric: "Youth Trained",
      stats: [
        { number: 1200, metric: "Jobs Secured", suffix: "+" },
        { number: 300, metric: "Startups Created", suffix: "+" },
        { number: 95, metric: "Placement Rate", suffix: "%" }
      ],
      image: "/images/21.jpg",
      gradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600",
      fullText: `Vocational skills and career guidance for youth.

💼 Employability training
🚀 Entrepreneurship programs
🛠️ Digital literacy & soft skills
📈 Job placement support`,
    },
  };

  const project = projects[projectId] || projects[1];
  
  const features = [
    { icon: "🏗️", title: "Infrastructure", desc: "Modern classrooms & facilities" },
    { icon: "👨‍🏫", title: "Volunteer System", desc: "Expert teacher matching" },
    { icon: "💻", title: "Digital Labs", desc: "Computer centers & smart boards" },
    { icon: "👥", title: "Team Training", desc: "Leadership & collaboration" }
  ];

  // Animated Counter Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          
          // Start counter animations
          project.stats.forEach((stat, index) => {
            animateCounter(index, stat.number);
          });
        }
      },
      { threshold: 0.3 }
    );

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      observer.observe(mainContent);
    }

    return () => observer.disconnect();
  }, [projectId]);

  const animateCounter = (index, targetNum) => {
    let startNum = 0;
    const duration = 2500; // 2.5 seconds
    const increment = targetNum / (duration / 16);
    let currentNum = 0;

    const timer = setInterval(() => {
      currentNum += increment;
      if (currentNum >= targetNum) {
        currentNum = targetNum;
        clearInterval(timer);
      }
      
      setCounters(prev => ({
        ...prev,
        [index]: Math.floor(currentNum)
      }));
    }, 16);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 sm:py-20 px-4">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-12">
        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl rounded-2xl font-semibold text-gray-800 transition-all duration-300 border border-gray-200 hover:-translate-y-0.5 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 main-content items-start">
        
        {/* Hero Image Section - LEFT ALIGNED */}
        <div className="relative group">
          <div className={`rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-white/30 ${project.gradient} backdrop-blur-sm h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-700 hover:brightness-110"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
          </div>
          
          <div className="absolute -top-6 left-8 sm:left-12 bg-white/95 text-gray-900 px-6 py-3 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-200">
            {project.number} {project.metric}
          </div>
        </div>

        {/* Content Section - PERFECT ALIGNMENT WITH IMAGE */}
        <div className="space-y-4 flex flex-col justify-start pt-4 text-left">
          
          {/* 1. Main Title - LEFT ALIGNED */}
          <div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight ${isVisible ? 'animate-slide-in' : ''}`}>
              <span className="text-gray-900 block">{project.title}</span>
            </h1>
          </div>

          {/* 2. Animated Stats - LEFT ALIGNED, 0 → Actual Numbers */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl text-gray-900 font-bold text-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 min-w-[140px] flex items-center justify-center">
                <span className="text-2xl font-black text-emerald-600">
                  {counters[idx] !== undefined ? `${formatNumber(counters[idx])}${stat.suffix}` : '0'}
                </span>
                <span className="ml-2 text-sm opacity-80">{stat.metric}</span>
              </div>
            ))}
          </div>

          {/* 3. Features Grid - LEFT ALIGNED, SAME HOVER AS IMAGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-6">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-5 rounded-2xl bg-white/20 hover:bg-white/50 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-start gap-4 border border-white/30 cursor-pointer h-20 items-center">
                <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 mb-1 truncate transition-colors duration-300">{feature.title}</h4>
                  <p className="text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Description - LEFT ALIGNED */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="text-gray-900 leading-relaxed text-base whitespace-pre-line">
              {project.fullText}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { 
          animation: slide-in 0.8s ease-out forwards; 
        }
        .main-content {
          align-items: flex-start;
        }
      `}</style>
    </main>
  );
}
