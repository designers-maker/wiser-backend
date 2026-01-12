import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Impact() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Impact</h1>
      <p className="text-gray-700 mb-6">We measure impact through outcomes, reach and sustained improvements. Here are a few headline metrics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded shadow text-center">
          <p className="text-4xl font-bold text-red-600"><AnimatedCounter end={'50000+'} duration={2000} /></p>
          <p className="text-gray-700">Lives Impacted</p>
        </div>
        <div className="p-6 bg-white rounded shadow text-center">
          <p className="text-4xl font-bold text-red-600"><AnimatedCounter end={'5000+'} duration={1800} /></p>
          <p className="text-gray-700">Students Supported</p>
        </div>
        <div className="p-6 bg-white rounded shadow text-center">
          <p className="text-4xl font-bold text-red-600"><AnimatedCounter end={'200+'} duration={1600} /></p>
          <p className="text-gray-700">Active Volunteers</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Impact Notes</h2>
        <p className="text-gray-700">These figures represent cumulative impact across programs and partnerships. For detailed reports, contact our team.</p>
      </section>
    </main>
  );
}
