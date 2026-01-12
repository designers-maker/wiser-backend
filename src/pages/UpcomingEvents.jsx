import React from 'react';

const events = [
  { title: 'Volunteer Drive', img: '/images/1.jpg', duration: '10 Jan 2026', location: 'Mumbai' },
  { title: 'Community Workshop', img: '/images/2.jpg', duration: '20 Feb 2026', location: 'Pune' },
];

export default function UpcomingEvents() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div key={e.title} className="bg-white rounded shadow overflow-hidden">
            <img src={e.img} alt={e.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="text-sm text-gray-600">Duration: {e.duration}</p>
              <p className="text-sm text-gray-600">Location: {e.location}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
