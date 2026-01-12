import React, { useEffect, useRef } from "react";

export default function History() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
            }, index * 250);
          }
        });
      },
      { threshold: 0.25 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">

      {/* --- HEADER --- */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-12 text-center shadow-sm relative overflow-hidden mb-12">
        
        <div className="container mx-auto px-4">
          <span className="text-sm font-bold text-red-500 tracking-widest uppercase mb-2 block">About Us</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            WISER Foundation <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">History</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Since our inception, WISER Foundation has worked tirelessly to improve
            educational opportunities across communities in India.
          </p>
        </div>
      </div>
      {/* --- END HEADER --- */}

      {/* Grid Layout */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-7xl">

        {/* LEFT SIDE: OUR REACH */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          
          {/* Map Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Our Reach Across India
            </h3>
          </div>

          {/* Map Content (Clean, No Border Color) */}
          <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg p-4">
            <video
              src="/animation/india map.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Map Footer */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Programs implemented across multiple states to support education and
              community development.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: OUR JOURNEY */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col relative h-full">
          
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Milestones & <span className="text-red-600">Achievements</span>
          </h3>

          {/* Timeline Container - Using justify-between to align items top to bottom */}
          <div className="relative flex flex-col justify-between h-full py-4">
            
            {/* Vertical Gradient Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-orange-500 to-yellow-500 rounded-full -translate-x-1/2"></div>

            {/* ITEM 1 */}
            <div
              ref={(el) => (itemsRef.current[0] = el)}
              data-index="0"
              className="relative flex md:justify-start opacity-0 translate-y-6 transition-all duration-600"
            >
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-2 border-red-600 rounded-full -translate-x-1/2 z-10"></div>
              
              <div className="w-full md:w-5/12 ml-16 md:ml-0 md:pr-4 md:text-right">
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="text-red-600 font-bold text-xs md:text-sm">2010</h4>
                  <p className="font-semibold text-sm md:text-base">Foundation Established</p>
                </div>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>
              

            {/* ITEM 2 */}
            <div
              ref={(el) => (itemsRef.current[1] = el)}
              data-index="1"
              className="relative flex md:justify-end opacity-0 translate-y-6 transition-all duration-600"
            >
              <div className="hidden md:block md:w-5/12"></div>

              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full -translate-x-1/2 z-10"></div>

              <div className="w-full md:w-5/12 ml-16 md:ml-0 md:pl-4 md:text-left">
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="text-orange-500 font-bold text-xs md:text-sm">2015</h4>
                  <p className="font-semibold text-sm md:text-base">Program Expansion</p>
                </div>
              </div>
            </div>

            {/* ITEM 3 */}
            <div
              ref={(el) => (itemsRef.current[2] = el)}
              data-index="2"
              className="relative flex md:justify-start opacity-0 translate-y-6 transition-all duration-600"
            >
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-2 border-yellow-500 rounded-full -translate-x-1/2 z-10"></div>

              <div className="w-full md:w-5/12 ml-16 md:ml-0 md:pr-4 md:text-right">
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="text-yellow-600 font-bold text-xs md:text-sm">2020</h4>
                  <p className="font-semibold text-sm md:text-base">Scaling Impact</p>
                </div>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>
              
            {/* ITEM 4 */}
            <div
              ref={(el) => (itemsRef.current[3] = el)}
              data-index="3"
              className="relative flex md:justify-end opacity-0 translate-y-6 transition-all duration-600"
            >
              <div className="hidden md:block md:w-5/12"></div>

              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-2 border-red-600 rounded-full -translate-x-1/2 z-10"></div>

              <div className="w-full md:w-5/12 ml-16 md:ml-0 md:pl-4 md:text-left">
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-lg hover:shadow-md transition-shadow ring-1 ring-red-50">
                  <h4 className="text-red-600 font-bold text-xs md:text-sm">2024</h4>
                  <p className="font-semibold text-sm md:text-base">Digital Leap</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}