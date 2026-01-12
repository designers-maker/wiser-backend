import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function MissionVisionValues() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-12">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Mission, Vision & Values</h1>

      {/* Mission Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Mission</h2>
        <p className="text-gray-700 max-w-3xl">
          Our mission is to enable education and opportunity for disadvantaged children through volunteer-led programs, partnerships and community initiatives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-blue-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-blue-600"><AnimatedCounter end={'5000+'} duration={2000} /></p>
            <p className="text-sm text-gray-600 mt-1">Students reached</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-blue-600"><AnimatedCounter end={'200+'} duration={1800} /></p>
            <p className="text-sm text-gray-600 mt-1">Volunteers</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-blue-600"><AnimatedCounter end={'100+'} duration={1600} /></p>
            <p className="text-sm text-gray-600 mt-1">Partner Schools</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Vision</h2>
        <p className="text-gray-700 max-w-3xl">
          We envision a future where every child has access to quality education and the tools to build a better life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-green-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-green-600"><AnimatedCounter end={2030} duration={1500} /></p>
            <p className="text-sm text-gray-600 mt-1">Target year for scale</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-green-600"><AnimatedCounter end={'100000+'} duration={2000} /></p>
            <p className="text-sm text-gray-600 mt-1">Lives impacted</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-green-600">National</p>
            <p className="text-sm text-gray-600 mt-1">Reach across India</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Values</h2>
        <p className="text-gray-700 max-w-3xl">
          Integrity, Inclusion, Collaboration, Excellence and Empathy — these values guide our work and partnerships.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-yellow-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-yellow-600"><AnimatedCounter end={5} duration={1200} /></p>
            <p className="text-sm text-gray-600 mt-1">Core values</p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-yellow-600"><AnimatedCounter end={'100%'} duration={1200} /></p>
            <p className="text-sm text-gray-600 mt-1">Volunteer-driven</p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-xl text-center shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <p className="text-4xl font-bold text-yellow-600">Transparent</p>
            <p className="text-sm text-gray-600 mt-1">Reporting & impact</p>
          </div>
        </div>
      </section>

    </main>
  );
}
