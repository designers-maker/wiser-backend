const axios = require('axios');

// Firebase Realtime Database REST API configuration
const FIREBASE_URL = 'https://wiser-volunteer-default-rtdb.firebaseio.com';

// Simple Firebase REST API wrapper
class FirebaseDB {
  constructor() {
    this.baseUrl = FIREBASE_URL;
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

      // Use PUT with custom key instead of POST
      const response = await axios.put(
        `${this.baseUrl}/${collection}/${finalIdentifier}.json`,
        payload
      );

      return { id: finalIdentifier, identifier: finalIdentifier };
    } catch (error) {
      throw new Error(`Failed to create ${collection}: ${error.message}`);
    }
  }

  // Helper function to check if identifier exists
  async findByIdentifier(collection, identifier) {
    try {
      const response = await axios.get(`${this.baseUrl}/${collection}/${identifier}.json`);
      return response.data;
    } catch (error) {
      // If 404, item doesn't exist, which is fine
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Generic find all function
  async findAll(collection, limit = 50) {
    try {
      const response = await axios.get(`${this.baseUrl}/${collection}.json`);
      
      if (!response.data) return [];

      // Convert object to array and sort by createdAt
      const results = Object.entries(response.data)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

      return results;
    } catch (error) {
      throw new Error(`Failed to find ${collection}: ${error.message}`);
    }
  }

  // Specific form collections
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
}

// Export singleton instance
module.exports = new FirebaseDB();