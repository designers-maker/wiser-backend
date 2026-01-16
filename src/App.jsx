import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import MissionVisionValues from './pages/MissionVisionValues';
import History from './pages/History';
import Impact from './pages/Impact';
import TeamProfile from './pages/TeamProfile';
import Testimonials from './pages/Testimonials';
import UpcomingEvents from './pages/UpcomingEvents';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import IndividualVolunteeringForm from './pages/IndividualVolunteeringForm';
import CorporateVolunteerForm from './pages/CorporateVolunteerForm';
import RequestForVolunteeringForm from './pages/RequestForVolunteeringForm';
import Projects from './pages/Projects';
import ProjectGallery from './pages/ProjectGallery';
import ProjectDetails from './pages/ProjectDetails';
import FoundationPoint from './pages/FoundationPoint';
import Submissions from './pages/Submissions';
import Partner from './pages/Partner';
import ProgramTeach from './pages/ProgramTeach';
import ProgramSchoolVolunteering from './pages/ProgramSchoolVolunteering';
import ProgramCSRVolunteering from './pages/ProgramCSRVolunteering';
import LearnMore from './pages/LearnMore';
import IndividualVolunteering from './pages/IndividualVolunteering';
import CorporateVolunteering from './pages/CorporateVolunteering';
import RequestForVolunteering from './pages/RequestForVolunteering';

export default function App() {
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [isNavigating, setIsNavigating] = React.useState(false);
  const isHome = location.pathname === '/';

  const loadingFrames = React.useMemo(
    () => [
      '/animation/1.png',
      '/animation/2.png',
      '/animation/3.png',
      '/animation/4.png',
      '/animation/5.png'
    ],
    []
  );

  React.useEffect(() => {
    // Show loading overlay briefly on route change and scroll to top
    setIsNavigating(true);
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
    const t = setTimeout(() => setIsNavigating(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  React.useEffect(() => {
    const hdr = document.querySelector('header');
    function updateHeaderHeight() {
      if (hdr) {
        setHeaderHeight(hdr.offsetHeight);
      }
    }
    
    // Update immediately
    updateHeaderHeight();
    
    // Update on window resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Small delay to ensure navbar is fully rendered
    const timer = setTimeout(updateHeaderHeight, 100);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      clearTimeout(timer);
    };
  }, [location.pathname]); // Re-calculate when route changes
  return (
    <>
      {isNavigating && (
        <RouteLoading frames={loadingFrames} />
      )}
      <Navbar />
      {/* Add spacing for fixed navbar on all pages except home */}
      <div className={isHome ? '' : 'pt-14 sm:pt-16 md:pt-[72px]'} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foundation/:slug" element={<FoundationPoint />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/mission" element={<MissionVisionValues />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/impact" element={<Impact />} />
        <Route path="/about/team" element={<TeamProfile />} />
        <Route path="/about/testimonials" element={<Testimonials />} />
        <Route path="/about/events" element={<UpcomingEvents />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/teach" element={<ProgramTeach />} />
        <Route path="/programs/school-volunteering" element={<ProgramSchoolVolunteering />} />
        <Route path="/programs/csr-volunteering" element={<ProgramCSRVolunteering />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volunteer/form" element={<IndividualVolunteeringForm />} />
        <Route path="/volunteer/csr" element={<CorporateVolunteerForm />} />
        <Route path="/volunteer/request" element={<RequestForVolunteering />} />
        <Route path="/volunteer/individual" element={<IndividualVolunteering />} />
        <Route path="/volunteer/corporate" element={<CorporateVolunteering />} />
        <Route path="/volunteer/request-info" element={<RequestForVolunteeringForm />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/gallery/:projectId" element={<ProjectGallery />} />
        <Route path="/projects/details/:projectId" element={<ProjectDetails />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/admin/submissions" element={<Submissions />} />
      </Routes>
      <Footer />
    </>
  );
}

function RouteLoading({ frames }) {
  const [frameIndex, setFrameIndex] = React.useState(0);

  React.useEffect(() => {
    const iv = setInterval(() => {
      setFrameIndex((f) => (f + 1) % frames.length);
    }, 120);
    return () => clearInterval(iv);
  }, [frames]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <img
          src={frames[frameIndex]}
          alt="Loading"
          className="w-20 h-20 object-contain drop-shadow-md"
        />
        <span className="text-red-600 font-bold">WISER...</span>
      </div>
    </div>
  );
}
