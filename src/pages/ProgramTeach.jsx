import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgramTeach() {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMessage, setContactMessage] = React.useState('');
  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);
  const [mediaType, setMediaType] = React.useState('image');
  const [mediaSrc, setMediaSrc] = React.useState('');
  const [mediaAlt, setMediaAlt] = React.useState('');
  const [mediaPoster, setMediaPoster] = React.useState('');
  const mediaVideoRef = React.useRef(null);

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        closeMediaModal();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ✅ FIXED: Proper single modal handling
  function openMediaModal(type, src, alt = '', poster = '') {
    // Reset all states first to prevent overlap
    setMediaType('image');
    setMediaSrc('');
    setMediaAlt('');
    setMediaPoster('');
    setMediaModalOpen(false);
    
    // Set new media after reset
    setTimeout(() => {
      setMediaType(type);
      setMediaSrc(src);
      setMediaAlt(alt);
      setMediaPoster(poster);
      setMediaModalOpen(true);
      
      // Handle video pausing and body scroll
      setTimeout(() => {
        document.querySelectorAll('video').forEach((v) => {
          if (mediaVideoRef.current && v === mediaVideoRef.current) return;
          try { v.pause(); } catch (e) {}
        });
        try { document.body.style.overflow = 'hidden'; } catch (e) {}
      }, 0);
    }, 50);
  }

  function closeMediaModal() {
    setMediaModalOpen(false);
    try {
      if (mediaVideoRef.current) {
        mediaVideoRef.current.pause();
        mediaVideoRef.current.currentTime = 0;
      }
    } catch (e) {}
    try { document.body.style.overflow = ''; } catch (e) {}
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500"
          style={{
            backgroundImage: "url('/images/1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Teach Program
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Empower underprivileged children through quality education and mentorship
          </p>
        </div>
      </section>

      {/* ✅ FIXED Media Modal - SINGLE INSTANCE */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4" onClick={closeMediaModal}>
          <div 
            className="relative w-full max-w-4xl mx-auto max-h-[90vh] overflow-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white text-3xl z-10 hover:text-gray-300 transition-colors"
              onClick={closeMediaModal}
              aria-label="Close media"
            >
              ×
            </button>
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              {mediaType === 'image' ? (
                <img src={mediaSrc} alt={mediaAlt} className="w-full h-[70vh] object-contain bg-black p-4" />
              ) : (
                <video
                  ref={mediaVideoRef}
                  src={mediaSrc}
                  poster={mediaPoster}
                  controls
                  autoPlay
                  className="w-full h-[70vh] object-contain bg-black"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 lg:py-24 space-y-16 lg:space-y-24">
        
        {/* Overview */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            About Teach Program
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed">
              The Teach Program bridges the educational gap for underprivileged children. Our experienced volunteers provide structured learning support in mathematics, science, and English.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <section className="space-y-6 max-w-6xl mx-auto">
          <div className="px-2 sm:px-4">
            <h3 className="text-3xl lg:text-4xl font-black text-red-900">Our Impact So Far</h3>
          </div>
          <div className="bg-gradient-to-r from-red-100/80 to-pink-100/80 backdrop-blur-xl p-6 lg:p-10 rounded-3xl border border-red-200/50 shadow-2xl text-center">
            <div className="grid md:grid-cols-3 gap-4 lg:gap-8 xl:gap-12">
              <div className="group p-6 lg:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-red-600 mb-3 group-hover:scale-110 transition-transform">500+</div>
                <p className="text-lg font-semibold text-gray-800">Students Supported</p>
              </div>
              <div className="group p-6 lg:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-red-600 mb-3 group-hover:scale-110 transition-transform">95%</div>
                <p className="text-lg font-semibold text-gray-800">Pass Rate Improvement</p>
              </div>
              <div className="group p-6 lg:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-red-600 mb-3 group-hover:scale-110 transition-transform">50+</div>
                <p className="text-lg font-semibold text-gray-800">Active Volunteers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Boxes */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Blue Card - Key Focus Areas */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-blue-200/30 shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-black text-blue-900 mb-6 flex items-center gap-3">
              <span className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-2xl">📚</span>
              Key Focus Areas
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">➤</span>
                <span>Basic Mathematics & Numeracy</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">➤</span>
                <span>English Language Skills</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">➤</span>
                <span>Science Fundamentals</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">➤</span>
                <span>Critical Thinking & Problem Solving</span>
              </div>
            </div>
          </div>

          {/* Green Card - Program Highlights */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-emerald-200/30 shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-black text-emerald-900 mb-6 flex items-center gap-3">
              <span className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl">✨</span>
              Program Highlights
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">✅</span>
                <span>One-on-one & group mentoring sessions</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">✅</span>
                <span>Personalized learning plans for each child</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">✅</span>
                <span>Regular progress tracking & assessments</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                <span className="text-2xl mt-1">✅</span>
                <span>Interactive & engaging teaching methods</span>
              </div>
            </div>
          </div>
        </div>

        {/* Program in Action */}
        <div className="max-w-6xl mx-auto space-y-8">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 text-center">Program in Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50 w-full max-w-sm">
              <button className="w-full h-80 block relative overflow-hidden" onClick={() => openMediaModal('image', '/images/1.jpg', 'Teaching Activity 1')}>
                <img src="/images/1.jpg" alt="Teaching Activity 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">👁️</span>
                </div>
              </button>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">After-school Learning Camp</h4>
                <p className="text-sm text-gray-600 flex items-center gap-4">
                  <span>📅 Jan 2024 — Mar 2024</span>
                  <span>📍 Mumbai</span>
                </p>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50 w-full max-w-sm">
              <button className="w-full h-80 block relative overflow-hidden" onClick={() => openMediaModal('video', '/videos/teaching.mp4', 'Teaching Activity 2', '/images/2.jpg')}>
                <video 
                  className="w-full h-full object-cover" 
                  poster="/images/2.jpg"
                  muted
                >
                  <source src="/videos/teaching.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">▶️</span>
                </div>
              </button>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Community Engagement Workshop</h4>
                <p className="text-sm text-gray-600 flex items-center gap-4">
                  <span>📅 Apr 2024 — Jun 2024</span>
                  <span>📍 Pune</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Get Involved */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-blue-200/30 shadow-2xl text-center space-y-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
              How to Get Involved
            </h3>
            <p className="text-lg lg:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Whether you're a teacher, professional, or student, you can make a difference!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <button
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-lg rounded-3xl hover:from-blue-700 hover:to-blue-800 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 hover:scale-[1.02] min-w-[220px]"
              onClick={() => setShowContactForm(true)}
            >
              Send us a message
            </button>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 w-full max-w-lg shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors"
                onClick={() => setShowContactForm(false)}
              >
                ×
              </button>
              <h4 className="text-2xl lg:text-3xl font-black text-gray-900 mb-8 text-center">Send us a message</h4>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log({ name: contactName, email: contactEmail, message: contactMessage });
                  setShowContactForm(false);
                  setContactName('');
                  setContactEmail('');
                  setContactMessage('');
                }}
              >
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:border-blue-500 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                  required
                />
                <input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  type="email"
                  placeholder="Your Email"
                  className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:border-blue-500 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                  required
                />
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Tell us how you'd like to get involved..."
                  className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:border-blue-500 focus:outline-none transition-all bg-white/50 backdrop-blur-sm resize-vertical min-h-[120px]"
                  rows={4}
                  required
                />
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    className="px-8 py-3 border-2 border-gray-300 text-gray-800 font-semibold rounded-2xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-2xl hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ✅ FIXED Volunteer Stories - SINGLE MODAL ONLY */}
        <div className="max-w-6xl mx-auto space-y-8">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 text-center">Volunteer Stories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
            
            {/* Story 1 - Photo ONLY */}
            <div className="bg-white/70 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md w-full group">
              <div className="relative mb-6">
                <button 
                  className="w-full h-48 rounded-2xl overflow-hidden block relative group/media" 
                  onClick={() => openMediaModal('image', '/images/volunteer1.jpg', 'Anita Sharma teaching children')}
                  aria-label="View Anita Sharma story"
                >
                  <img 
                    src="/images/volunteer1.jpg" 
                    alt="Anita Sharma teaching children" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">👁️</span>
                  </div>
                </button>
              </div>
              <p className="text-lg italic text-gray-800 mb-6 leading-relaxed">"This program has completely transformed my understanding of mathematics. The mentors are patient and helpful!"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">A</div>
                <div>
                  <p className="font-semibold text-gray-900">Anita Sharma</p>
                  <p className="text-sm text-gray-600">Student, Class 8</p>
                </div>
              </div>
            </div>

            {/* Story 2 - Video ONLY */}
            <div className="bg-white/70 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md w-full group">
              <div className="relative mb-6">
                <button 
                  className="w-full h-48 rounded-2xl overflow-hidden block relative group/media" 
                  onClick={() => openMediaModal('video', '/videos/volunteer2.mp4', 'Rahul Patel mentoring session', '/images/volunteer2.jpg')}
                  aria-label="View Rahul Patel story"
                >
                  <video 
                    className="w-full h-full object-cover" 
                    poster="/images/volunteer2.jpg"
                    muted
                    preload="metadata"
                  >
                    <source src="/videos/volunteer2.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">▶️</span>
                  </div>
                </button>
              </div>
              <p className="text-lg italic text-gray-800 mb-6 leading-relaxed">"Volunteering here has been incredibly rewarding. Seeing the children's progress motivates us every day."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">R</div>
                <div>
                  <p className="font-semibold text-gray-900">Rahul Patel</p>
                  <p className="text-sm text-gray-600">Volunteer Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 py-12 lg:py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black drop-shadow-xl">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Join our Teach Program and help create brighter futures for underprivileged children.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <button 
              className="px-10 py-4 bg-white text-red-600 font-black text-lg rounded-full hover:bg-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl min-w-[220px] hover:-translate-y-1"
              onClick={() => navigate('/volunteer')}
            >
              Volunteer Now
            </button>
            <button 
              className="px-10 py-4 border-3 border-white text-white font-black text-lg rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02] min-w-[220px] hover:-translate-y-1 backdrop-blur-sm"
              onClick={() => navigate('/learn-more')}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-xl hover:bg-white hover:shadow-2xl rounded-3xl font-bold text-lg text-gray-800 transition-all duration-300 border border-gray-200 hover:-translate-y-1 hover:scale-[1.02] group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </button>
        </div>
      </section>
    </main>
  );
}
