// Test script to verify donation API endpoint
// Run this with: node test-donation.js

const testDonation = async () => {
  const donationData = {
    name: "Test Donor",
    amount: 1000,
    paymentMethod: "PHONEPE",
    timestamp: new Date().toISOString()
  };

  console.log('Testing donation API...');
  console.log('Sending data:', donationData);

  try {
    const response = await fetch('http://localhost:3001/api/forms/donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Donation saved:', result);
    } else {
      console.error('❌ Failed:', result);
    }

    // Fetch all donations
    console.log('\nFetching all donations...');
    const getResponse = await fetch('http://localhost:3001/api/forms/donation');
    const donations = await getResponse.json();
    console.log('Total donations:', donations.length);
    console.log('Latest donation:', donations[0]);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Make sure backend server is running:');
    console.log('   npm run server');
  }
};

testDonation();
