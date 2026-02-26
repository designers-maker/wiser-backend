import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';
import { useNavigate } from 'react-router-dom';

export default function LearnMore() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Students Supported', value: '1200+' },
    { label: 'Workshops Conducted', value: '180+' },
    { label: 'Cities Reached', value: '18+' },
    { label: 'Active Volunteers', value: '320+' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden text-white">
        <img
          src="/images/1.jpg"
          alt="Learn more hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">More About the Teach Program</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            See how we drive impact through immersive learning experiences, community partnerships, and dedicated volunteers.
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">What We Do</h2>
            <p className="text-gray-700 leading-relaxed">
              We provide structured academic support, mentorship, and skill-building workshops to bridge learning gaps for under-resourced students. Our volunteers collaborate with schools and community centers to deliver engaging sessions tailored to each learner.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Beyond academics, we nurture confidence and curiosity through projects, clubs, and real-world problem solving.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg'].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-lg">
                <img src={src} alt={`Teach program ${i + 1}`} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Numbers */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <p className="text-3xl sm:text-4xl font-black text-blue-700">
                  <AnimatedCounter end={stat.value} duration={2000} />
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extra details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 space-y-3">
            <h3 className="text-xl font-bold text-gray-900">Volunteer Journey</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Onboarding with training resources</li>
              <li>Co-teaching sessions with mentors</li>
              <li>Regular feedback and reflection circles</li>
              <li>Impact tracking and celebration events</li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 space-y-3">
            <h3 className="text-xl font-bold text-gray-900">Student Benefits</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Personalized learning plans</li>
              <li>Access to learning materials and devices</li>
              <li>Exposure to career and life skills</li>
              <li>Safe, supportive learning spaces</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Back to Programs
          </button>
        </div>
      </section>
    </main>
  );
}
