import React from 'react';

export default function Testimonials() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="grid md:grid-cols-3 gap-4 items-start">
            <div className="md:col-span-1">
              <div className="relative h-40 bg-gray-100 rounded overflow-hidden">
                <video src="/videos/nasscom.mp4" controls poster="/images/g1.jpg" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">— Suresh Kumar, Mumbai</p>
              <p className="text-gray-700">Volunteering with WISER helped me connect with students and see the impact of everyday mentoring.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="grid md:grid-cols-3 gap-4 items-start">
            <div className="md:col-span-1">
              <div className="relative h-40 bg-gray-100 rounded overflow-hidden">
                <video src="/videos/nasscom.mp4" controls poster="/images/g2.jpg" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">— Anita Rao, Pune</p>
              <p className="text-gray-700">The structured sessions and support materials made it easy to contribute meaningfully.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
