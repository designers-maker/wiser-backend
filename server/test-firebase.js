const firebaseDB = require('./firebase-db');

async function testFirebaseConnection() {
    try {
        console.log('Testing Firebase connection...');
        
        // Test creating a simple record
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            company: 'Test Company',
            message: 'Test message',
            timestamp: new Date().toISOString()
        };
        
        console.log('Creating test record...');
        const result = await firebaseDB.individualVolunteering.create(testData);
        console.log('✅ Test record created successfully:', result);
        
        // Test retrieving records
        console.log('Retrieving test records...');
        const records = await firebaseDB.individualVolunteering.findAll(5);
        console.log('✅ Retrieved records:', records.length);
        
        console.log('Firebase connection test completed successfully!');
    } catch (error) {
        console.error('❌ Firebase connection test failed:', error);
        console.error('Error details:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testFirebaseConnection();