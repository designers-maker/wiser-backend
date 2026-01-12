import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Partner() {
  const navigate = useNavigate();

  return (
    <main className="container py-8 sm:py-12 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-red-800">
        Partner With Us
      </h1>

      <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-700 leading-relaxed">
        We believe in the power of partnerships to create lasting social impact. Join hands with us to make a difference in communities across India.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Partnership Benefits
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
            <li>Corporate Social Responsibility (CSR) opportunities</li>
            <li>Brand visibility and community engagement</li>
            <li>Tax benefits for eligible partnerships</li>
            <li>Impact measurement and reporting</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Get Started
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Reach out to us to discuss partnership opportunities. We work with corporations, foundations, and other organizations committed to social change.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/volunteer/csr')}
              className="w-full px-6 py-2.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition-colors text-sm sm:text-base"
            >
              CSR Partnership
            </button>
            <button
              onClick={() => navigate('/volunteer/college')}
              className="w-full px-6 py-2.5 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition-colors text-sm sm:text-base"
            >
              College Partnership
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

