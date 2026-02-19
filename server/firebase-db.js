const axios = require('axios');

// Firebase Realtime Database REST API configuration
const FIREBASE_URL = 'https://wiser-volunteer-default-rtdb.firebaseio.com';
// Hardcoded database secret for now
const DATABASE_SECRET = 'Zgzt6Imsj3JBdCTqIV4U9aOkJTDPSCoOyyLUkyck';

// Simple Firebase REST API wrapper
class FirebaseDB {
  constructor() {
    // Store base URL without auth for proper URL construction
    this.baseUrl = FIREBASE_URL;
    this.authParam = DATABASE_SECRET ? `?auth=${DATABASE_SECRET}` : '';
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

      // Use PUT with custom key instead of POST to use our identifier
      const url = `${this.baseUrl}/${collection}/${finalIdentifier}.json${this.authParam}`;
      console.log('Firebase PUT URL:', url);
      const response = await axios.put(url, payload);

      // Return the identifier we used as the ID
      return { id: finalIdentifier, identifier: finalIdentifier };
    } catch (error) {
      console.error('Firebase create error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`Failed to create ${collection}: ${error.message}`);
    }
  }

  // Helper function to check if identifier exists
  async findByIdentifier(collection, identifier) {
    try {
      const url = `${this.baseUrl}/${collection}/${identifier}.json${this.authParam}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // If 404, item doesn't exist, which is fine
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Generic delete function
  async delete(collection, identifier) {
    try {
      const url = `${this.baseUrl}/${collection}/${identifier}.json${this.authParam}`;
      console.log('Firebase DELETE URL:', url);
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Firebase delete error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`Failed to delete from ${collection}: ${error.message}`);
    }
  }

  // Generic find all function
  async findAll(collection, limit = 50) {
    try {
      const url = `${this.baseUrl}/${collection}.json${this.authParam}`;
      const response = await axios.get(url);
      
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
  // Updated collections with proper names
  individualVolunteering = {
    create: (data) => this.create('individual_volunteering_submissions', data),
    findAll: (limit) => this.findAll('individual_volunteering_submissions', limit),
    delete: (id) => this.delete('individual_volunteering_submissions', id)
  };

  corporateVolunteering = {
    create: (data) => this.create('corporate_volunteering_submissions', data),
    findAll: (limit) => this.findAll('corporate_volunteering_submissions', limit),
    delete: (id) => this.delete('corporate_volunteering_submissions', id)
  };

  requestForVolunteering = {
    create: (data) => this.create('request_for_volunteering_submissions', data),
    findAll: (limit) => this.findAll('request_for_volunteering_submissions', limit),
    delete: (id) => this.delete('request_for_volunteering_submissions', id)
  };

  // Legacy collections (maintaining for backward compatibility)
  volunteer = {
    create: (data) => this.create('volunteer_submissions', data),
    findAll: (limit) => this.findAll('volunteer_submissions', limit),
    delete: (id) => this.delete('volunteer_submissions', id)
  };

  csr = {
    create: (data) => this.create('csr_submissions', data),
    findAll: (limit) => this.findAll('csr_submissions', limit),
    delete: (id) => this.delete('csr_submissions', id)
  };

  college = {
    create: (data) => this.create('college_submissions', data),
    findAll: (limit) => this.findAll('college_submissions', limit),
    delete: (id) => this.delete('college_submissions', id)
  };

  contact = {
    create: (data) => this.create('contact_messages', data),
    findAll: (limit) => this.findAll('contact_messages', limit),
    delete: (id) => this.delete('contact_messages', id)
  };

  donation = {
    create: (data) => this.create('donation_records', data),
    findAll: (limit) => this.findAll('donation_records', limit),
    delete: (id) => this.delete('donation_records', id)
  };

  // Company Volunteering Collection
  companyVolunteering = {
    create: (data) => this.create('company_volunteering_records', data),
    findAll: (limit) => this.findAll('company_volunteering_records', limit),
    delete: (id) => this.delete('company_volunteering_records', id)
  };

  // Aliases for backward compatibility
  csr_submissions = this.csr;
  college_submissions = this.college;
  volunteer_submissions = this.volunteer;
}

// Export singleton instance
module.exports = new FirebaseDB();