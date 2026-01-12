import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

export default function ProjectGallery() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Project data mapping
  const projectData = {
    1: {
      title: "Education for All",
      numbers: [
        { number: "5000+", metric: "Students Reached" },
        { number: "200+", metric: "Schools Partnered" },
        { number: "150+", metric: "Volunteer Teachers" },
        { number: "80%", metric: "Success Rate" }
      ],
      images: [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/4.jpg',
        '/images/5.jpg',
        '/images/6.jpg',
        '/images/7.jpg',
        '/images/8.jpg',
        '/images/9.jpg',
      ]
    },
    2: {
      title: "Health & Wellness Initiative",
      numbers: [
        { number: "150+", metric: "Health Camps" },
        { number: "5000+", metric: "Patients Treated" },
        { number: "200+", metric: "Vaccinations Given" },
        { number: "50+", metric: "Awareness Sessions" }
      ],
      images: [
        '/images/9.jpg',
        '/images/10.jpg',
        '/images/11.jpg',
        '/images/12.jpg',
        '/images/13.jpg',
        '/images/14.jpg',
        '/images/15.jpg',
        '/images/16.jpg',
      ]
    },
    3: {
      title: "Skill Development Program",
      numbers: [
        { number: "2000+", metric: "Youth Trained" },
        { number: "1200+", metric: "Jobs Secured" },
        { number: "300+", metric: "Startups Created" },
        { number: "95%", metric: "Placement Rate" }
      ],
      images: [
        '/images/17.jpg',
        '/images/18.jpg',
        '/images/19.jpg',
        '/images/20.jpg',
        '/images/21.jpg',
        '/images/22.jpg',
        '/images/23.jpg',
        '/images/24.jpg',
      ]
    },
    4: {
      title: "Community Outreach",
      numbers: [
        { number: "50+", metric: "Communities Served" },
        { number: "100+", metric: "Projects Completed" },
        { number: "5000+", metric: "Families Impacted" },
        { number: "200+", metric: "Events Organized" }
      ],
      images: [
        '/images/25.jpg',
        '/images/26.jpg',
        '/images/27.jpg',
        '/images/28.jpg',
        '/images/29.jpg',
        '/images/30.jpg',
        '/images/31.jpg',
        '/images/32.jpg',
      ]
    },
    5: {
      title: "Women Empowerment",
      numbers: [
        { number: "800+", metric: "Women Empowered" },
        { number: "300+", metric: "Businesses Started" },
        { number: "500+", metric: "Training Sessions" },
        { number: "70%", metric: "Financial Independence" }
      ],
      images: [
        '/images/33.jpg',
        '/images/34.jpg',
        '/images/35.jpg',
        '/images/36.jpg',
        '/images/37.jpg',
        '/images/38.jpg',
        '/images/39.jpg',
        '/images/40.jpg',
      ]
    },
    6: {
      title: "Environmental Conservation",
      numbers: [
        { number: "10000+", metric: "Trees Planted" },
        { number: "500+", metric: "Cleanup Drives" },
        { number: "200+", metric: "Awareness Campaigns" },
        { number: "1000+", metric: "Volunteers Engaged" }
      ],
      images: [
        '/images/41.jpg',
        '/images/42.jpg',
        '/images/43.jpg',
        '/images/44.jpg',
        '/images/45.jpg',
        '/images/46.jpg',
        '/images/47.jpg',
        '/images/48.jpg',
      ]
    }
  };

  const project = projectData[projectId] || projectData[1];

  return (
    <main className="container py-8 sm:py-12 px-4">
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-red-700 hover:text-blue-800 font-semibold mb-4 transition-colors"
        >
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Back to Projects
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-6">
          {project.title} - Gallery
        </h1>

        {/* 4 Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 bg-gray-50 rounded-lg p-4 sm:p-6">
          {project.numbers.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800">
                  <AnimatedCounter end={stat.number} duration={2000} />
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-gray-600">
                {stat.metric}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {project.images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
          >
            <img
              src={src}
              alt={`${project.title} - Image ${index + 1}`}
              className="w-full h-64 sm:h-72 object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </main>
  );
}

