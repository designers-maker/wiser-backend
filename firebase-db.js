const { db } = require('./firebase-admin-config');

// Firebase Realtime Database wrapper using Firebase Admin SDK
class FirebaseDB {
  constructor() {
    // Using Firebase Admin SDK
    this.db = db;
  }

  // Generic create function - now uses name/email as key
  async create(collection, data) {
    try {
      const timestamp = new Date().toISOString();
      
      // Create identifier from name or email
      let identifier = data.name || data.email || 'anonymous';
      
      // Clean the identifier to be Firebase-safe (remove special characters)
      identifier = identifier
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      
      // Ensure uniqueness by adding timestamp if needed
      const baseIdentifier = identifier;
      let counter = 1;
      let finalIdentifier = identifier;
      
      // Check if identifier already exists and modify if needed
      const existingData = await this.findByIdentifier(collection, finalIdentifier);
      while (existingData) {
        finalIdentifier = `${baseIdentifier}_${counter}`;
        counter++;
        // Prevent infinite loop
        if (counter > 100) {
          finalIdentifier = `${baseIdentifier}_${Date.now()}`;
          break;
        }
      }
      
      const payload = {
        ...data,
        identifier: finalIdentifier,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      // Use set() with custom key instead of push to use our identifier
      const ref = this.db.ref(`${collection}/${finalIdentifier}`);
      await ref.set(payload);

      // Return the identifier we used as the ID
      return { id: finalIdentifier, identifier: finalIdentifier };
    } catch (error) {
      console.error('Firebase create error details:', {
        message: error.message,
        stack: error.stack
      });
      throw new Error(`Failed to create ${collection}: ${error.message}`);
    }
  }

  // Helper function to check if identifier exists
  async findByIdentifier(collection, identifier) {
    try {
      const ref = this.db.ref(`${collection}/${identifier}`);
      const snapshot = await ref.once('value');
      return snapshot.val();
    } catch (error) {
      console.error('findByIdentifier error:', error.message);
      return null;
    }
  }

  // Generic find all function
  async findAll(collection, limit = 50) {
    try {
      const ref = this.db.ref(collection);
      const snapshot = await ref.orderByChild('createdAt').limitToLast(limit).once('value');
      const data = snapshot.val();
      
      if (!data) return [];

      // Convert object to array and sort by createdAt (descending)
      const results = Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return results;
    } catch (error) {
      console.error('findAll error:', error.message);
      throw new Error(`Failed to find ${collection}: ${error.message}`);
    }
  }

  // Specific form collections
  // Updated collections with proper names
  individualVolunteering = {
    create: (data) => this.create('individual_volunteering_submissions', data),
    findAll: (limit) => this.findAll('individual_volunteering_submissions', limit)
  };

  corporateVolunteering = {
    create: (data) => this.create('corporate_volunteering_submissions', data),
    findAll: (limit) => this.findAll('corporate_volunteering_submissions', limit)
  };

  requestForVolunteering = {
    create: (data) => this.create('request_for_volunteering_submissions', data),
    findAll: (limit) => this.findAll('request_for_volunteering_submissions', limit)
  };

  // Legacy collections (maintaining for backward compatibility)
  volunteer = {
    create: (data) => this.create('volunteer_submissions', data),
    findAll: (limit) => this.findAll('volunteer_submissions', limit)
  };

  csr = {
    create: (data) => this.create('csr_submissions', data),
    findAll: (limit) => this.findAll('csr_submissions', limit)
  };

  college = {
    create: (data) => this.create('college_submissions', data),
    findAll: (limit) => this.findAll('college_submissions', limit)
  };

  contact = {
    create: (data) => this.create('contact_messages', data),
    findAll: (limit) => this.findAll('contact_messages', limit)
  };

  donation = {
    create: (data) => this.create('donation_records', data),
    findAll: (limit) => this.findAll('donation_records', limit)
  };

  // Aliases for backward compatibility
  csr_submissions = this.csr;
  college_submissions = this.college;
  volunteer_submissions = this.volunteer;
}

// Export singleton instance
module.exports = new FirebaseDB();