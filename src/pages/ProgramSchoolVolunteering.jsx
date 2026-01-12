import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgramSchoolVolunteering() {
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
      if (e.key === 'Escape') closeMediaModal();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function openMediaModal(type, src, alt = '', poster = '') {
    setMediaType(type);
    setMediaSrc(src);
    setMediaAlt(alt);
    setMediaPoster(poster);
    setMediaModalOpen(true);
    // defer hiding other media until after modal renders
    setTimeout(() => {
      try {
        document.querySelectorAll('video').forEach((v) => {
          if (mediaVideoRef.current && v === mediaVideoRef.current) return;
          v.dataset.__prevVisibility = v.style.visibility || '';
          v.style.visibility = 'hidden';
          try { v.pause(); } catch (e) {}
        });
        document.querySelectorAll('.media-thumb').forEach((el) => {
          el.dataset.__prevVisibility = el.style.visibility || '';
          el.style.visibility = 'hidden';
        });
      } catch (e) {}
    }, 0);
  }

  function closeMediaModal() {
    setMediaModalOpen(false);
    try {
      if (mediaVideoRef.current) {
        mediaVideoRef.current.pause();
        mediaVideoRef.current.currentTime = 0;
      }
    } catch (e) {}
    try {
      document.querySelectorAll('video').forEach((v) => {
        if (v.dataset && v.dataset.__prevVisibility !== undefined) {
          v.style.visibility = v.dataset.__prevVisibility || '';
          delete v.dataset.__prevVisibility;
        }
      });
      document.querySelectorAll('.media-thumb').forEach((el) => {
        if (el.dataset && el.dataset.__prevVisibility !== undefined) {
          el.style.visibility = el.dataset.__prevVisibility || '';
          delete el.dataset.__prevVisibility;
        }
      });
    } catch (e) {}
  }

  return (
    <main className="space-y-8 md:space-y-12">
      {/* Hero Section with Image */}
      <section
        className="relative h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            School Volunteering Program
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Supporting students in government and low-income schools through dedicated volunteering
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-8">
        
        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">About School Volunteering Program</h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            Our School Volunteering Program brings passionate volunteers directly into schools serving
            underprivileged communities. Volunteers work collaboratively with teachers to provide
            extra support, tutoring, and mentorship to students, creating a nurturing environment
            that helps them reach their full potential.
          </p>
        </div>

        {/* Key Features - Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg space-y-3">
            <h3 className="text-xl font-semibold text-blue-900">What Volunteers Do</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Assist students with academics in small groups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Conduct activity-based learning sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Support skill development programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Organize sports and extracurricular activities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mentor students for career guidance</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg space-y-3">
            <h3 className="text-xl font-semibold text-green-900">Program Benefits</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Flexible volunteer schedules (part-time/full-time)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Comprehensive training provided</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Direct impact on student performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Build meaningful relationships with students</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Certificate of appreciation upon completion</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-amber-50 p-6 rounded-lg space-y-4 border-l-4 border-amber-600">
          <h3 className="text-xl font-semibold text-amber-900">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-amber-600">1</div>
              <p className="font-semibold text-gray-900">Register</p>
              <p className="text-sm text-gray-700">Sign up as a volunteer</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-amber-600">2</div>
              <p className="font-semibold text-gray-900">Train</p>
              <p className="text-sm text-gray-700">Receive orientation & training</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-amber-600">3</div>
              <p className="font-semibold text-gray-900">Contribute</p>
              <p className="text-sm text-gray-700">Start volunteering at schools</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-amber-600">4</div>
              <p className="font-semibold text-gray-900">Impact</p>
              <p className="text-sm text-gray-700">See students thrive</p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded space-y-4">
          <h3 className="text-xl font-semibold text-red-900">Our Impact</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-red-600">2000+</p>
              <p className="text-gray-700">Students Reached</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">150+</p>
              <p className="text-gray-700">Active Volunteers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">40+</p>
              <p className="text-gray-700">Partner Schools</p>
            </div>
          </div>
        </div>

        {/* Program in Action - cards with title, duration and location */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Program in Action</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <button className="w-full block" onClick={() => openMediaModal('image', '/images/2.jpg', 'School Activity 1')}>
                <img src="/images/2.jpg" alt="School Activity 1" className="w-full h-64 object-cover" />
              </button>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">Classroom Tutoring Drive</h4>
                <p className="text-sm text-gray-600">Duration: Feb 2024 — Apr 2024</p>
                <p className="text-sm text-gray-600">Location: Thane</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow">
              <button className="w-full block" onClick={() => openMediaModal('image', '/images/3.jpg', 'School Activity 2')}>
                <img src="/images/3.jpg" alt="School Activity 2" className="w-full h-64 object-cover" />
              </button>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">After-school Remedial Sessions</h4>
                <p className="text-sm text-gray-600">Duration: May 2024 — Jul 2024</p>
                <p className="text-sm text-gray-600">Location: Nashik</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Get Involved - same behavior as ProgramTeach */}
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <h3 className="text-2xl font-bold text-blue-900">How to Get Involved</h3>
          <p className="text-gray-700">Whether you're a teacher, professional, or student, you can make a difference!</p>
          <div>
            <button
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setShowContactForm(true)}
            >
              Send us a message
            </button>
          </div>

          {showContactForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={() => setShowContactForm(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h4 className="text-lg font-bold mb-4">Send us a message</h4>
                <form
                  className="space-y-4"
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
                    placeholder="Name"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Message"
                    className="w-full border rounded px-3 py-2"
                    rows={4}
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Volunteer Stories - table with videos and images (like ProgramTeach) */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Volunteer Stories</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Story</th>
                  <th className="px-4 py-2 border-b text-left">Video</th>
                  <th className="px-4 py-2 border-b text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b align-top">"Volunteering at local schools transformed my perspective on teaching and community."</td>
                  <td className="px-4 py-2 border-b">
                    <div className="relative h-32 w-48 rounded overflow-hidden cursor-pointer media-thumb" onClick={() => openMediaModal('video', '/videos/nasscom.mp4', 'School Video 1', '/images/g1.jpg')}>
                      <img src="/images/g1.jpg" alt="thumb 1" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl pointer-events-none bg-black/20">▶</div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <img src="/images/2.jpg" alt="story image 1" className="h-32 w-48 object-cover rounded cursor-pointer media-thumb" onClick={() => openMediaModal('image', '/images/2.jpg', 'Story Image 1')} />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b align-top">"The mentorship opportunities were rewarding and helped students improve significantly."</td>
                  <td className="px-4 py-2 border-b">
                    <div className="relative h-32 w-48 rounded overflow-hidden cursor-pointer media-thumb" onClick={() => openMediaModal('video', '/videos/nasscom.mp4', 'School Video 2', '/images/g2.jpg')}>
                      <img src="/images/g2.jpg" alt="thumb 2" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl pointer-events-none bg-black/20">▶</div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <img src="/images/3.jpg" alt="story image 2" className="h-32 w-48 object-cover rounded cursor-pointer media-thumb" onClick={() => openMediaModal('image', '/images/3.jpg', 'Story Image 2')} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* Call to Action */}
      <section className="w-full bg-gradient-to-r from-red-600 to-red-700 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Join Our School Volunteering Program
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Your dedication can transform the lives of hundreds of students. Apply today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-8 py-3 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Volunteer Now
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-red-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="w-full px-4 sm:px-6 md:px-8 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          ← Back to Programs
        </button>
      </section>
    </main>
  );
}
