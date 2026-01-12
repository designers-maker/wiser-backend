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
    <main className="container mx-auto px-4 py-12">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        WISER Foundation History
      </h1>

      <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
        Since our inception, WISER Foundation has worked tirelessly to improve
        educational opportunities across communities in India.
      </p>

      {/* IMPORTANT: items-stretch */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">

        {/* OUR REACH */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-center mb-4">
            Our Reach Across India
          </h3>

          <div className="flex-grow flex items-center justify-center">
            <video
              src="/animation/india map.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="max-w-full h-auto"
            />
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Programs implemented across multiple states to support education and
            community development.
          </p>
        </div>

        {/* OUR JOURNEY – COMPACT */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col relative">

          <h3 className="text-xl font-semibold text-center mb-6">
            Our Journey
          </h3>

          <div className="relative flex-grow">

            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 -translate-x-1/2" />

            {/* COMPACT SPACING */}
            <div className="space-y-16">

              {/* ITEM 1 */}
              <div
                ref={(el) => (itemsRef.current[0] = el)}
                data-index="0"
                className="relative flex md:justify-start opacity-0 translate-y-6 transition-all duration-600"
              >
                <div className="md:w-1/2 md:pr-8 text-right">
                  <div className="bg-white border border-blue-200 rounded-xl shadow-sm px-4 py-3 inline-block">
                    <h4 className="text-blue-600 font-bold text-sm">2010</h4>
                    <p className="font-semibold text-sm">Foundation Established</p>
                    <p className="text-xs text-gray-600">
                      Addressed educational inequality.
                    </p>
                  </div>
                </div>
                <span className="absolute left-1/2 top-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
              

              {/* ITEM 2 */}
              <div
                ref={(el) => (itemsRef.current[1] = el)}
                data-index="1"
                className="relative flex md:justify-end opacity-0 translate-y-6 transition-all duration-600"
              >
                <div className="md:w-1/2 md:pl-8 text-left">
                  <div className="bg-white border border-blue-200 rounded-xl shadow-sm px-4 py-3 inline-block">
                    <h4 className="text-blue-600 font-bold text-sm">2015</h4>
                    <p className="font-semibold text-sm">Program Expansion</p>
                    <p className="text-xs text-gray-600">
                      Expanded across districts.
                    </p>
                  </div>
                </div>
                <span className="absolute left-1/2 top-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* ITEM 3 */}
              <div
                ref={(el) => (itemsRef.current[2] = el)}
                data-index="2"
                className="relative flex md:justify-start opacity-0 translate-y-6 transition-all duration-600"
              >
                <div className="md:w-1/2 md:pr-8 text-right">
                  <div className="bg-white border border-blue-200 rounded-xl shadow-sm px-4 py-3 inline-block">
                    <h4 className="text-blue-600 font-bold text-sm">2020</h4>
                    <p className="font-semibold text-sm">Scaling Impact</p>
                    <p className="text-xs text-gray-600">
                      Reached 50,000+ beneficiaries.
                    </p>
                  </div>
                </div>
                <span className="absolute left-1/2 top-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
 {/* ITEM 4 */}
 <div
                ref={(el) => (itemsRef.current[1] = el)}
                data-index="1"
                className="relative flex md:justify-end opacity-0 translate-y-6 transition-all duration-600"
              >
                <div className="md:w-1/2 md:pl-8 text-left">
                  <div className="bg-white border border-blue-200 rounded-xl shadow-sm px-4 py-3 inline-block">
                    <h4 className="text-blue-600 font-bold text-sm">2015</h4>
                    <p className="font-semibold text-sm">Program Expansion</p>
                    <p className="text-xs text-gray-600">
                      Expanded across districts.
                    </p>
                  </div>
                </div>
                <span className="absolute left-1/2 top-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
