import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function ProgramTeach() {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMessage, setContactMessage] = React.useState('');
  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);
  const [mediaType, setMediaType] = React.useState('image');
  const [mediaSrc, setMediaSrc] = React.useState('');
  const [mediaAlt, setMediaAlt] = React.useState('');
  const [mediaPoster, setMediaPoster] = React.useState('');
  const mediaVideoRef = React.useRef(null);

  // --- ANIMATION STATES & REFS FOR IMPACT STATS ---
  const statsRef = React.useRef(null);
  const [isStatsVisible, setIsStatsVisible] = React.useState(false);
  const [counts, setCounts] = React.useState({
    students: 0,
    rate: 0,
    volunteers: 0
  });

  // Configuration - CHANGE THIS TO UPDATE THE PERCENTAGE
  const TARGET_PASS_RATE = 90;
  const TARGET_STUDENTS = 500;
  const TARGET_VOLUNTEERS = 50;

  const RADIUS = 52;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~326.72
  const [dashOffset, setDashOffset] = React.useState(CIRCUMFERENCE); // Start empty

  // --- ANIMATION EFFECT ---
  React.useEffect(() => {
    // 1. Observer to trigger animation when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // 2. Counter & Circle Logic
  React.useEffect(() => {
    if (!isStatsVisible) return;

    const duration = 2000; // 2 seconds duration
    const frameRate = 20;
    const totalFrames = duration / frameRate;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      // Ease out function for smoother animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      if (frame <= totalFrames) {
        // Calculate values based on progress to ensure perfect sync
        const currentStudents = Math.floor(TARGET_STUDENTS * easeOut);
        const currentRate = Math.floor(TARGET_PASS_RATE * easeOut);
        const currentVolunteers = Math.floor(TARGET_VOLUNTEERS * easeOut);

        setCounts({
          students: currentStudents,
          rate: currentRate,
          volunteers: currentVolunteers
        });

        // Animate Circle Stroke dynamically based on current rate
        // Formula: Full Circumference - (Circumference * Percentage / 100)
        const offset = CIRCUMFERENCE - (CIRCUMFERENCE * (currentRate / 100));
        setDashOffset(offset);
      } else {
        clearInterval(interval);
        // Set final exact values
        setCounts({
          students: TARGET_STUDENTS,
          rate: TARGET_PASS_RATE,
          volunteers: TARGET_VOLUNTEERS
        });
        setDashOffset(CIRCUMFERENCE - (CIRCUMFERENCE * (TARGET_PASS_RATE / 100)));
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, [isStatsVisible]);

  // Handle Escape key to close modal
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        closeMediaModal();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function openMediaModal(type, src, alt = '', poster = '') {
    // Close existing first to ensure clean state
    closeMediaModal();

    // Small delay to allow close to process
    setTimeout(() => {
      setMediaType(type);
      setMediaSrc(src);
      setMediaAlt(alt);
      setMediaPoster(poster);
      setMediaModalOpen(true);

      setTimeout(() => {
        try {
          document.querySelectorAll('video').forEach((v) => {
            if (mediaVideoRef.current && v === mediaVideoRef.current) return;
            try { v.pause(); } catch (e) {}
          });
          try { document.body.style.overflow = 'hidden'; } catch (e) {}
        } catch (e) {}
      }, 50);
    }, 50);
  }

  function closeMediaModal() {
    setMediaModalOpen(false);
    try {
      if (mediaVideoRef.current) {
        mediaVideoRef.current.pause();
        mediaVideoRef.current.currentTime = 0;
      }
    } catch (e) {}
    try { document.body.style.overflow = ''; } catch (e) {}
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
      {/* --- STYLES FOR EXACT GRADIENT FROM YOUR IMAGE --- */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stat-card-animate {
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .donation-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #f97316 50%, #ea580c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/images/1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Main Content Container */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">

          {/* ✅ Education For Everyone Pill */}
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold tracking-wide uppercase animate-pulse">
            Education For Everyone
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            Teach <span className="donation-gradient">Program</span>
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Empower underprivileged children through quality education and mentorship
          </p>
        </div>
      </section>

      {/* Media Modal - Fixed z-index and Back Button */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={closeMediaModal}>
          <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>

            {/* Back Button (Top Left) */}
            <button
              onClick={closeMediaModal}
              className="absolute -top-16 left-0 text-white font-bold flex items-center gap-2 text-lg hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </button>

            {/* Close Button (Top Right) */}
            <button
              onClick={closeMediaModal}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-transform hover:rotate-90 duration-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-black rounded-2xl overflow-visible shadow-2xl border border-white/10">
              {mediaType === 'image' ? (
                <img src={mediaSrc} alt={mediaAlt} className="w-full h-[75vh] object-contain" />
              ) : (
                <video
                  ref={mediaVideoRef}
                  src={mediaSrc}
                  poster={mediaPoster}
                  controls
                  autoPlay
                  className="w-full h-[75vh] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Wrapper */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 space-y-20">

        {/* About Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
            About the Program
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            The Teach Program is designed to bridge educational gap for underprivileged children.
            Our experienced volunteers and educators provide structured learning support, focusing on
            foundational skills in mathematics, science, and English language proficiency.
          </p>
        </div>

        {/* Features - Glass Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 text-2xl">📚</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Focus Areas</h3>
              <ul className="space-y-4">
                {['Basic Mathematics & Numeracy', 'English Language Skills', 'Science Fundamentals', 'Critical Thinking'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 text-2xl">✨</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Program Highlights</h3>
              <ul className="space-y-4">
                {['One-on-one & group mentoring', 'Personalized learning plans', 'Progress tracking & assessments', 'Interactive teaching methods'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* =========================
        IMPACT STATS (FIXED ANIMATION)
        ========================= */}
        <div className="relative group" ref={statsRef}>
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-br from-red-500 to-orange-600 rounded-[1.8rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="relative z-10">
              {/* CHANGE 1: Our Impact So Far - Changed to text-white */}
              <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-tight text-white">Our Impact So Far</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                {/* Card 1: Students Supported */}
                <div className={`stat-card-animate delay-100 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2`}>
                  <div className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
                    {counts.students}<span className="text-3xl ml-1">+</span>
                  </div>
                  <div className="text-red-100 font-medium uppercase tracking-wider text-sm">Students Supported</div>
                </div>

                {/* Card 2: Pass Rate (Fixed Circle) */}
                <div className={`stat-card-animate delay-200 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center`}>
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                      {/* Background Circle (Track) */}
                      <circle
                        cx="60" cy="60" r={RADIUS}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="8"
                      />
                      {/* Animated Progress Circle (White) */}
                      <circle
                        cx="60" cy="60" r={RADIUS}
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={dashOffset}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
                      {counts.rate}%
                    </div>
                  </div>
                  <div className="text-red-100 font-medium uppercase tracking-wider text-sm">Pass Rate</div>
                </div>

                {/* Card 3: Active Volunteers */}
                <div className={`stat-card-animate delay-300 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2`}>
                  <div className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
                    {counts.volunteers}<span className="text-3xl ml-1">+</span>
                  </div>
                  <div className="text-red-100 font-medium uppercase tracking-wider text-sm">Active Volunteers</div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Program in Action */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 mt-2">
              Program in Action
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/1.jpg', 'Teaching Activity 1'); }}>
                <img
                  src="/images/1.jpg"
                  alt="Teaching Activity"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mb-2">
                  <span>📅</span> Jan 2024 — Mar 2024
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">After-school Learning Camp</h4>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Mumbai
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/2.jpg', 'Teaching Activity 2'); }}>
                <img
                  src="/images/2.jpg"
                  alt="Workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5,12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mb-2">
                  <span>📅</span> Apr 2024 — Jun 2024
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">Community Engagement Workshop</h4>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Pune
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Stories */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-bold donation-gradient mt-2">Volunteer Stories</h3>
          </div>

          {/* Changed from space-y-8 to grid for side-by-side alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Story Card 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">

                {/* Left Side: Media Stack */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/1.jpg', 'Story Image 1'); }}
                  >
                    <img src="/images/1.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm transform scale-90 group-hover:scale-100 transition-transform">View Photo</span>
                    </div>
                  </div>

                  <div
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('video', '/videos/nasscom.mp4', 'Story Video 1', '/images/g1.jpg'); }}
                  >
                    <img src="/images/g1.jpg" alt="Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2.5 rounded-full group-hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-xs font-semibold">Watch Video</div>
                  </div>
                </div>

                {/* Right Side: Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  <div className="mb-3">
                    <div className="flex justify-center md:justify-start gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
                    <h5 className="text-xl font-bold text-slate-900 mb-1">Anita Sharma</h5>
                    <p className="text-sm text-blue-600 font-medium mb-4">Student, Class 8</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "This program has completely transformed my understanding of mathematics. The mentors are patient and helpful! I feel much more confident in my exams now."
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Story Card 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">

                {/* Left Side: Media Stack */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('image', '/images/2.jpg', 'Story Image 2'); }}
                  >
                    <img src="/images/2.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm transform scale-90 group-hover:scale-100 transition-transform">View Photo</span>
                    </div>
                  </div>

                  <div
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md"
                    onClick={(e) => { e.stopPropagation(); openMediaModal('video', '/videos/nasscom.mp4', 'Story Video 2', '/images/g2.jpg'); }}
                  >
                    <img src="/images/g2.jpg" alt="Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2.5 rounded-full group-hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-xs font-semibold">Watch Video</div>
                  </div>
                </div>

                {/* Right Side: Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  <div className="mb-3">
                    <div className="flex justify-center md:justify-start gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
                    <h5 className="text-xl font-bold text-slate-900 mb-1">Rahul Patel</h5>
                    <p className="text-sm text-emerald-600 font-medium mb-4">Volunteer Teacher</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "Volunteering here has been incredibly rewarding. Seeing children's progress motivates us every day. It's a privilege to contribute to their future."
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContactForm(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-bold donation-gradient mb-6">Send us a message</h3>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                
                try {
                  const response = await fetch(`${API_BASE_URL}/api/forms/contact`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: contactName,
                      email: contactEmail,
                      subject: 'Program Teach Inquiry',
                      message: contactMessage,
                      timestamp: new Date().toISOString()
                    })
                  });
                  
                  if (response.ok) {
                    console.log('✅ Contact form submitted successfully');
                    setShowContactForm(false);
                    setContactName('');
                    setContactEmail('');
                    setContactMessage('');
                    // You could add a success message here
                  } else {
                    console.error('❌ Contact form submission failed');
                    // You could add an error message here
                  }
                } catch (error) {
                  console.error('❌ Contact form error:', error);
                  // You could add an error message here
                }
              }}
            >
              <input
                value={contactName} onChange={(e) => setContactName(e.target.value)}
                type="text" placeholder="Your Name" required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <input
                value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                type="email" placeholder="Your Email" required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <textarea
                value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Your Message" rows={4} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Call to Action - UPDATED TEXT COLORS AND BUTTON STYLES */}
      <section className="w-full bg-slate-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          {/* CHANGE 3: Ready to Make an Impact - Changed to text-white */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Ready to Make an Impact?</h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Join our Teach Program and help create brighter futures for underprivileged children.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-red-900/20 w-full sm:w-auto"
              onClick={() => navigate('/volunteer')}
            >
              Volunteer Now
            </button>
            {/* CHANGE 4: Donate Now Button - Background changed to bg-red-600 to match Volunteer Now button */}
            <button
              className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-red-900/20 w-full sm:w-auto"
              onClick={() => navigate('/donate')}
            >
              Make a Donation
            </button>
          </div>
        </div>
      </section>

      {/* Back Button - Right Aligned */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors hover:bg-blue-50 rounded-full text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Programs
          </button>
        </div>
      </section>

    </main>
  );
}