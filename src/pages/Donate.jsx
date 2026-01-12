import React from 'react'

export default function Donate(){
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
    <div className="container py-8 sm:py-12 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-red-600">Donate</h1>
      <p className="text-gray-600 mb-6">Support WISER via UPI</p>

      <div className="max-w-3xl space-y-6">
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>UPI ID:</strong> <span className="font-mono text-lg text-red-600">{UPI_PAYEE_VPA}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">Payee Name: {UPI_PAYEE_NAME}</p>
            </div>
            <button onClick={handleCopyUri} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold whitespace-nowrap">
              Copy Link
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-sm font-semibold text-gray-600 mb-3">Scan to donate</p>
          <img src="/images/qr code.jpg" alt="UPI QR Code" className="mx-auto w-64 h-64 object-contain" />
          <p className="text-xs text-gray-500 mt-3">Use any UPI app to scan and donate</p>
        </div>
      </div>
    </div>
  )
}
