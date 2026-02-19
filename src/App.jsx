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
import Reports from './pages/Reports';

// Import admin components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import IndividualVolunteerSubmissions from './pages/admin/IndividualVolunteerSubmissions';
import CorporateVolunteerSubmissions from './pages/admin/CorporateVolunteerSubmissions';
import RequestForVolunteeringSubmissions from './pages/admin/RequestForVolunteeringSubmissions';
import ContactMessages from './pages/admin/ContactMessages';
import DonationRecords from './pages/admin/DonationRecords';
import CompanyVolunteering from './pages/admin/CompanyVolunteering';

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
  // WhatsApp click handler
  const openWhatsApp = () => {
    const message = "Hello, I'm interested in volunteering with WISER Foundation. Please provide more information.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8197963583?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {isNavigating && (
        <RouteLoading frames={loadingFrames} />
      )}
      <Navbar />
      {/* Add spacing for fixed navbar on all pages except home */}
      <div className={isHome ? '' : 'pt-14 sm:pt-16 md:pt-[72px]'} />
      
      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed right-6 bottom-6 z-[100] w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
      
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
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin/submissions" element={<Submissions />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/submissions/individual" element={
          <ProtectedRoute>
            <IndividualVolunteerSubmissions />
          </ProtectedRoute>
        } />
        <Route path="/admin/submissions/corporate" element={
          <ProtectedRoute>
            <CorporateVolunteerSubmissions />
          </ProtectedRoute>
        } />
        <Route path="/admin/submissions/contacts" element={
          <ProtectedRoute>
            <ContactMessages />
          </ProtectedRoute>
        } />
        <Route path="/admin/submissions/donations" element={
          <ProtectedRoute>
            <DonationRecords />
          </ProtectedRoute>
        } />
        <Route path="/admin/submissions/request-for-volunteering" element={
          <ProtectedRoute>
            <RequestForVolunteeringSubmissions />
          </ProtectedRoute>
        } />
        <Route path="/admin/company-volunteering" element={
          <ProtectedRoute>
            <CompanyVolunteering />
          </ProtectedRoute>
        } />
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
