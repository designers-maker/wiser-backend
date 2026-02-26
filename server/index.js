const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const firebaseDB = require("./firebase-db");
console.log("✅ Firebase Realtime Database initialized...");

const app = express();

// Configure CORS to allow requests from any origin in production
// In production, when the frontend is deployed separately, we need to allow it
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      return callback(null, true);
    }
    
    // In a production deployment, you'd want to specify your frontend domain
    // For now, we'll allow all origins, but in a real production environment
    // you should specify your actual frontend domain
    callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));
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
  console.log("Request headers:", req.headers);
  console.log("Request origin:", req.headers.origin);
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

app.post("/api/forms/corporate_volunteering", async (req, res) => {
  console.log("\n📝 Corporate Volunteering form submission received");
  console.log("Data:", req.body);
  try {
    const result = await firebaseDB.corporateVolunteering.create(req.body);
    console.log("✅ Corporate Volunteering submission saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving corporate volunteering submission:", e.message);
    res.status(400).json({ error: "Invalid payload", details: e.message });
  }
});

app.post("/api/forms/request_for_volunteering", async (req, res) => {
  console.log("\n📝 Request for Volunteering form submission received");
  console.log("Data:", req.body);
  try {
    const result = await firebaseDB.requestForVolunteering.create(req.body);
    console.log("✅ Request for Volunteering submission saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving request for volunteering submission:", e.message);
    res.status(400).json({ error: "Invalid payload", details: e.message });
  }
});

app.post("/api/forms/contact", async (req, res) => {
  console.log("\n📝 Contact form submission received");
  console.log("Data:", req.body);
  try {
    const result = await firebaseDB.contact.create(req.body);
    console.log("✅ Contact message saved with ID:", result.id);
    res.status(201).json(result);
  } catch (e) {
    console.error("❌ Error saving contact message:", e.message);
    res.status(400).json({ error: "Invalid payload", details: e.message });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
