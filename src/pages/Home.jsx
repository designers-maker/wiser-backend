import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Home() {
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const hdr = document.querySelector('header');
    function updateHeaderHeight() {
      if (hdr) setHeaderHeight(hdr.offsetHeight);
    }
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <main className="space-y-12 md:space-y-16 relative">
      {/* Floating Vertical Button on Left */}
      <button onClick={() => navigate('/about/events')} className="fixed left-0 top-1/4 z-40 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded-r-lg shadow-lg transition-colors" style={{ writingMode: 'vertical-rl', transform: 'scaleX(-1)' }}>
        <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>Upcoming Events</span>
      </button>

      {/* 1. Hero with background image + button */}
      <section
        className="relative h-[420px] sm:h-[540px] md:h-[680px] lg:h-[760px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center space-y-4 px-4" style={{ paddingTop: headerHeight }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Be the Future. Serve Today.
          </h1>
          <button
            onClick={() => navigate('/volunteer')}
            className="mt-4 px-6 py-2.5 sm:px-8 sm:py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors text-sm sm:text-base"
          >
            Volunteer with Wiser
          </button>
        </div>
      </section>

      {/* 2. OUR PROGRAMS - Three program cards */}
      <section className="w-full space-y-4 sm:space-y-6">
        <div className="w-full px-2 sm:px-4 md:px-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-left">OUR PROGRAMS</h2>
          </div>
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
            {/* Teach Program Card */}
            <ProgramCard
              title="Teach"
              image="/images/1.jpg"
              to="/programs/teach"
              navigate={navigate}
            />
            {/* School Volunteering Program Card */}
            <ProgramCard
              title="School Volunteering"
              image="/images/2.jpg"
              to="/programs/school-volunteering"
              navigate={navigate}
            />
            {/* CSR Volunteering Program Card */}
            <ProgramCard
              title="CSR Volunteering"
              image="/images/3.jpg"
              to="/programs/csr-volunteering"
              navigate={navigate}
            />
          </div>
        </div>
      </section>

      {/* 3. Videos section */}
      <section className="w-full space-y-4 sm:space-y-6">
        <div className="w-full px-2 sm:px-4 md:px-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-left">Watch How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* YouTube Video 1 */}
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/BIQBqlFa91g"
                title="Wiser Volunteer Video 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* YouTube Video 2 */}
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/BIQBqlFa91g"
                title="Wiser Volunteer Video 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* YouTube Video 3 */}
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/BIQBqlFa91g"
                title="Wiser Volunteer Video 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Local Video Option (Commented) */}
            {/* 
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-black">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src="/videos/video1.mp4" type="video/mp4" />
                <source src="/videos/video1.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-black">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src="/videos/video2.mp4" type="video/mp4" />
                <source src="/videos/video2.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-black">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src="/videos/video3.mp4" type="video/mp4" />
                <source src="/videos/video3.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* 4. Our Projects: left photos (clickable -> project pages), right numbers + titles */}
      <section className="w-full space-y-4 sm:space-y-6">
        <div className="w-full px-2 sm:px-4 md:px-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-left">Our Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Left: clickable project photos */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <ProjectImage 
                title="Education for All" 
                img="/images/1.jpg" 
                to="/projects/details/1" 
              />
              <ProjectImage 
                title="Health & Wellness" 
                img="/images/5.jpg" 
                to="/projects/details/2" 
              />
              <ProjectImage 
                title="Skill Development" 
                img="/images/9.jpg" 
                to="/projects/details/3" 
              />
              <ProjectImage 
                title="Community Outreach" 
                img="/images/13.jpg" 
                to="/projects/details/4" 
              />
            </div>

            {/* Right: stats */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
                  <AnimatedCounter end="10000+" duration={2000} />
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black tracking-wide">
                  BENEFICIARIES
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
                  <AnimatedCounter end="500+" duration={2000} />
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black tracking-wide">
                  VOLUNTEERS
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
                  <AnimatedCounter end="25+" duration={2000} />
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black tracking-wide">
                  CITIES
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
                  <AnimatedCounter end="6" duration={2000} />
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black tracking-wide">
                  ACTIVE PROJECTS
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
                  <AnimatedCounter end="50+" duration={2000} />
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black tracking-wide">
                  COMMUNITIES SERVED
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
                  <AnimatedCounter end="1000+" duration={2000} />
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black tracking-wide">
                  EVENTS ORGANIZED
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our rock-solid partners: sliding logos */}
      <section className="w-full bg-gray-50 py-8 sm:py-10 space-y-4 sm:space-y-6">
        <div className="w-full px-2 sm:px-4 md:px-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-left">Our Rock-solid Partners</h2>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-6 sm:gap-10 animate-scroll-x">
              {[
                'partner1',
                'partner2',
                'partner3',
                'partner4',
                'partner5',
                'partner1',
                'partner2',
                'partner3',
                'partner4',
                'partner5',
                'partner3',
                'partner4',
                'partner5',
                'partner1',
                'partner2',
                'partner3',
                'partner4',
                'partner5',
              ].map((name, i) => (
                <img
                  key={i}
                  src={`/logos/${name}.png`}
                  alt={`Partner ${i + 1}`}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. We've been certified by */}
      <section className="w-full space-y-4 sm:space-y-6 pb-8 sm:pb-12">
        <div className="w-full px-2 sm:px-4 md:px-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-left">We&apos;ve been certified by</h2>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center justify-center sm:justify-start">
            <img src="/certs/1.png" alt="Certification 1" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/3.png" alt="Certification 3" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/1.png" alt="Certification 1" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/3.png" alt="Certification 3" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/1.png" alt="Certification 1" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/3.png" alt="Certification 3" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/1.png" alt="Certification 1" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/3.png" alt="Certification 3" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/1.png" alt="Certification 1" className="h-10 sm:h-12 object-contain" />
            <img src="/certs/3.png" alt="Certification 3" className="h-10 sm:h-12 object-contain" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectImage({ title, img, to }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className="text-left transition-transform hover:scale-105">
      <img src={img} alt={title} className="w-full h-28 sm:h-32 md:h-40 object-cover rounded-lg mb-2" />
      <p className="text-xs sm:text-sm font-medium">{title}</p>
    </button>
  );
}

function ProgramCard({ title, image, to, navigate }) {
  return (
    <button 
      onClick={() => navigate(to)} 
      className="text-left transition-transform hover:scale-105 group"
    >
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg group-hover:brightness-75 transition-all duration-300" 
        />
      </div>
      <p className="text-sm sm:text-base md:text-lg font-semibold text-black">{title}</p>
    </button>
  );
}
