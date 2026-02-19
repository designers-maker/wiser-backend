// Test script to verify PDF functionality works
// Run this in browser console on your deployed site

async function testPDFDownload() {
  console.log('Testing PDF download functionality...');
  
  try {
    // Test if jsPDF is available
    const { jsPDF } = await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    console.log('✅ jsPDF loaded successfully');
    
    // Test if autotable is available
    await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js');
    console.log('✅ jsPDF AutoTable loaded successfully');
    
    // Create a simple test PDF
    const doc = new jsPDF();
    doc.text('PDF Test Successful!', 20, 20);
    doc.autoTable({
      head: [['Test', 'Status']],
      body: [['PDF Generation', 'Working']]
    });
    
    console.log('✅ PDF created successfully');
    console.log('✅ All PDF dependencies are working correctly');
    
    // Try to save (this might be blocked by browser in some cases)
    try {
      doc.save('test.pdf');
      console.log('✅ PDF download initiated');
    } catch (saveError) {
      console.log('⚠️ PDF save might be blocked by browser settings');
    }
    
  } catch (error) {
    console.error('❌ PDF test failed:', error);
    console.error('Common solutions:');
    console.error('1. Check if you have an active internet connection');
    console.error('2. Ensure browser allows popups/downloads');
    console.error('3. Try in a different browser');
    console.error('4. Check browser console for specific error messages');
  }
}

// Run the test
testPDFDownload();