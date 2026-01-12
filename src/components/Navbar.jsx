import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const location = useLocation();

  // close About dropdown when route changes
  useEffect(() => {
    setIsAboutOpen(false);
    // also close mobile menu on navigation
    setIsMenuOpen(false);
    // close mobile About expansion on navigation
    setIsAboutMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="border-b border-red-800 fixed top-0 left-0 right-0 bg-white z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 pl-0 pr-4 sm:pl-0 sm:pr-6 md:pl-0 md:pr-8">
        {/* Left logo */}
        <div className="flex items-center">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/WISER Logo.png"
              alt="Logo"
              className="h-8 md:h-10 w-auto"
            />
          </NavLink>
        </div>

        {/* Desktop menu */}
        <nav className="hidden lg:flex gap-6 xl:gap-8 text-sm font-semibold tracking-wide ml-4 xl:ml-6 items-center">
          <NavLink to="/" className="hover:text-red-700 transition-colors">
            HOME
          </NavLink>
          <NavLink to="/volunteer" className="hover:text-red-700 transition-colors">
            VOLUNTEER
          </NavLink>

          {/* About Us dropdown (controlled to avoid flicker) */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <NavLink to="/about" onClick={() => setIsAboutOpen(false)} aria-haspopup="true" aria-expanded={isAboutOpen} className="hover:text-red-700 transition-colors">ABOUT US ▾</NavLink>
            <div
              onMouseEnter={() => setIsAboutOpen(true)}
              className={`absolute left-0 top-full w-64 bg-white border rounded shadow-lg z-50 ${isAboutOpen ? 'block' : 'hidden'}`}
            >
              <div className="flex flex-col pt-1">
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/mission" className="px-4 py-2 hover:bg-gray-50">Mission, Vision & Values</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/history" className="px-4 py-2 hover:bg-gray-50">History of WISER Foundation</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/impact" className="px-4 py-2 hover:bg-gray-50">Impact</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/team" className="px-4 py-2 hover:bg-gray-50">Team Profile</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/testimonials" className="px-4 py-2 hover:bg-gray-50">Testimonials</NavLink>
                <NavLink onClick={() => setIsAboutOpen(false)} to="/about/events" className="px-4 py-2 hover:bg-gray-50">Upcoming Events</NavLink>
              </div>
            </div>
          </div>

          <NavLink to="/projects" className="hover:text-red-700 transition-colors">
            PROJECTS
          </NavLink>
          <NavLink to="/partner" className="hover:text-red-700 transition-colors">
            PARTNER
          </NavLink>
          <NavLink to="/donate" className="hover:text-red-700 transition-colors">
            DONATE
          </NavLink>
          <NavLink to="/contact" className="hover:text-red-700 transition-colors">
            CONTACT
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-red-700 focus:outline-none"
          aria-label="Toggle menu"
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
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-red-800 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
            >
              HOME
            </NavLink>
            <NavLink
              to="/volunteer"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
            >
              VOLUNTEER
            </NavLink>
            <button
              onClick={() => setIsAboutMobileOpen(!isAboutMobileOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
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
              <div className={`mt-1 pl-4 ${isAboutMobileOpen ? 'block' : 'hidden'}`}>
                <NavLink to="/about" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">About Overview</NavLink>
                <NavLink to="/about/mission" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">Mission, Vision & Values</NavLink>
                <NavLink to="/about/history" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">History of WISER Foundation</NavLink>
                <NavLink to="/about/impact" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">Impact</NavLink>
                <NavLink to="/about/team" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">Team Profile</NavLink>
                <NavLink to="/about/testimonials" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">Testimonials</NavLink>
                <NavLink to="/about/events" onClick={() => { setIsMenuOpen(false); setIsAboutMobileOpen(false); }} className="block text-sm py-2 hover:text-red-700 transition-colors">Upcoming Events</NavLink>
              </div>
            <NavLink
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
            >
              PROJECTS
            </NavLink>
            <NavLink
              to="/partner"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
            >
              PARTNER
            </NavLink>
            <NavLink
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
            >
              DONATE
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold tracking-wide hover:text-red-700 transition-colors py-2"
            >
              CONTACT
            </NavLink>

            {/* About sub-links for mobile */}
          </div>
        </nav>
      )}
    </header>
  );
}
