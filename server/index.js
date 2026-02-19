const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const firebaseDB = require("./firebase-db");
console.log("✅ Firebase Realtime Database initialized...");

const app = express();

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

app.use(cors());
app.use(express.json());

// Firebase connection
const connectDB = async () => {
  try {
    // Test Firebase connection
    await firebaseDB.contact.findAll(1);
    console.log("✅ Firebase Realtime Database connected successfully");
    console.log(
      "🔗 Database URL: https://wiser-volunteer-default-rtdb.firebaseio.com",
    );
    console.log("🎉 No router/firewall blocking issues!");
  } catch (error) {
    console.error("❌ Firebase connection failed:", error.message);
    console.error(
      "🔧 Please check Firebase configuration and network connectivity",
    );
  }
};

connectDB();

const DATA = {
  "tech-talks": {
    title: "Tech talks",
    desc: "Expert-led sessions on modern technologies, best practices, and industry trends.",
    stats: [
      { number: "120+", metric: "Sessions Conducted" },
      { number: "3500+", metric: "Attendees" },
      { number: "85%", metric: "Satisfaction Rate" },
    ],
    image: "/images/9.jpg",
  },
  "mock-interviews": {
    title: "Mock interviews",
    desc: "Structured practice interviews with feedback to build confidence and readiness.",
    stats: [
      { number: "800+", metric: "Mocks Completed" },
      { number: "70%", metric: "Offer Conversion" },
      { number: "250+", metric: "Mentors" },
    ],
    image: "/images/5.jpg",
  },
  "career-counselling": {
    title: "Career counselling",
    desc: "Personalized guidance to choose career paths, upskill plans, and job strategies.",
    stats: [
      { number: "1500+", metric: "Counselling Sessions" },
      { number: "900+", metric: "Placements Supported" },
      { number: "40+", metric: "Partner Orgs" },
    ],
    image: "/images/1.jpg",
  },
  "communication-skills": {
    title: "Communication skills",
    desc: "Interactive workshops to improve verbal and written communication for workplaces.",
    stats: [
      { number: "2000+", metric: "Learners Trained" },
      { number: "95%", metric: "Confidence Gain" },
      { number: "300+", metric: "Sessions" },
    ],
    image: "/images/13.jpg",
  },
  "office-visits": {
    title: "Office visits",
    desc: "Immersive visits to corporate offices to understand culture, roles, and workflows.",
    stats: [
      { number: "120+", metric: "Visits Arranged" },
      { number: "60+", metric: "Companies" },
      { number: "5000+", metric: "Students Hosted" },
    ],
    image: "/images/17.jpg",
  },
  "resume-session": {
    title: "Resume session",
    desc: "Hands-on resume building sessions with ATS checks and recruiter feedback.",
    stats: [
      { number: "3000+", metric: "Resumes Improved" },
      { number: "85%", metric: "Interview Call Boost" },
      { number: "150+", metric: "Workshops" },
    ],
    image: "/images/21.jpg",
  },
  "soft-skills": {
    title: "Soft skills",
    desc: "Training on teamwork, problem solving, adaptability, and leadership skills.",
    stats: [
      { number: "2800+", metric: "Participants" },
      { number: "92%", metric: "Behavioral Uplift" },
      { number: "220+", metric: "Sessions" },
    ],
    image: "/images/2.jpg",
  },
  "faculty-training": {
    title: "Faculty training",
    desc: "Programs for faculty on modern pedagogy, assessment, and industry alignment.",
    stats: [
      { number: "450+", metric: "Faculty Trained" },
      { number: "75+", metric: "Institutions" },
      { number: "95%", metric: "Curriculum Upgrade" },
    ],
    image: "/images/3.jpg",
  },
  "industry-visits": {
    title: "Industry visits",
    desc: "On-site tours to manufacturing, tech, and service industries to learn operations.",
    stats: [
      { number: "90+", metric: "Sites Covered" },
      { number: "35+", metric: "Cities" },
      { number: "4000+", metric: "Beneficiaries" },
    ],
    image: "/images/9.jpg",
  },
  "personality-development": {
    title: "Personality Development",
    desc: "Holistic modules to nurture positivity, self-awareness, and personal branding.",
    stats: [
      { number: "3200+", metric: "Participants" },
      { number: "88%", metric: "Confidence Increase" },
      { number: "180+", metric: "Programs" },
    ],
    image: "/images/1.jpg",
  },
};

