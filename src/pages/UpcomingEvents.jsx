import React from 'react';

const events = [
  { title: 'Volunteer Drive', img: '/images/1.jpg', duration: '10 Jan 2026', location: 'Mumbai' },
  { title: 'Community Workshop', img: '/images/2.jpg', duration: '20 Feb 2026', location: 'Pune' },
  { title: 'Charity Marathon', img: '/images/3.jpg', duration: '15 Mar 2026', location: 'Delhi' },
];

export default function UpcomingEvents() {
  // Helper to split date string for the badge (e.g., "10 Jan 2026" -> "10" and "Jan")
  const getBadgeDate = (dateStr) => {
    const parts = dateStr.split(' ');
    return { day: parts[0], month: parts[1] };
  };

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-indigo-600 to-indigo-400 text-white py-16 px-4 text-center rounded-b-3xl shadow-lg mb-12">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Upcoming Events</h1>
        <p className="text-indigo-100 text-lg">Join us and make a difference in your community</p>
      </header>

      {/* Grid Layout - Updated to 3 columns on large screens */}
      <div className="container mx-auto px-4 pb-16 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((e) => {
            const { day, month } = getBadgeDate(e.duration);

            return (
              <div 
                key={e.title} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={e.img} 
                    alt={e.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-amber-500 text-white p-2 rounded-lg text-center shadow-md z-10 min-w-[60px]">
                    <span className="block text-xl font-bold leading-none">{day}</span>
                    <span className="block text-xs uppercase font-normal mt-1">{month}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{e.title}</h3>
                  
                  <div className="space-y-3 text-gray-600 mb-auto">
                    {/* Duration with Icon */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="font-medium">{e.duration}</span>
                    </div>

                    {/* Location with Icon */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="font-medium">{e.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}