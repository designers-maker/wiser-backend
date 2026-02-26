export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 py-12 sm:py-20 px-4 overflow-hidden relative">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              WISER Volunteer
            </span>
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full" />
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 border border-white/50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Paragraph 1 */}
            <div className="relative group">
              <div className="flex gap-6 h-full">
                <div className="hidden md:flex flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex-grow">
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                    WISER Volunteer is a volunteer-run registered charity that empowers disadvantaged children and individuals across India.
                  </p>
                </div>
              </div>
            </div>

            {/* Paragraph 2 */}
            <div className="relative group">
              <div className="flex gap-6 h-full">
                <div className="hidden md:flex flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex-grow">
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                    Our mission is to ensure that every child and community has access to education and essential services through volunteering, partnerships, fellowships, and community programs.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
