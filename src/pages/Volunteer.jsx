import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Volunteer() {
  const navigate = useNavigate();
  return (
    <main className="container py-8 sm:py-10 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-red-800">
        Volunteer
      </h1>

      <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-700 leading-relaxed">
        Join us as a volunteer and help create real impact in the community.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Why volunteer with us?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
            <li>Contribute time and skills to meaningful projects.</li>
            <li>Work with a supportive team and mentors.</li>
            <li>Build experience that strengthens your career profile.</li>
            <li>Make a positive difference in your community.</li>
            <li>Network with like-minded individuals.</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            How to get started
          </h2>
          <p className="mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            Fill out the volunteer form with your details, interests, and availability. Our team will get back to you within 2-3 business days.
          </p>
          <button 
            onClick={() => navigate('/volunteer/form')}
            className="w-full px-6 py-2.5 bg-red-700 text-white font-semibold rounded hover:bg-red-800 transition-colors text-sm sm:text-base"
          >
            Apply to Volunteer
          </button>
        </div>
      </section>
    </main>
  );
}