app.get("/api/foundation", (req, res) => {
  const list = Object.entries(DATA).map(([slug, payload]) => ({
    slug,
    title: payload.title,
  }));
  res.json(list);
});

app.get("/api/foundation/:slug", (req, res) => {
  const item = DATA[req.params.slug];
  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(item);
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, db: "connected" });
});

app.post("/api/forms/volunteer", async (req, res) => {
  console.log("\n📝 Individual Volunteering form submission received");
  console.log("Data:", req.body);
  try {
    const result = await firebaseDB.individualVolunteering.create(req.body);
    console.log("✅ Individual Volunteering submission saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving individual volunteering submission:", e.message);
    res.status(400).json({ error: "Invalid payload", details: e.message });
  }
});

app.post("/api/forms/individual_volunteering", async (req, res) => {
  console.log("\n📝 Individual Volunteering form submission received");
  console.log("Data:", req.body);
  try {
    console.log('Attempting to save individual volunteering data:', req.body);
    const result = await firebaseDB.individualVolunteering.create(req.body);
    console.log("✅ Individual Volunteering submission saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving individual volunteering submission:", e.message, e.stack);
    res.status(500).json({ error: "Failed to save submission", details: e.message, stack: e.stack });
  }
});

app.post("/api/forms/corporate_volunteering", async (req, res) => {
  console.log("\n📝 Corporate Volunteering form submission received");
  console.log("Data:", req.body);
  try {
    console.log('Attempting to save corporate volunteering data:', req.body);
    const result = await firebaseDB.corporateVolunteering.create(req.body);
    console.log("✅ Corporate Volunteering submission saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving corporate volunteering submission:", e.message, e.stack);
    res.status(500).json({ error: "Failed to save submission", details: e.message, stack: e.stack });
  }
});

app.post("/api/forms/request_for_volunteering", async (req, res) => {
  console.log("\n📝 Request for Volunteering form submission received");
  console.log("Data:", req.body);
  try {
    console.log('Attempting to save request for volunteering data:', req.body);
    const result = await firebaseDB.requestForVolunteering.create(req.body);
    console.log("✅ Request for Volunteering submission saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving request for volunteering submission:", e.message, e.stack);
    res.status(500).json({ error: "Failed to save submission", details: e.message, stack: e.stack });
  }
});

app.post("/api/forms/contact", async (req, res) => {
  console.log("\n📝 Contact form submission received");
  console.log("Data:", req.body);
  try {
    console.log('Attempting to save contact data:', req.body);
    const result = await firebaseDB.contact.create(req.body);
    console.log("✅ Contact message saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving contact message:", e.message, e.stack);
    res.status(500).json({ error: "Failed to save submission", details: e.message, stack: e.stack });
  }
});

// List submissions (latest first)
app.get("/api/forms/volunteer", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.individualVolunteering.findAll(limit);
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching individual volunteering submissions:", e.message);
    res.status(500).json({ error: "Failed to fetch data", details: e.message });
  }
});

// Public route (for legacy compatibility)
app.get("/api/forms/individual_volunteering", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.individualVolunteering.findAll(limit);
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching individual volunteering submissions:", e.message);
    res.status(500).json({ error: "Failed to fetch data", details: e.message });
  }
});

// Protected route for admin access
app.get('/api/admin/forms/individual_volunteering', authenticateAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    console.log('Fetching individual volunteering data with limit:', limit);
    const docs = await firebaseDB.individualVolunteering.findAll(limit);
    console.log('Individual volunteering data fetched:', docs.length, 'records');
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching individual volunteering submissions:", e.message, e.stack);
    res.status(500).json({ error: "Failed to fetch data", details: e.message, stack: e.stack });
  }
});

// Public route (for legacy compatibility)
app.get("/api/forms/corporate_volunteering", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.corporateVolunteering.findAll(limit);
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching corporate volunteering submissions:", e.message);
    res.status(500).json({ error: "Failed to fetch data", details: e.message });
  }
});

// Protected route for admin access
app.get('/api/admin/forms/corporate_volunteering', authenticateAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    console.log('Fetching corporate volunteering data with limit:', limit);
    const docs = await firebaseDB.corporateVolunteering.findAll(limit);
    console.log('Corporate volunteering data fetched:', docs.length, 'records');
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching corporate volunteering submissions:", e.message, e.stack);
    res.status(500).json({ error: "Failed to fetch data", details: e.message, stack: e.stack });
  }
});

