import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeachLearnMore() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 lg:py-14 space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Learn More about the Teach Program
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Dive deeper into how the Teach Program creates impact in classrooms across India through
            structured lessons, dedicated mentors, and community support.
          </p>
        </header>

        {/* Photos grid */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Inside Our Classrooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {['1', '2', '3', '4', '5', '6'].map((id) => (
              <div
                key={id}
                className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`/images/${id}.jpg`}
                  alt={`Teach Program classroom ${id}`}
                  className="w-full h-48 sm:h-56 lg:h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Numbers / stats */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Key Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <StatBox number="500+" label="Students Supported" />
            <StatBox number="50+" label="Volunteer Teachers" />
            <StatBox number="30+" label="Partner Schools" />
            <StatBox number="95%" label="Improved Scores" />
          </div>
        </section>

        {/* Detailed text */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Program Details</h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              The Teach Program focuses on building strong fundamentals in mathematics, science, and
              English for students from underserved communities. Volunteers receive structured
              curriculum support and guidance to deliver engaging, high-impact sessions.
            </p>
            <p>
              Sessions are conducted after school hours and on weekends, ensuring that students get
              additional academic support without disrupting their regular schooling. Regular
              assessments and feedback loops help track each child&apos;s progress.
            </p>
            <p>
              Beyond academics, the program emphasizes confidence-building, communication skills, and
              critical thinking so that students are better prepared for future opportunities.
            </p>
          </div>
        </section>

        {/* Back button aligned right */}
        <section className="pt-2">
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/programs')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg rounded-2xl text-sm sm:text-base font-semibold text-gray-800 border border-gray-200 transition-all duration-200"
            >
              Back to Programs
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

function StatBox({ number, label }) {
  return (
    <div className="bg-white/80 rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 text-center">
      <p className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-1">{number}</p>
      <p className="text-xs sm:text-sm font-semibold text-gray-700">{label}</p>
    </div>
  );
}

