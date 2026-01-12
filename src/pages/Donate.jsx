import React from 'react';

export default function Donate() {
  const UPI_PAYEE_VPA = '8197963583@ybl';
  const UPI_PAYEE_NAME = 'WISER Foundation';
  const CURRENCY = 'INR';

  function buildUpiUri() {
    const params = new URLSearchParams({
      pa: UPI_PAYEE_VPA,
      pn: UPI_PAYEE_NAME,
      cu: CURRENCY,
    });
    return `upi://pay?${params.toString()}`;
  }

  function openAppSpecific(appKey) {
    const pa = UPI_PAYEE_VPA;
    const pn = UPI_PAYEE_NAME;

    const pkgMap = {
      gpay: 'com.google.android.apps.nbu.paisa.user',
      phonepe: 'com.phonepe.app',
      paytm: 'net.one97.paytm',
      bhim: 'in.org.npci.upiapp',
    };

    const pkg = pkgMap[appKey];
    const intentUri = `intent://upi/pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&cu=${CURRENCY}#Intent;scheme=upi;package=${pkg};end`;
    const fallback = buildUpiUri();

    try {
      window.location.href = intentUri;
      setTimeout(() => {
        window.location.href = fallback;
      }, 1200);
    } catch (e) {
      window.location.href = fallback;
    }
  }

  async function handleCopyUri() {
    try {
      await navigator.clipboard.writeText(UPI_PAYEE_VPA);
      alert('UPI ID copied to clipboard.');
    } catch (e) {
      prompt('Copy this UPI ID', UPI_PAYEE_VPA);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Header - Line Removed */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-12 text-center shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            Make a <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Donation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your contribution helps us empower communities through education and development.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Card: UPI Details (Same Height) */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">UPI Details</h2>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-dashed border-gray-300 text-center mb-6 relative group hover:border-red-300 transition-colors">
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">UPI ID</p>
                <p className="font-mono text-2xl md:text-3xl font-bold text-gray-800 break-all select-all">
                  {UPI_PAYEE_VPA}
                </p>
                <div className="mt-2 text-xs text-gray-400 bg-white/50 inline-block px-2 py-1 rounded">
                  Payee: {UPI_PAYEE_NAME}
                </div>
              </div>

              <div className="mt-auto">
                  <button 
                    onClick={handleCopyUri} 
                    className="w-full py-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white rounded-xl text-lg font-bold shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Copy UPI ID
                  </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Scan QR code or copy ID to pay via GPay, PhonePe, Paytm, or BHIM.
              </p>
            </div>
          </div>

          {/* Right Card: QR Code (Same Height) */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-grow flex flex-col justify-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Scan & Pay</h2>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-inner inline-block mx-auto">
                <img 
                  src="/images/qr code.jpg" 
                  alt="UPI QR Code" 
                  className="w-64 h-64 md:w-72 md:h-72 object-contain"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-100">
               <p className="text-sm font-semibold text-gray-700 mb-1">Secure Payment</p>
               <p className="text-xs text-gray-500">
                 Supports all major UPI payment applications instantly.
               </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}