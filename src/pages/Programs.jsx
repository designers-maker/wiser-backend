import React from 'react';
import { SITE } from '../data/siteContent';
import ProgramCard from '../components/ProgramCard';

export default function Programs() {
  return (
    <div className="container py-8 sm:py-12 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Programs</h1>

      {/* responsive grid layout for all program cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SITE.programs.map((p) => (
          <ProgramCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
