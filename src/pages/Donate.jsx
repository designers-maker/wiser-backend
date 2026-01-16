import React, { useState, useEffect } from 'react';

export default function Donate() {
  const UPI_PAYEE_VPA = '8197963583@ybl';
  const UPI_PAYEE_NAME = 'WISER Foundation';
  const CURRENCY = 'INR';

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [showPaymentApps, setShowPaymentApps] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = [1000, 2000, 3000, 5000, 10000];

  // Check for payment success on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setShowSuccess(true);
      // Remove query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
      // Auto hide after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
    
    // Check for donation confirmation
    const donationId = localStorage.getItem('pendingDonationId');
    if (donationId) {
      // Simulate payment confirmation (in real app, this would come from payment gateway)
      setTimeout(async () => {
        try {
          await confirmDonation(donationId);
          setShowSuccess(true);
          localStorage.removeItem('pendingDonationId');
          // Reset form
          setSelectedAmount(null);
          setCustomAmount('');
          setDonorName('');
        } catch (error) {
          console.error('Failed to confirm donation:', error);
        }
      }, 2000);
    }
  }, []);

  // Handle Pay Button Click
  function handlePayClick() {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 1) {
      alert('Please select or enter a valid amount');
      return;
    }
    if (!donorName.trim()) {
      alert('Please enter your name');
      return;
    }
    setShowPaymentApps(true);
  }

  // UPI Deep Link Handler with Amount
  function buildUpiUri(amount = '') {
    const params = new URLSearchParams({
      pa: UPI_PAYEE_VPA,
      pn: UPI_PAYEE_NAME,
      cu: CURRENCY,
    });
    if (amount) {
      params.append('am', amount);
    }
    return `upi://pay?${params.toString()}`;
  }

  async function openAppSpecific(appKey, amount = '') {
    const pa = UPI_PAYEE_VPA;
    const pn = UPI_PAYEE_NAME;
    const finalAmount = amount || selectedAmount || customAmount;

    console.log('Opening payment app:', appKey, 'Amount:', finalAmount);

    // Create temporary donation record with pending status
    const tempDonationId = await createPendingDonation(finalAmount, appKey);
    
    const pkgMap = {
      gpay: 'com.google.android.apps.nbu.paisa.user',
      phonepe: 'com.phonepe.app',
      paytm: 'net.one97.paytm',
      bhim: 'in.org.npci.upiapp',
    };

    const pkg = pkgMap[appKey];
    let intentUri = `intent://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&cu=${CURRENCY}&tn=Donation_${tempDonationId}`;
    if (finalAmount) {
      intentUri += `&am=${finalAmount}`;
    }
    intentUri += `#Intent;scheme=upi;package=${pkg};end`;
    
    const fallback = buildUpiUri(finalAmount);

    console.log('Payment URI:', intentUri);

    // Redirect to payment app
    try {
      window.location.href = intentUri;
      setTimeout(() => {
        window.location.href = fallback;
      }, 1500);
    } catch (e) {
      console.error('Error redirecting to payment app:', e);
      window.location.href = fallback;
    }
  }

  // Create pending donation record
  async function createPendingDonation(amount, paymentMethod) {
    const donationData = {
      name: donorName.trim(),
      amount: parseInt(amount),
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'pending',
      timestamp: new Date().toISOString(),
      transactionId: `TEMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    console.log('Creating pending donation:', donationData);

    try {
      const response = await fetch('/api/forms/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Failed to create pending donation:', result);
        throw new Error(result.error || 'Failed to create donation record');
      }

      console.log('Pending donation created:', result);
      return result.id;
    } catch (error) {
      console.error('Error creating pending donation:', error);
      alert('Unable to process donation. Please try again.');
      throw error;
    }
  }

  // Update donation status to completed
  async function confirmDonation(donationId) {
    try {
      const response = await fetch(`/api/forms/donation/${donationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'completed',
          completedAt: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Failed to confirm donation:', result);
        throw new Error(result.error || 'Failed to confirm donation');
      }

      console.log('Donation confirmed successfully:', result);
      return result;
    } catch (error) {
      console.error('Error confirming donation:', error);
      // Don't show alert here as user already paid
      throw error;
    }
  }

  // Share donation
  function handleShare() {
    const amount = selectedAmount || parseInt(customAmount);
    const text = `I just donated ₹${amount.toLocaleString('en-IN')} to WISER Foundation! Join me in supporting education and community development. 🙏`;
    const url = window.location.origin + '/donate';

    if (navigator.share) {
      navigator.share({
        title: 'Support WISER Foundation',
        text: text,
        url: url
      }).catch(() => {});
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${text} ${url}`)
        .then(() => alert('Message copied to clipboard! Share it with your friends.'))
        .catch(() => alert('Please share: ' + text));
    }
  }

  async function handleCopyUri() {
    const amount = selectedAmount || parseInt(customAmount);
    
    // Create pending donation for QR/UPI copy method
    try {
      const donationId = await createPendingDonation(amount, 'UPI_COPY');
      console.log('Pending donation created for UPI copy method:', donationId);
    } catch (error) {
      console.error('Failed to create pending donation for UPI copy:', error);
      return; // Don't proceed if we can't track the donation
    }
    
    try {
      await navigator.clipboard.writeText(UPI_PAYEE_VPA);
      alert('UPI ID copied to clipboard. Please complete payment and return to confirm.');
    } catch (e) {
      prompt('Copy this UPI ID', UPI_PAYEE_VPA);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Success Animation Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-slideUp">
            {/* Animated Checkmark */}
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scaleIn">
              <svg className="w-12 h-12 text-green-600 animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for your generous donation to WISER Foundation.</p>
            
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-12 text-center shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            Make a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">Donation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your contribution helps us empower communities through education and development.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Quick Donation Amounts */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Donation</h2>
              <p className="text-sm text-gray-600">Select an amount or enter your own</p>
            </div>
          </div>

          {/* Predefined Amount Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedAmount === amount
                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                ₹{amount.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          {/* Donor Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg font-semibold"
              required
            />
          </div>

          {/* Custom Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Or Enter Custom Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">₹</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg font-semibold"
                min="1"
              />
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayClick}
            disabled={(!selectedAmount && !customAmount) || !donorName.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Pay Now
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Secure payment • Your donation helps empower communities
          </p>
        </div>

        {/* UPI Payment Apps Modal */}
        {showPaymentApps && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setShowPaymentApps(false)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-slideUp" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose Payment App</h2>
                  <p className="text-sm text-gray-600 mt-1">Amount: ₹{(selectedAmount || parseInt(customAmount)).toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => setShowPaymentApps(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* PhonePe */}
                <button
                  onClick={() => {
                    openAppSpecific('phonepe', selectedAmount || customAmount);
                    setShowPaymentApps(false);
                  }}
                  className="group bg-white border-2 border-gray-200 hover:border-purple-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" 
                      alt="PhonePe" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-purple-600">PhonePe</span>
                </button>

                {/* Google Pay */}
                <button
                  onClick={() => {
                    openAppSpecific('gpay', selectedAmount || customAmount);
                    setShowPaymentApps(false);
                  }}
                  className="group bg-white border-2 border-gray-200 hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" 
                      alt="Google Pay" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-blue-600">Google Pay</span>
                </button>

                {/* Paytm */}
                <button
                  onClick={() => {
                    openAppSpecific('paytm', selectedAmount || customAmount);
                    setShowPaymentApps(false);
                  }}
                  className="group bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/1200px-Paytm_Logo_%28standalone%29.svg.png" 
                      alt="Paytm" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-blue-600">Paytm</span>
                </button>

                {/* BHIM UPI */}
                <button
                  onClick={() => {
                    openAppSpecific('bhim', selectedAmount || customAmount);
                    setShowPaymentApps(false);
                  }}
                  className="group bg-white border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BHIM_logo.svg/1200px-BHIM_logo.svg.png" 
                      alt="BHIM" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-orange-600">BHIM UPI</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                💡 Click any app to complete your donation
              </p>
            </div>
          </div>
        )}

        {/* Combined UPI Details & QR Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Alternative Payment Methods</h2>
              <p className="text-sm text-gray-600">Scan QR code or copy UPI ID</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-4">Scan QR Code</p>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <img 
                  src="/images/qr code.jpg" 
                  alt="UPI QR Code" 
                  className="w-40 h-40 object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Scan with any UPI app
              </p>
            </div>

            {/* UPI ID Section */}
            <div className="flex flex-col justify-center bg-slate-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Or Copy UPI ID</p>
              <div className="bg-white rounded-xl p-4 border border-dashed border-gray-300 mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide text-center">UPI ID</p>
                <p className="font-mono text-xl font-bold text-gray-800 break-all text-center select-all">
                  {UPI_PAYEE_VPA}
                </p>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Payee: {UPI_PAYEE_NAME}
                </p>
              </div>
              <button 
                onClick={handleCopyUri} 
                className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                Copy UPI ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
