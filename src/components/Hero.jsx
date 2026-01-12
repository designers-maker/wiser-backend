import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="space-y-16">
      {/* 1. Hero with background image + button */}
      <section
        className="relative h-[420px] md:h-[520px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/hero.jpg')", // put your hero image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Be the Change with Wiser
          </h1>
          <button
            onClick={() => navigate('/volunteer')}
            className="mt-4 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300"
          >
            Volunteer with Wiser
          </button>
        </div>
      </section>

      {/* 2. Photos grid under a title */}
      <section className="container space-y-6">
        <h2 className="text-2xl font-bold">Stories of Change</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {/* replace src paths with your images */}
          <img src="/images/story1.jpg" alt="Story 1" className="w-full h-40 object-cover rounded-lg" />
          <img src="/images/story2.jpg" alt="Story 2" className="w-full h-40 object-cover rounded-lg" />
          <img src="/images/story3.jpg" alt="Story 3" className="w-full h-40 object-cover rounded-lg" />
          <img src="/images/story4.jpg" alt="Story 4" className="w-full h-40 object-cover rounded-lg" />
        </div>
      </section>

      {/* 3. YouTube video */}
      <section className="container space-y-4">
        <h2 className="text-2xl font-bold">Watch How We Work</h2>
        <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Wiser Volunteer Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* 4. Our Programs: left photos (clickable), right numbered list */}
      <section className="container space-y-6">
        <h2 className="text-2xl font-bold">Our Programs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: photos (click go to program page) */}
          <div className="grid grid-cols-2 gap-4">
            <ProgramImage
              title="After-school Program"
              img="/images/program1.jpg"
              to="/programs/after-school"
            />
            <ProgramImage
              title="Skill-building"
              img="/images/program2.jpg"
              to="/programs/skills"
            />
            <ProgramImage
              title="Community Outreach"
              img="/images/program3.jpg"
              to="/programs/outreach"
            />
            <ProgramImage
              title="Mentorship"
              img="/images/program4.jpg"
              to="/programs/mentorship"
            />
          </div>

          {/* Right: numbers + titles */}
          <div className="space-y-4">
            {[
              'After-school tutoring for children',
              'Career and skills programs for youth',
              'Community outreach and awareness',
              'Mentorship and leadership journeys',
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="mt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our rock-solid partners: sliding logos */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-6">
          <h2 className="text-2xl font-bold">Our Rock-solid Partners</h2>

          {/* simple CSS marquee style slider */}
          <div className="overflow-hidden">
            <div className="flex gap-10 animate-scroll-x">
              {/* duplicate set of logos for infinite loop effect */}
              {['p1', 'p2', 'p3', 'p4', 'p5', 'p1', 'p2', 'p3', 'p4', 'p5'].map((p, i) => (
                <img
                  key={i}
                  src={`/logos/${p}.png`}
                  alt={`Partner ${p}`}
                  className="h-12 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. We’ve been certified by */}
      <section className="container space-y-6 pb-12">
        <h2 className="text-2xl font-bold">We&apos;ve been certified by</h2>
        <div className="flex flex-wrap gap-8 items-center">
          <img src="/certs/c1.png" alt="Certification 1" className="h-12 object-contain" />
          <img src="/certs/c2.png" alt="Certification 2" className="h-12 object-contain" />
          <img src="/certs/c3.png" alt="Certification 3" className="h-12 object-contain" />
        </div>
      </section>
    </main>
  );
}

/* small helper component for clickable program photos */
function ProgramImage({ title, img, to }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="text-left"
    >
      <img src={img} alt={title} className="w-full h-32 md:h-40 object-cover rounded-lg mb-2" />
      <p className="text-sm font-medium">{title}</p>
    </button>
  );
}
