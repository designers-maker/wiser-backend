import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- DATA WITH SUB-TOPICS STRUCTURE ---
const DATA = {
  'tech-talks': {
    title: 'Tech Talks',
    desc: 'Expert-led sessions on modern technologies, best practices, and industry trends. Gain insights directly from industry leaders shaping the future.',
    topics: [
      { name: 'Artificial Intelligence', subs: ['Machine Learning', 'Neural Networks', 'NLP', 'Computer Vision'] },
      { name: 'Cloud Computing', subs: ['AWS', 'Azure', 'Google Cloud', 'DevOps Basics'] },
      { name: 'Cybersecurity', subs: ['Network Security', 'Ethical Hacking', 'Data Privacy', 'Firewall Config'] },
      { name: 'Full Stack Dev', subs: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'] },
      { name: 'Blockchain', subs: ['Smart Contracts', 'Ethereum', 'Web3', 'Crypto Basics'] },
      { name: 'IoT', subs: ['Sensors', 'Arduino', 'Embedded Systems', 'Home Automation'] },
    ],
    hours: '120+ Hours',
    people: '5000+ Learners',
  },
  'mock-interviews': {
    title: 'Mock Interviews',
    desc: 'Structured practice interviews with real-time feedback to boost confidence and readiness for the job market.',
    topics: [
      { name: 'HR Round', subs: ['Introduction', 'Tell me about yourself', 'Strengths/Weaknesses', 'Salary Expectations'] },
      { name: 'Technical Round', subs: ['Data Structures', 'Algorithms', 'Coding Challenges', 'System Design'] },
      { name: 'Group Discussion', subs: ['Current Affairs', 'Public Speaking', 'Logical Reasoning', 'Team Debate'] },
      { name: 'Aptitude Prep', subs: ['Quantitative', 'Logical Reasoning', 'Verbal Ability', 'Puzzles'] },
      { name: 'Body Language', subs: ['Eye Contact', 'Posture', 'Handshake', 'Confidence Building'] },
    ],
    hours: '80+ Hours',
    people: '3000+ Candidates',
  },
  'career-counselling': {
    title: 'Career Counselling',
    desc: 'Personalized guidance to help you choose the right career path, upskill strategically, and ace job applications.',
    topics: [
      { name: 'Career Roadmap', subs: ['Industry Analysis', 'Goal Setting', 'Milestone Planning', 'SWOT Analysis'] },
      { name: 'Resume Review', subs: ['ATS Check', 'Formatting', 'Keyword Optimization', 'Content Structure'] },
      { name: 'LinkedIn Profiling', subs: ['Headline Creation', 'About Section', 'Networking', 'Skill Endorsements'] },
      { name: 'Salary Negotiation', subs: ['Market Research', 'Offer Evaluation', 'Negotiation Tactics', 'Benefits Package'] },
      { name: 'Goal Setting', subs: ['Short term goals', 'Long term vision', 'Skill Gap Analysis', 'Action Plan'] },
    ],
    hours: '40+ Hours',
    people: '2000+ Students',
  },
  'communication-skills': {
    title: 'Communication Skills',
    desc: 'Interactive workshops to enhance verbal and written communication, crucial for professional success.',
    topics: [
      { name: 'Public Speaking', subs: ['Voice Modulation', 'Stage Presence', 'Overcoming Stage Fright', 'Audience Engagement'] },
      { name: 'Email Etiquette', subs: ['Subject Lines', 'Professional Tone', 'Structure', 'Reply Protocols'] },
      { name: 'Corporate Grooming', subs: ['Dress Code', 'Table Manners', 'Office Behavior', 'Meeting Protocols'] },
      { name: 'Presentation Skills', subs: ['Slide Design', 'Storytelling', 'Handling Q&A', 'Visual Aids'] },
      { name: 'Active Listening', subs: ['Empathy', 'Paraphrasing', 'Non-verbal cues', 'Clarification'] },
    ],
    hours: '60+ Hours',
    people: '4000+ Participants',
  },
  'office-visits': {
    title: 'Office Visits',
    desc: 'Immersive visits to corporate offices to understand work culture, organizational roles, and real-world workflows.',
    topics: [
      { name: 'Corporate Culture', subs: ['Values', 'Mission & Vision', 'Team Dynamics', 'Work-Life Balance'] },
      { name: 'Operations Tour', subs: ['Front Office', 'Back Office', 'Server Rooms', 'Meeting Rooms'] },
      { name: 'Team Interaction', subs: ['Q&A with Managers', 'Mentorship', 'Lunch & Learn', 'Networking'] },
      { name: 'Q&A Sessions', subs: ['Project Queries', 'Role Understanding', 'Career Advice', 'Tech Stack'] },
      { name: 'Mentor Meetups', subs: ['One-on-One', 'Feedback', 'Career Tips', 'Guidance'] },
    ],
    hours: '20+ Hours',
    people: '1500+ Visitors',
  },
  'resume-session': {
    title: 'Resume Session',
    desc: 'Hands-on workshops to build ATS-friendly resumes with immediate recruiter feedback and optimization tips.',
    topics: [
      { name: 'ATS Optimization', subs: ['Parsing Engines', 'Keywords', 'File Format', 'Section Headers'] },
      { name: 'Keyword Research', subs: ['Job Description Analysis', 'Skills Tagging', 'Synonyms', 'Industry Terms'] },
      { name: 'Layout Design', subs: ['Templates', 'Fonts', 'Margins', 'Bullet Points'] },
      { name: 'Summary Writing', subs: ['Objective vs Summary', 'Impact Statements', 'Achievements', 'Value Proposition'] },
      { name: 'Formatting', subs: ['Consistency', 'Alignment', 'White Space', 'PDF vs Word'] },
    ],
    hours: '30+ Hours',
    people: '3500+ Beneficiaries',
  },
  'soft-skills': {
    title: 'Soft Skills',
    desc: 'Comprehensive training on teamwork, problem-solving, adaptability, and leadership dynamics.',
    topics: [
      { name: 'Team Building', subs: ['Trust Exercises', 'Collaboration', 'Role Playing', 'Conflict Management'] },
      { name: 'Time Management', subs: ['Prioritization', 'Pomodoro', 'Delegation', 'Avoiding Burnout'] },
      { name: 'Leadership', subs: ['Situational Leadership', 'Decision Making', 'Motivation', 'Delegation'] },
      { name: 'Conflict Resolution', subs: ['Identifying Conflict', 'Mediation', 'Negotiation', 'Restoring Relationships'] },
      { name: 'Emotional Intelligence', subs: ['Self Awareness', 'Social Awareness', 'Relationship Management', 'Empathy'] },
    ],
    hours: '50+ Hours',
    people: '2500+ Trainees',
  },
  'faculty-training': {
    title: 'Faculty Training',
    desc: 'Programs designed for faculty to upgrade teaching methodologies, assessment strategies, and industry alignment.',
    topics: [
      { name: 'Modern Pedagogy', subs: ['Blended Learning', 'Flipped Classroom', 'Gamification', 'Micro-learning'] },
      { name: 'Student Psychology', subs: ['Learning Styles', 'Motivation', 'Cognitive Load', 'Engagement'] },
      { name: 'EdTech Tools', subs: ['LMS', 'Interactive Boards', 'Virtual Labs', 'Assessment Software'] },
      { name: 'Assessment Design', subs: ['Rubrics', 'Formative vs Summative', 'Project Based', 'Peer Review'] },
      { name: 'Research Methods', subs: ['Literature Review', 'Data Analysis', 'Ethics', 'Publication'] },
    ],
    hours: '100+ Hours',
    people: '500+ Faculty',
  },
  'industry-visits': {
    title: 'Industry Visits',
    desc: 'On-site tours to manufacturing and tech plants to learn operations, safety protocols, and supply chain dynamics.',
    topics: [
      { name: 'Safety Protocols', subs: ['PPE', 'Emergency Drills', 'Hazard Identification', 'Safety Signs'] },
      { name: 'Process Flow', subs: ['Raw Materials', 'Assembly Line', 'Quality Checks', 'Packaging'] },
      { name: 'Quality Control', subs: ['Inspection', 'Testing', 'Standards Compliance', 'Defect Analysis'] },
      { name: 'Machinery Demo', subs: ['CNC Machines', 'Robotics', 'Automation', 'Maintenance'] },
      { name: 'Production Line', subs: ['Workflow', 'Efficiency', 'Throughput', 'Layout'] },
    ],
    hours: '25+ Hours',
    people: '1800+ Students',
  },
  'personality-development': {
    title: 'Personality Development',
    desc: 'Holistic modules nurturing positivity, self-awareness, and effective personal branding.',
    topics: [
      { name: 'Mindset Shift', subs: ['Growth Mindset', 'Resilience', 'Positive Thinking', 'Overcoming Fear'] },
      { name: 'Dressing Etiquette', subs: ['Formal Wear', 'Business Casual', 'Accessories', 'Grooming'] },
      { name: 'Social Graces', subs: ['Table Manners', 'Introductions', 'Thank You Notes', 'Conversations'] },
      { name: 'Self Motivation', subs: ['Goal Setting', 'Daily Habits', 'Affirmations', 'Journaling'] },
      { name: 'Personal Branding', subs: ['Social Media', 'Portfolio', 'Networking', 'Reputation'] },
    ],
    hours: '45+ Hours',
    people: '3000+ Individuals',
  },
};

export default function FoundationPoint() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = DATA[slug] || DATA['tech-talks'];
  
  // Animation States
  const [isLoaded, setIsLoaded] = useState(false);
  const [remote, setRemote] = useState(null);
  
  // Accordion / Expand State
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const [openTopicIndex, setOpenTopicIndex] = useState(null);

  const INITIAL_VISIBLE_COUNT = 4;

  const visibleTopics = isTopicsExpanded ? data.topics : data.topics.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingTopicsCount = data.topics.length - INITIAL_VISIBLE_COUNT;

  const toggleTopic = (index) => {
    setOpenTopicIndex(openTopicIndex === index ? null : index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let active = true;
    fetch(`/api/foundation/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (active) setRemote(json);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <style>
        {`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { max-height: 0; opacity: 0; }
            to { max-height: 500px; opacity: 1; }
          }
          .animate-entry {
            opacity: 0;
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
          .accordion-content {
            transition: all 0.4s ease-in-out;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
          }
          .accordion-content.open {
            max-height: 400px;
            opacity: 1;
          }
        `}
      </style>

      {/* Header Section (Reduced Padding to Remove Blank Space) */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>
        
        <div className="container mx-auto px-4 max-w-7xl">
          <button
            onClick={() => navigate('/#infographic-section')}
            className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-full border border-gray-200 hover:border-blue-200 transition-all duration-300 font-semibold text-sm mb-6 w-fit"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Function
          </button>
          
          <div className={isLoaded ? 'animate-entry' : ''}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              {remote?.title || data.title}
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-16 space-y-16">
        
        {/* 1. About Program Box (Enlarged Horizontally) */}
        <div className={`max-w-6xl mx-auto ${isLoaded ? 'animate-entry delay-100' : ''}`}>
          <div className="bg-white p-12 md:p-16 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About {remote?.title || data.title}</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {remote?.desc || data.desc}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Topics Covered Section (With Sub-topics) */}
        <div className={`max-w-6xl mx-auto ${isLoaded ? 'animate-entry delay-200' : ''}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Topics 
            </h3>
            {/* Toggle Button */}
            {data.topics.length > INITIAL_VISIBLE_COUNT && (
              <button
                onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all flex items-center gap-1"
              >
                {isTopicsExpanded ? (
                  <>Show Less <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                ) : (
                  <>+{remainingTopicsCount} More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                )}
              </button>
            )}
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleTopics.map((topic, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleTopic(idx)}
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="font-bold text-lg text-gray-800">{topic.name}</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openTopicIndex === idx ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Sub-topics Content */}
                <div className={`accordion-content bg-slate-50 ${openTopicIndex === idx ? 'open' : ''}`}>
                  <div className="p-5 pt-2 border-t border-gray-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Sub-topics</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.subs.map((sub, sIdx) => (
                        <span key={sIdx} className="text-sm px-3 py-1.5 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Attractive Info Cards (Only Hours & People, Removed Deep Dive) */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto ${isLoaded ? 'animate-entry delay-300' : ''}`}>
          
          {/* Card 1: Hours */}
          <div className="relative group rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 p-10 h-full flex flex-col justify-center items-center text-center hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300 shadow-lg group-hover:shadow-orange-200">
              <svg className="w-12 h-12 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-gray-400 font-semibold uppercase text-xs tracking-wider mb-2">Total Duration</h4>
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 group-hover:scale-110 transition-transform duration-300">
              {data.hours}
            </h3>
            <div className="mt-4 px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-500">Intensive Learning</div>
          </div>

          {/* Card 2: People */}
          <div className="relative group rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 p-10 h-full flex flex-col justify-center items-center text-center hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg group-hover:shadow-blue-200">
              <svg className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-gray-400 font-semibold uppercase text-xs tracking-wider mb-2">Total Enrollment</h4>
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 group-hover:scale-110 transition-transform duration-300">
              {data.people}
            </h3>
            <div className="mt-4 px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-500">Community Members</div>
          </div>

        </div>

      </div>
    </main>
  );
}
