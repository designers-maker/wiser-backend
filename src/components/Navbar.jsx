import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isVolunteerMobileOpen, setIsVolunteerMobileOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const location = useLocation();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // close About dropdown when route changes
  useEffect(() => {
    setIsAboutOpen(false);
    setIsVolunteerOpen(false);
    setIsVolunteerMobileOpen(false);
    setIsMenuOpen(false);
    setIsAboutMobileOpen(false);
  }, [location.pathname]);

  // Class for the animated gradient button effect
  const navLinkClasses = "px-4 py-1.5 rounded-full transition-all duration-300 ease-out font-semibold text-blue-800 tracking-wide hover:text-white hover:shadow-lg hover:scale-105 bg-transparent hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500";

  return (
    <header className="border-b border-blue-800 fixed top-0 left-0 right-0 bg-white z-50 w-full shadow-sm h-12 sm:h-14 md:h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-3 sm:px-4 md:px-6">
        {/* Left logo */}
        <div className="flex items-center">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/WISER Logo.png"
              alt="Logo"
              className="h-8 md:h-10 w-auto mt-1"
            />
          </NavLink>
        </div>

        {/* Desktop menu */}
        <nav className="hidden lg:flex gap-4 xl:gap-6 ml-4 xl:ml-6 items-center">
          
          <NavLink to="/" className={navLinkClasses}>
            HOME
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setIsVolunteerOpen(true)}
            onMouseLeave={() => setIsVolunteerOpen(false)}
          >
            <NavLink 
              to="/volunteer" 
              onClick={() => setIsVolunteerOpen(false)} 
              aria-haspopup="true" 
              aria-expanded={isVolunteerOpen} 
              className={navLinkClasses}
            >
              VOLUNTEER <span className="ml-1">▼</span>
            </NavLink>
            <div
              onMouseEnter={() => setIsVolunteerOpen(true)}
              className={`absolute left-0 top-full w-64 bg-white border border-gray-100 rounded-lg shadow-xl z-50 mt-2 ${isVolunteerOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity duration-200`}
            >
              <div className="flex flex-col py-2">
                <NavLink onClick={() => setIsVolunteerOpen(false)} to="/volunteer/corporate" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Corporate Volunteering</NavLink>
                <NavLink onClick={() => setIsVolunteerOpen(false)} to="/volunteer/individual" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Individual Volunteering</NavLink>
                <NavLink onClick={() => setIsVolunteerOpen(false)} to="/volunteer/request" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Request for Volunteering</NavLink>
              </div>
            </div>
          </div>

          {/* About Us dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <NavLink 
              to="/about" 
              onClick={() => setIsAboutOpen(false)} 
              aria-haspopup="true" 
              aria-expanded={isAboutOpen} 
              className={navLinkClasses}
            >
              ABOUT US <span className="ml-1">▼</span>
            </NavLink>
            <div
              onMouseEnter={() => setIsAboutOpen(true)}
              className={`absolute left-0 top-full w-64 bg-white border border-gray-100 rounded-lg shadow-xl z-50 mt-2 ${isAboutOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity duration-200`}
            >
              <div className="flex flex-col py-2">
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/mission" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Mission, Vision & Values</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/history" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">History of WISER Foundation</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/impact" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Impact</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/team" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Team Profile</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/testimonials" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Testimonials</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/events" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Upcoming Events</NavLink>
              </div>
            </div>
          </div>

          <NavLink to="/projects" className={navLinkClasses}>
            PROJECTS
          </NavLink>

          <NavLink to="/gallery" className={navLinkClasses}>
            GALLERY
          </NavLink>

          <NavLink 
            to="/donate" 
            className="px-5 py-2 rounded-full transition-all duration-500 ease-out font-bold text-white tracking-wide hover:scale-105 hover:shadow-2xl transform bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 border-2 border-transparent hover:border-white/30 relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out animate-pulse"></span>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              DONATE
            </span>
          </NavLink>

          <NavLink to="/contact" className={navLinkClasses}>
            CONTACT
          </NavLink>

          

        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-blue-700 focus:outline-none transition-all active:scale-90 touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <nav 
        className={`lg:hidden fixed top-14 sm:top-16 md:top-[72px] left-0 right-0 border-t border-blue-800 bg-white shadow-lg max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-72px)] overflow-y-auto transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-3 pb-8">
            
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-blue-700 to-orange-500' 
                  : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500'
              }`}
            >
              HOME
            </NavLink>

            {/* Mobile Volunteer Accordion */}
            <div>
              <button
                onClick={() => setIsVolunteerMobileOpen(!isVolunteerMobileOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold tracking-wide text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500 transition-all duration-300"
                aria-expanded={isVolunteerMobileOpen}
              >
                <span>VOLUNTEER</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${isVolunteerMobileOpen ? 'rotate-180' : 'rotate-0'}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`mt-2 ml-4 border-l-2 border-blue-200 pl-4 space-y-1 ${isVolunteerMobileOpen ? 'block' : 'hidden'}`}>
                <NavLink to="/volunteer" onClick={() => { setIsMenuOpen(false); setIsVolunteerMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Volunteer Overview</NavLink>
                <NavLink to="/volunteer/corporate" onClick={() => { setIsMenuOpen(false); setIsVolunteerMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Corporate Volunteering</NavLink>
                <NavLink to="/volunteer/individual" onClick={() => { setIsMenuOpen(false); setIsVolunteerMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Individual Volunteering</NavLink>
                <NavLink to="/volunteer/request" onClick={() => { setIsMenuOpen(false); setIsVolunteerMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Request for Volunteering</NavLink>
              </div>
            </div>

            {/* Mobile About Accordion */}
            <div>
              <button
                onClick={() => setIsAboutMobileOpen(!isAboutMobileOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold tracking-wide text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500 transition-all duration-300"
                aria-expanded={isAboutMobileOpen}
              >
                <span>ABOUT US</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${isAboutMobileOpen ? 'rotate-180' : 'rotate-0'}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`mt-2 ml-4 border-l-2 border-blue-200 pl-4 space-y-1 ${isAboutMobileOpen ? 'block' : 'hidden'}`}>
                <NavLink to="/about" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">About Overview</NavLink>
                <NavLink to="/about/mission" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Mission, Vision & Values</NavLink>
                <NavLink to="/about/history" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">History of WISER Foundation</NavLink>
                <NavLink to="/about/impact" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Impact</NavLink>
                <NavLink to="/about/team" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Team Profile</NavLink>
                <NavLink to="/about/testimonials" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Testimonials</NavLink>
                <NavLink to="/about/events" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 text-gray-600 hover:text-blue-700 transition-colors">Upcoming Events</NavLink>
              </div>
            </div>

            <NavLink
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-blue-700 to-orange-500' 
                  : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500'
              }`}
            >
              PROJECTS
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-blue-700 to-orange-500' 
                  : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500'
              }`}
            >
              GALLERY
            </NavLink>

            <NavLink
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `px-4 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-red-600 to-orange-500 shadow-lg' 
                  : 'text-red-600 bg-red-50 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 hover:scale-105'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              <span>DONATE</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-blue-700 to-orange-500' 
                  : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-orange-500'
              }`}
            >
              CONTACT
            </NavLink>

            

          </div>
        </nav>
    </header>
  );
}
