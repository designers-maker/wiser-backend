import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

const team = [
  { name: 'Asha Patel', role: 'Founder', img: '/images/team1.jpg' },
  { name: 'Rahul Singh', role: 'Program Lead', img: '/images/team2.jpg' },
  { name: 'Priya Sharma', role: 'Operations', img: '/images/team3.jpg' },
];

export default function TeamProfile() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Team Profile</h1>
      <p className="text-gray-700 mb-4">Meet our core team and volunteers.</p>
      <div className="mb-6">
        <span className="text-2xl font-semibold">Total Team: </span>
        <span className="text-2xl font-bold text-red-600"><AnimatedCounter end={3} duration={1200} /></span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {team.map((m) => (
          <div key={m.name} className="bg-white rounded shadow p-4 text-center">
            <div className="w-32 h-32 mx-auto overflow-hidden rounded-full bg-gray-100">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-4 font-semibold">{m.name}</h3>
            <p className="text-sm text-gray-600">{m.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