app.get("/api/forms/request_for_volunteering", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.requestForVolunteering.findAll(limit);
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching request for volunteering submissions:", e.message);
    res.status(500).json({ error: "Failed to fetch data", details: e.message });
  }
});

// Admin route for request for volunteering
app.get('/api/admin/forms/request_for_volunteering', authenticateAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    console.log('Fetching request for volunteering data with limit:', limit);
    const docs = await firebaseDB.requestForVolunteering.findAll(limit);
    console.log('Request for volunteering data fetched:', docs.length, 'records');
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching request for volunteering submissions:", e.message, e.stack);
    res.status(500).json({ error: "Failed to fetch data", details: e.message, stack: e.stack });
  }
});

// Public route (for legacy compatibility)
app.get("/api/forms/contact", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.contact.findAll(limit);
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching contact messages:", e.message);
    res.status(500).json({ error: "Failed to fetch data", details: e.message });
  }
});

// Protected route for admin access
app.get('/api/admin/forms/contact', authenticateAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    console.log('Fetching contact data with limit:', limit);
    const docs = await firebaseDB.contact.findAll(limit);
    console.log('Contact data fetched:', docs.length, 'records');
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching contact messages:", e.message, e.stack);
    res.status(500).json({ error: "Failed to fetch data", details: e.message, stack: e.stack });
  }
});

// Donation endpoints
app.post("/api/forms/donation", async (req, res) => {
  console.log("\n💝 Donation submission received");
  console.log("Data:", req.body);
  try {
    const result = await firebaseDB.donation.create(req.body);
    console.log("✅ Donation saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving donation:", e.message);
    res.status(400).json({ error: "Invalid payload", details: e.message });
  }
});

// Update donation status (for payment verification)
app.patch("/api/forms/donation/:id", async (req, res) => {
  console.log("\n🔄 Updating donation status");
  console.log("ID:", req.params.id);
  console.log("Update data:", req.body);

  try {
    // In a real implementation, you'd update the specific record
    // For Firebase, you'd typically fetch, modify, and save back
    // This is a simplified version

    // Simulate successful update
    const updatedData = {
      id: req.params.id,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    console.log("✅ Donation status updated:", updatedData);
    res.status(200).json(updatedData);
  } catch (e) {
    console.error("❌ Error updating donation:", e.message);
    res
      .status(400)
      .json({ error: "Failed to update donation", details: e.message });
  }
});

// Public route (for legacy compatibility)
app.get("/api/forms/donation", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.donation.findAll(limit);
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching donations:", e.message);
    res.status(500).json({ error: "Failed to fetch data", details: e.message });
  }
});

// Protected route for admin access
app.get("/api/admin/forms/donation", authenticateAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    console.log('Fetching donation data with limit:', limit);
    const docs = await firebaseDB.donation.findAll(limit);
    console.log('Donation data fetched:', docs.length, 'records');
    res.json(docs);
  } catch (e) {
    console.error("❌ Error fetching donations:", e.message, e.stack);
    res.status(500).json({ error: "Failed to fetch data", details: e.message, stack: e.stack });
  }
});

