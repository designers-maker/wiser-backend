// Image Configuration - Centralized image paths with proper URLs
// This ensures consistent image loading across all environments

// Base URL for images (can be customized for different environments)
const BASE_IMAGE_URL = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Logo Images - Each with separate configurable URL
export const LOGOS = {
  partner1: process.env.REACT_APP_PARTNER1_LOGO || `${BASE_IMAGE_URL}/logos/partner1.png`,
  partner2: process.env.REACT_APP_PARTNER2_LOGO || `${BASE_IMAGE_URL}/logos/partner2.png`,
  partner3: process.env.REACT_APP_PARTNER3_LOGO || `${BASE_IMAGE_URL}/logos/partner3.png`,
  // partner4 is intentionally excluded as requested
  partner5: process.env.REACT_APP_PARTNER5_LOGO || `${BASE_IMAGE_URL}/logos/partner5.png`,
  partner6: process.env.REACT_APP_PARTNER6_LOGO || `${BASE_IMAGE_URL}/logos/partner6.png`,
  asdc: process.env.REACT_APP_ASDC_LOGO || `${BASE_IMAGE_URL}/logos/ASDC.jpg`,
  awake: process.env.REACT_APP_AWAKE_LOGO || `${BASE_IMAGE_URL}/logos/awake.jpg`,
  barclays: process.env.REACT_APP_BARCLAYS_LOGO || `${BASE_IMAGE_URL}/logos/barclays.png`,
  beml: process.env.REACT_APP_BEML_LOGO || `${BASE_IMAGE_URL}/logos/beml.png`,
  biofin: process.env.REACT_APP_BIOFIN_LOGO || `${BASE_IMAGE_URL}/logos/biofin.png`,
};

// Certification Images
export const CERTIFICATIONS = {
  cert1: `${BASE_IMAGE_URL}/certs/1.png`,
  cert2: `${BASE_IMAGE_URL}/certs/2.jpg`,
  cert3: `${BASE_IMAGE_URL}/certs/3.png`,
};

// Hero Images
export const HERO_IMAGES = {
  home1: `${BASE_IMAGE_URL}/images/home1.jpeg`,
  home2: `${BASE_IMAGE_URL}/images/home2.jpg`,
  home3: `${BASE_IMAGE_URL}/images/home3.jpg`,
  home4: `${BASE_IMAGE_URL}/images/home4.jpg`,
  home5: `${BASE_IMAGE_URL}/images/home5.jpg`,
};

// Project Images
export const PROJECT_IMAGES = {
  project1: `${BASE_IMAGE_URL}/images/1.jpg`,
  project2: `${BASE_IMAGE_URL}/images/2.jpg`,
  project3: `${BASE_IMAGE_URL}/images/3.jpg`,
  project4: `${BASE_IMAGE_URL}/images/4.jpg`,
  project5: `${BASE_IMAGE_URL}/images/5.jpg`,
  project9: `${BASE_IMAGE_URL}/images/9.jpg`,
  project13: `${BASE_IMAGE_URL}/images/13.jpg`,
  // Add more as needed
};

// Animation Frames
export const ANIMATION_FRAMES = {
  frame1: `${BASE_IMAGE_URL}/animation/1.png`,
  frame2: `${BASE_IMAGE_URL}/animation/2.png`,
  frame3: `${BASE_IMAGE_URL}/animation/3.png`,
  frame4: `${BASE_IMAGE_URL}/animation/4.png`,
  frame5: `${BASE_IMAGE_URL}/animation/5.png`,
};

// Export all images grouped by category
export const IMAGES = {
  logos: LOGOS,
  certifications: CERTIFICATIONS,
  hero: HERO_IMAGES,
  projects: PROJECT_IMAGES,
  animations: ANIMATION_FRAMES,
};

// Helper function to get partner logos (excluding partner4)
export const getPartnerLogos = () => {
  return [
    LOGOS.partner1,
    LOGOS.partner2,
    LOGOS.partner3,
    LOGOS.partner5,
    LOGOS.partner6
  ];
};

// Helper function to get all certification images
export const getCertificationImages = () => {
  return [
    CERTIFICATIONS.cert1,
    CERTIFICATIONS.cert2,
    CERTIFICATIONS.cert3
  ];
};

export default IMAGES;