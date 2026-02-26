import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="space-y-16">
      {/* 1. Hero with background image + button */}
      <section
        className="relative h-[420px] md:h-[520px] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl"
          >
            Be the Change with Wiser
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-white drop-shadow-lg"
          >
            Join our community of changemakers making a real difference in communities across India
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(251, 191, 36, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/volunteer')}
            className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-full hover:from-yellow-300 hover:to-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Volunteer with Wiser
            </span>
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-20 w-3 h-3 bg-blue-300/30 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-1/4 w-2 h-2 bg-purple-300/30 rounded-full"
        />
      </section>

      {/* 2. Photos grid under a title */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container space-y-4"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-center"
        >
          Stories of Change
        </motion.h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {['story1.jpg', 'story2.jpg', 'story3.jpg', 'story4.jpg'].map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              viewport={{ once: true }}
              className="hover-lift"
            >
              <img 
                src={`/images/${img}`} 
                alt={`Story ${index + 1}`} 
                className="w-full h-40 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. YouTube video */}
      <section className="container space-y-2">
        <h2 className="text-xl font-bold">Watch How We Work</h2>
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
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container space-y-4"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center"
        >
          Our Programs
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: photos (click go to program page) */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "After-school Program", img: "program1.jpg", to: "/programs/after-school" },
              { title: "Skill-building", img: "program2.jpg", to: "/programs/skills" },
              { title: "Community Outreach", img: "program3.jpg", to: "/programs/outreach" },
              { title: "Mentorship", img: "program4.jpg", to: "/programs/mentorship" }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                viewport={{ once: true }}
              >
                <ProgramImage {...program} />
              </motion.div>
            ))}
          </div>

          {/* Right: numbers + titles */}
          <div className="space-y-4">
            {[
              'After-school tutoring for children',
              'Career and skills programs for youth',
              'Community outreach and awareness',
              'Mentorship and leadership journeys',
            ].map((text, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg"
                >
                  {index + 1}
                </motion.div>
                <p className="mt-1 text-gray-700 font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Our rock-solid partners: sliding logos */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 py-8"
      >
        <div className="container space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800"
          >
            Our Rock-solid Partners
          </motion.h2>

          {/* Enhanced CSS marquee style slider */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            <motion.div 
              className="flex gap-16 animate-scroll-x"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* First set of logos */}
              {['partner1.png', 'partner2.png', 'partner3.png', 'partner4.png', 'partner5.png', 'partner6.png'].map((logo, i) => (
                <motion.div
                  key={`first-${i}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex-shrink-0 hover-lift"
                >
                  <img
                    src={`/logos/${logo}`}
                    alt={`Partner ${i + 1}`}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {['partner1.png', 'partner2.png', 'partner3.png', 'partner4.png', 'partner5.png', 'partner6.png'].map((logo, i) => (
                <motion.div
                  key={`second-${i}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex-shrink-0 hover-lift"
                >
                  <img
                    src={`/logos/${logo}`}
                    alt={`Partner ${i + 7}`}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. We’ve been certified by */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container space-y-6 pb-12"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center"
        >
          We&apos;ve been certified by
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-12 items-center"
        >
          {['c1.png', 'c2.png', 'c3.png'].map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              whileHover={{ y: -10, scale: 1.1 }}
              viewport={{ once: true }}
              className="hover-lift p-4 rounded-2xl bg-white shadow-lg border border-gray-100"
            >
              <img 
                src={`/certs/${cert}`} 
                alt={`Certification ${index + 1}`} 
                className="h-16 object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
}

/* small helper component for clickable program photos */
function ProgramImage({ title, img, to }) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
      className="text-left w-full group"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img 
          src={`/images/${img}`} 
          alt={title} 
          className="w-full h-36 md:h-44 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <motion.p 
        whileHover={{ x: 5 }}
        className="text-sm font-bold mt-3 text-gray-800 group-hover:text-blue-600 transition-colors"
      >
        {title}
      </motion.p>
    </motion.button>
  );
}
