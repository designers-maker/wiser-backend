import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

// Simple Icon Components for visual appeal in stats
const UserIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BuildingIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CheckIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChartIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

export default function ProjectGallery() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Project data mapping
  const projectData = {
    1: {
      title: "Education for All",
      images: [
        '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg',
        '/images/5.jpg', '/images/6.jpg', '/images/7.jpg', '/images/8.jpg', '/images/9.jpg',
      ]
    },
    2: {
      title: "Health & Wellness Initiative",
      images: [
        '/images/9.jpg', '/images/10.jpg', '/images/11.jpg', '/images/12.jpg',
        '/images/13.jpg', '/images/14.jpg', '/images/15.jpg', '/images/16.jpg',
      ]
    },
    3: {
      title: "Skill Development Program",
      images: [
        '/images/17.jpg', '/images/18.jpg', '/images/19.jpg', '/images/20.jpg',
        '/images/21.jpg', '/images/22.jpg', '/images/23.jpg', '/images/24.jpg',
      ]
    },
    4: {
      title: "Community Outreach",
      images: [
        '/images/25.jpg', '/images/26.jpg', '/images/27.jpg', '/images/28.jpg',
        '/images/29.jpg', '/images/30.jpg', '/images/31.jpg', '/images/32.jpg',
      ]
    },
    5: {
      title: "Women Empowerment",
      images: [
        '/images/33.jpg', '/images/34.jpg', '/images/35.jpg', '/images/36.jpg',
        '/images/37.jpg', '/images/38.jpg', '/images/39.jpg', '/images/40.jpg',
      ]
    },
    6: {
      title: "Environmental Conservation",
      images: [
        '/images/41.jpg', '/images/42.jpg', '/images/43.jpg', '/images/44.jpg',
        '/images/45.jpg', '/images/46.jpg', '/images/47.jpg', '/images/48.jpg',
      ]
    }
  };

  const project = projectData[projectId] || projectData[1];

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full border border-gray-200 hover:border-red-200 transition-all duration-300 font-semibold text-sm mb-6 w-fit"
        >
          <svg className="w-4 h-4 transition-transform -rotate-180 group-hover:-rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Back to Projects
        </button>

        {/* Gallery Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Photos</h2>
            <div className="h-1 flex-grow ml-6 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-1/3 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {project.images.map((src, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Photo {index + 1}</span>
                  <span className="text-white font-semibold">{project.title}</span>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}