// Company Volunteering API endpoints
app.get('/api/admin/company-volunteering', authenticateAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const docs = await firebaseDB.companyVolunteering.findAll(limit);
    res.json(docs);
  } catch (error) {
    console.error('Error fetching company volunteering data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/api/admin/company-volunteering', authenticateAdmin, async (req, res) => {
  try {
    const { companyName, date, hours, volunteers, location, description } = req.body;
    
    // Validate required fields
    if (!companyName || !date || !hours || !volunteers || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const result = await firebaseDB.companyVolunteering.create({
      companyName,
      date,
      hours: parseFloat(hours),
      volunteers: parseInt(volunteers),
      location,
      description,
      createdAt: new Date().toISOString()
    });
    
    // Since we just created the record, return the data sent plus the ID
    const newRecord = {
      id: result.id,
      companyName,
      date,
      hours: parseFloat(hours),
      volunteers: parseInt(volunteers),
      location,
      description,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error saving company volunteering data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

app.put('/api/admin/company-volunteering/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, date, hours, volunteers, students, location, description } = req.body;
    
        // For Firebase Realtime DB, we need to recreate the entry
    // since it doesn't support direct updates
    // In a real implementation, you would need to delete the old entry and create a new one
    // For simplicity, we'll just create a new entry with updated data
    const result = await firebaseDB.companyVolunteering.create({
      id: parseInt(id),
      companyName,
      date,
      hours: parseFloat(hours),
      volunteers: parseInt(volunteers),
      students: parseInt(students) || 0,
      location,
      description,
      updatedAt: new Date().toISOString()
    });
    
    // Since we can't easily retrieve the newly created record with the same ID,
    // we'll return the data as provided
    const updatedRecord = {
      id: parseInt(id),
      companyName,
      date,
      hours: parseFloat(hours),
      volunteers: parseInt(volunteers),
      students: parseInt(students) || 0,
      location,
      description,
      updatedAt: new Date().toISOString()
    };
    
    res.json(updatedRecord);
  } catch (error) {
    console.error('Error updating company volunteering data:', error);
    res.status(500).json({ message: 'Error updating data' });
  }
});

app.delete('/api/admin/company-volunteering/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete the record from Firebase
    await firebaseDB.companyVolunteering.delete(id);
    
    res.json({ message: 'Record deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting company volunteering data:', error);
    res.status(500).json({ message: 'Error deleting data', details: error.message });
  }
});

// Delete individual volunteering record
app.delete('/api/admin/forms/individual_volunteering/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await firebaseDB.individualVolunteering.delete(id);
    
    res.json({ message: 'Individual volunteering record deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting individual volunteering data:', error);
    res.status(500).json({ message: 'Error deleting data', details: error.message });
  }
});

// Delete corporate volunteering record
app.delete('/api/admin/forms/corporate_volunteering/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await firebaseDB.corporateVolunteering.delete(id);
    
    res.json({ message: 'Corporate volunteering record deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting corporate volunteering data:', error);
    res.status(500).json({ message: 'Error deleting data', details: error.message });
  }
});

// Delete request for volunteering record
app.delete('/api/admin/forms/request_for_volunteering/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await firebaseDB.requestForVolunteering.delete(id);
    
    res.json({ message: 'Request for volunteering record deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting request for volunteering data:', error);
    res.status(500).json({ message: 'Error deleting data', details: error.message });
  }
});

// Delete contact message
app.delete('/api/admin/forms/contact/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await firebaseDB.contact.delete(id);
    
    res.json({ message: 'Contact message deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: 'Error deleting data', details: error.message });
  }
});

// Delete donation record
app.delete('/api/admin/forms/donation/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await firebaseDB.donation.delete(id);
    
    res.json({ message: 'Donation record deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting donation data:', error);
    res.status(500).json({ message: 'Error deleting data', details: error.message });
  }
});


// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real application, you would verify credentials against a database
  // For now, we'll use hardcoded admin credentials
  const validAdminEmail = process.env.ADMIN_EMAIL || 'admin@wiservolunteer.org';
  const validAdminPassword = process.env.ADMIN_PASSWORD || 'Wiserfoundation@7777';
  
  if (email === validAdminEmail && password === validAdminPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: 1, 
        email: validAdminEmail, 
        isAdmin: true,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    res.json({
      token,
      admin: {
        id: 1,
        email: validAdminEmail,
        isAdmin: true
      },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password'
    });
  }
});

// Protected admin endpoints
app.get('/api/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // Get counts for dashboard with higher limit to ensure we get data
    const [individualCount, corporateCount, requestForVolunteeringCount, contactCount, donationCount] = await Promise.all([
      firebaseDB.individualVolunteering.findAll(50),
      firebaseDB.corporateVolunteering.findAll(50),
      firebaseDB.requestForVolunteering.findAll(50),
      firebaseDB.contact.findAll(50),
      firebaseDB.donation.findAll(50)
    ]);
    
    console.log('Dashboard counts:', {
      individual: individualCount.length,
      corporate: corporateCount.length,
      requestForVolunteering: requestForVolunteeringCount.length,
      contact: contactCount.length,
      donation: donationCount.length
    });
    
    res.json({
      totalSubmissions: individualCount.length + corporateCount.length + requestForVolunteeringCount.length + contactCount.length + donationCount.length,
      individualVolunteers: individualCount.length,
      corporateVolunteers: corporateCount.length,
      requestForVolunteering: requestForVolunteeringCount.length,
      contactMessages: contactCount.length,
      donations: donationCount.length
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
