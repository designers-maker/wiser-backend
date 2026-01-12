import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgramCSRVolunteering() {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMessage, setContactMessage] = React.useState('');
  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);
  const [mediaType, setMediaType] = React.useState('image'); // 'image' | 'video'
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

  function openMediaModal(type, src, alt = '', poster = '') {
    setMediaType(type);
    setMediaSrc(src);
    setMediaAlt(alt);
    setMediaPoster(poster);
    setMediaModalOpen(true);
    setTimeout(() => {
      try {
        document.querySelectorAll('video').forEach((v) => {
          if (mediaVideoRef.current && v === mediaVideoRef.current) return;
          try { v.pause(); } catch (e) {}
        });
        try { document.body.style.overflow = 'hidden'; } catch (e) {}
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
    try { document.body.style.overflow = ''; } catch (e) {}
  }

  return (
    <main className="space-y-8 md:space-y-12">
      {/* Hero Section with Image */}
      <section
        className="relative h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            CSR Volunteering Program
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Corporate social responsibility initiatives that create lasting community impact
          </p>
        </div>
      </section>

      {/* Media Modal (image or video) */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <button
              className="absolute top-2 right-2 text-white text-3xl z-10"
              onClick={closeMediaModal}
              aria-label="Close media"
            >
              ×
            </button>
            <div className="bg-black rounded overflow-hidden">
              {mediaType === 'image' ? (
                <img src={mediaSrc} alt={mediaAlt} className="w-full h-[70vh] object-contain bg-black p-2" />
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

      {/* Content Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-8">
        
        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">About CSR Volunteering Program</h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            Our CSR Volunteering Program partners with corporations and organizations to align their
            corporate social responsibility goals with meaningful community impact. We provide
            structured volunteering opportunities for employees that create sustainable change
            while building team cohesion and corporate social consciousness.
          </p>
        </div>

        {/* Key Features - Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg space-y-3">
            <h3 className="text-xl font-semibold text-blue-900">CSR Activities</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Employee volunteer placement programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Skill-building workshops for communities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Educational infrastructure development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Community health & wellness programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Environmental sustainability initiatives</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg space-y-3">
            <h3 className="text-xl font-semibold text-green-900">Corporate Benefits</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Meaningful CSR goal alignment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Enhanced corporate reputation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Employee engagement & satisfaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Team building opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Impact reporting & documentation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partnership Process */}
        <div className="bg-purple-50 p-6 rounded-lg space-y-4 border-l-4 border-purple-600">
          <h3 className="text-xl font-semibold text-purple-900">Our Partnership Process</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600">1</div>
              <p className="font-semibold text-gray-900">Consultation</p>
              <p className="text-sm text-gray-700">Understand your CSR goals</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600">2</div>
              <p className="font-semibold text-gray-900">Design</p>
              <p className="text-sm text-gray-700">Custom program design</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600">3</div>
              <p className="font-semibold text-gray-900">Execute</p>
              <p className="text-sm text-gray-700">Coordinate activities</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600">4</div>
              <p className="font-semibold text-gray-900">Report</p>
              <p className="text-sm text-gray-700">Track & report impact</p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded space-y-4">
          <h3 className="text-xl font-semibold text-red-900">Our Impact</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-red-600">100+</p>
              <p className="text-gray-700">Corporate Partners</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">5000+</p>
              <p className="text-gray-700">Employees Engaged</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">50000+</p>
              <p className="text-gray-700">Lives Impacted</p>
            </div>
          </div>
        </div>

        {/* Program Types */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Types of Programs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">One-time Events</h4>
              <p className="text-gray-700">Team volunteering days, skill development workshops, community clean-up drives, and donation drives.</p>
              <p className="text-sm text-gray-600 font-semibold">Duration: 1-5 days</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500 space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">Long-term Programs</h4>
              <p className="text-gray-700">Mentorship programs, ongoing skill training, infrastructure projects, and sustained community partnerships.</p>
              <p className="text-sm text-gray-600 font-semibold">Duration: 3-12 months</p>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Corporate Volunteers in Action</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <button className="w-full block" onClick={() => openMediaModal('image', '/images/3.jpg', 'CSR Activity 1')}>
                <img src="/images/3.jpg" alt="CSR Activity 1" className="w-full h-64 object-cover" />
              </button>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">Employee Skill-Building Workshop</h4>
                <p className="text-sm text-gray-600">Duration: 1 day</p>
                <p className="text-sm text-gray-600">Location: Bengaluru</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow">
              <button className="w-full block" onClick={() => openMediaModal('image', '/images/4.jpg', 'CSR Activity 2')}>
                <img src="/images/4.jpg" alt="CSR Activity 2" className="w-full h-64 object-cover" />
              </button>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">Community Health & Wellness Camp</h4>
                <p className="text-sm text-gray-600">Duration: 3 days</p>
                <p className="text-sm text-gray-600">Location: Chennai</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Get Your Organization Involved (contact form modal) */}
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <h3 className="text-2xl font-bold text-blue-900">How to Get Your Organization Involved</h3>
          <p className="text-gray-700">
            We work with organizations of all sizes to create customized CSR programs that align with
            your corporate values and social impact goals. Our team handles all coordination and logistics.
          </p>
          <div>
            <button
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setShowContactForm(true)}
            >
              Contact Us
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
                <h4 className="text-lg font-bold mb-4">Get Your Organization Involved</h4>
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

        {/* Corporate Testimonials */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Corporate Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
              <p className="text-gray-700 italic">
                "Our partnership with Wiser has transformed how we approach CSR. Employees are 
                more engaged, and we're seeing real community impact."
              </p>
              <p className="font-semibold text-gray-900">- CSR Director, Tech Company</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
              <p className="text-gray-700 italic">
                "The structured approach and transparency in impact tracking sets Wiser apart. 
                We're proud of the difference we're making together."
              </p>
              <p className="font-semibold text-gray-900">- HR Head, Financial Services Firm</p>
            </div>
          </div>
        </div>

      </section>

      {/* Call to Action */}
      <section className="w-full bg-gradient-to-r from-red-600 to-red-700 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Partner with Us for Your CSR Goals
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Create meaningful social impact while strengthening your corporate brand and employee engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-8 py-3 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Partner With Us
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
