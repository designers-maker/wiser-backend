import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Ref to capture the web content for PDF
  const reportContentRef = useRef(null);

  // --- CONFIGURATION ---
  const LOGO_URL = "/WISER Logo.png"; 

  // Sample report data (Unchanged)
  const reportsData = [
    {
      id: 1,
      title: "Annual Impact Report 2024",
      type: "annual",
      date: "2024-12-01",
      description: "Comprehensive overview of our yearly achievements",
      content: `
        <div class="report-content">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border border-blue-100">
            <h2 class="text-3xl font-bold text-gray-900 mb-4 text-center">WISER Foundation Annual Impact Report 2024</h2>
            <div class="text-lg text-gray-700 leading-relaxed mb-6">
              In 2024, WISER Foundation successfully expanded its reach across 15 states, impacting over 50,000 beneficiaries through various volunteer programs and educational initiatives.
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <p class="text-gray-700 italic">
                We focused heavily on scaling our educational programs and strengthening corporate partnerships to ensure sustainable growth.
              </p>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">Key Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p class="text-gray-700"><span class="font-semibold text-blue-700">Total Volunteers:</span> 5,000</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                <p class="text-gray-700"><span class="font-semibold text-green-700">Beneficiaries:</span> 50,000</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <p class="text-gray-700"><span class="font-semibold text-purple-700">Funds Raised (Cr):</span> 2.5</p>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-200">Program Distribution</h3>
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <ul class="space-y-2">
                <li class="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span class="text-gray-700">School Volunteering: <span class="font-semibold text-blue-600">40%</span></span>
                </li>
                <li class="flex items-center p-2 hover:bg-green-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span class="text-gray-700">Corporate Volunteering: <span class="font-semibold text-green-600">35%</span></span>
                </li>
                <li class="flex items-center p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span class="text-gray-700">Community Service: <span class="font-semibold text-purple-600">25%</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">Geographic Reach</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-xl border border-gray-200">
                <h4 class="font-bold text-gray-800 mb-3 text-blue-700">States Covered</h4>
                <ul class="text-gray-700 space-y-1">
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Karnataka</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Tamil Nadu</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Maharashtra</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Telangana</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Andhra Pradesh</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-gray-50 to-indigo-50 p-5 rounded-xl border border-gray-200">
                <h4 class="font-bold text-gray-800 mb-3 text-indigo-700">Impact Areas</h4>
                <ul class="text-gray-700 space-y-1">
                  <li class="flex items-center"><span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span> Education</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span> Healthcare</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span> Environmental</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span> Rural Development</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span> Women Empowerment</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-200">Major Achievements</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-2 text-blue-600">Educational Programs</h4>
                <p class="text-gray-700 text-sm">Launched 150+ digital literacy centers across rural areas, reaching 25,000+ students.</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-2 text-green-600">Healthcare Initiatives</h4>
                <p class="text-gray-700 text-sm">Conducted 200+ medical camps serving 10,000+ individuals in underserved communities.</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-2 text-purple-600">Sustainability Projects</h4>
                <p class="text-gray-700 text-sm">Planted 50,000+ trees and established 50+ water conservation units.</p>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-200">Testimonials</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                <p class="text-gray-700 italic mb-2">"The digital literacy program transformed our school. Students are now confident with technology."</p>
                <p class="text-gray-600 text-sm font-semibold">- Principal, Government School, Bangalore</p>
              </div>
              <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                <p class="text-gray-700 italic mb-2">"Thanks to WISER's healthcare camp, my grandmother received timely treatment."</p>
                <p class="text-gray-600 text-sm font-semibold">- Community Member, Rural Karnataka</p>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-red-200">Challenges & Solutions</h3>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border border-gray-200">
                <h4 class="font-bold text-gray-800 mb-2 text-red-600">Challenge: Remote Area Access</h4>
                <p class="text-gray-700 text-sm">Solution: Partnered with local NGOs and government bodies to establish mobile service units reaching remote villages.</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200">
                <h4 class="font-bold text-gray-800 mb-2 text-red-600">Challenge: Language Barriers</h4>
                <p class="text-gray-700 text-sm">Solution: Developed multilingual educational materials and recruited local volunteers as translators.</p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-xl border border-gray-200">
              <h4 class="font-bold text-gray-800 mb-3 text-blue-700">2025 Goals</h4>
              <ul class="text-gray-700 space-y-2">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Expand to 5 additional states</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Double beneficiary count to 100,000+</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Launch skills development programs</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Establish 200+ new community centers</span>
                </li>
              </ul>
            </div>
            <div class="bg-gradient-to-br from-gray-50 to-indigo-50 p-5 rounded-xl border border-gray-200">
              <h4 class="font-bold text-gray-800 mb-3 text-indigo-700">Strategic Priorities</h4>
              <ul class="text-gray-700 space-y-2">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Strengthen corporate partnerships</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Enhance digital platform capabilities</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Develop sustainable funding models</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Create volunteer certification programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `,
      metrics: {
        totalVolunteers: 5000,
        beneficiaries: 50000,
        funds: 2.5,
        distribution: [
          { name: "School Volunteering", value: 40 },
          { name: "Corporate Volunteering", value: 35 },
          { name: "Community Service", value: 25 }
        ]
      },
      tags: ["annual", "impact"]
    },
    {
      id: 2,
      title: "Quarterly Stats Q4 2024",
      type: "quarterly",
      date: "2024-10-15",
      description: "Detailed statistics on volunteer participation",
      content: `
        <div class="report-content">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Quarterly Volunteer Statistics & Analysis</h2>
            <div class="text-base text-gray-700 leading-relaxed mb-4">
              This quarter saw a significant surge in new volunteer registrations, driven by our university outreach programs.
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <p class="text-gray-700">
                We successfully onboarded 12 new university chapters this quarter.
              </p>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-green-200">Key Participation Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-blue-700">Total Volunteers:</span> 2,847</p>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-purple-700">New Volunteers:</span> 634</p>
              </div>
              <div class="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-indigo-700">Returning Volunteers:</span> 2,213</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-emerald-200">Program Distribution</h3>
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <ul class="space-y-1">
                <li class="flex items-center p-2 hover:bg-green-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">School: <span class="font-semibold text-green-600">45%</span></span>
                </li>
                <li class="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">Corporate: <span class="font-semibold text-blue-600">35%</span></span>
                </li>
                <li class="flex items-center p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">Community: <span class="font-semibold text-purple-600">20%</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-blue-200">Volunteer Demographics</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                <h4 class="font-bold text-gray-800 mb-3 text-blue-700">By Age Group</h4>
                <ul class="text-gray-700 space-y-2">
                  <li class="flex justify-between">
                    <span>18-25 years:</span>
                    <span class="font-semibold text-blue-600">42%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>26-35 years:</span>
                    <span class="font-semibold text-blue-600">31%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>36-50 years:</span>
                    <span class="font-semibold text-blue-600">18%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>50+ years:</span>
                    <span class="font-semibold text-blue-600">9%</span>
                  </li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                <h4 class="font-bold text-gray-800 mb-3 text-green-700">By Profession</h4>
                <ul class="text-gray-700 space-y-2">
                  <li class="flex justify-between">
                    <span>Students:</span>
                    <span class="font-semibold text-green-600">35%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>IT Professionals:</span>
                    <span class="font-semibold text-green-600">28%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Teachers:</span>
                    <span class="font-semibold text-green-600">15%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Others:</span>
                    <span class="font-semibold text-green-600">22%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-purple-200">Regional Participation</h3>
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div class="space-y-3">
                <div class="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg">
                  <span class="text-gray-700 font-medium">Bangalore Urban</span>
                  <span class="font-semibold text-purple-600">420 volunteers</span>
                </div>
                <div class="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg">
                  <span class="text-gray-700 font-medium">Mysore District</span>
                  <span class="font-semibold text-purple-600">285 volunteers</span>
                </div>
                <div class="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg">
                  <span class="text-gray-700 font-medium">Chennai Metropolitan</span>
                  <span class="font-semibold text-purple-600">312 volunteers</span>
                </div>
                <div class="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg">
                  <span class="text-gray-700 font-medium">Hyderabad Region</span>
                  <span class="font-semibold text-purple-600">267 volunteers</span>
                </div>
                <div class="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg">
                  <span class="text-gray-700 font-medium">Pune Area</span>
                  <span class="font-semibold text-purple-600">198 volunteers</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-amber-200">Skill-Based Contributions</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
                <h4 class="font-bold text-gray-800 mb-1 text-amber-700">Technical Skills</h4>
                <p class="text-gray-700 text-xs">Software development, digital marketing, graphic design</p>
                <p class="text-amber-600 text-xs font-semibold mt-1">38% of volunteers</p>
              </div>
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
                <h4 class="font-bold text-gray-800 mb-1 text-amber-700">Teaching Skills</h4>
                <p class="text-gray-700 text-xs">Education, tutoring, mentoring</p>
                <p class="text-amber-600 text-xs font-semibold mt-1">45% of volunteers</p>
              </div>
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
                <h4 class="font-bold text-gray-800 mb-1 text-amber-700">Manual Skills</h4>
                <p class="text-gray-700 text-xs">Construction, crafts, healthcare</p>
                <p class="text-amber-600 text-xs font-semibold mt-1">17% of volunteers</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-red-200">Volunteer Satisfaction</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-200">
                <h4 class="font-bold text-gray-800 mb-2 text-red-700">Feedback Summary</h4>
                <p class="text-gray-700 text-sm mb-2">92% of volunteers reported high satisfaction with their experience.</p>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• Meaningful contribution: 94%</li>
                  <li>• Organizational support: 89%</li>
                  <li>• Team collaboration: 91%</li>
                  <li>• Personal growth: 87%</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-200">
                <h4 class="font-bold text-gray-800 mb-2 text-red-700">Improvement Areas</h4>
                <p class="text-gray-700 text-sm mb-2">Areas identified for enhancement:</p>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• Better communication: 12%</li>
                  <li>• More flexible schedules: 8%</li>
                  <li>• Enhanced training: 15%</li>
                  <li>• Recognition programs: 10%</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
            <h4 class="font-bold text-gray-800 mb-2 text-green-700">Outlook</h4>
            <p class="text-gray-700 text-sm">Continued growth expected with new campus partnerships launching next month. Focus on expanding skill-based volunteering and improving volunteer experience.</p>
          </div>
        </div>
      `,
      metrics: {
        totalVolunteers: 2847,
        newVolunteers: 634,
        returningVolunteers: 2213,
        distribution: [
          { name: "School", value: 45 },
          { name: "Corporate", value: 35 },
          { name: "Community", value: 20 }
        ]
      },
      tags: ["quarterly", "volunteer"]
    },
    {
      id: 3,
      title: "CSR Partnership Report",
      type: "csr",
      date: "2024-11-20",
      description: "Analysis of corporate partnerships",
      content: `
        <div class="report-content">
          <div class="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl mb-6 border border-purple-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">CSR Partnership Analysis Report</h2>
            <div class="text-base text-gray-700 leading-relaxed mb-4">
              Our CSR partners contributed significantly not just in funds, but in skilled man-hours.
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <p class="text-gray-700">
                Key partners like TechCorp and GreenInitiatives led the way in environmental volunteering drives.
              </p>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-purple-200">Partnership Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-blue-700">Total Volunteers:</span> 1,200</p>
              </div>
              <div class="bg-orange-50 p-3 rounded-lg border border-orange-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-orange-700">Hours Contributed:</span> 4,500</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-yellow-700">Funds Raised (Cr):</span> 1.2</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-indigo-200">Engagement Type</h3>
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <ul class="space-y-1">
                <li class="flex items-center p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">Skills-based: <span class="font-semibold text-purple-600">60%</span></span>
                </li>
                <li class="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">General Volunteering: <span class="font-semibold text-blue-600">40%</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-blue-200">Top Corporate Partners</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                <h4 class="font-bold text-gray-800 mb-2 text-blue-700">TechCorp</h4>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• 150 volunteers contributed</li>
                  <li>• 500 hours of tech expertise</li>
                  <li>• ₹35 lakhs in funding</li>
                  <li>• 3 major projects</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <h4 class="font-bold text-gray-800 mb-2 text-green-700">GreenInitiatives</h4>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• 200 volunteers participated</li>
                  <li>• 800 hours of environmental work</li>
                  <li>• ₹45 lakhs in funding</li>
                  <li>• 5 sustainability projects</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                <h4 class="font-bold text-gray-800 mb-2 text-purple-700">EcoSolutions</h4>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• 100 volunteers contributed</li>
                  <li>• 300 hours of expertise</li>
                  <li>• ₹40 lakhs in funding</li>
                  <li>• 2 community projects</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-amber-200">Partnership Impact</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                <h4 class="font-bold text-gray-800 mb-2 text-amber-700">Social Impact</h4>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• 8,500+ beneficiaries reached</li>
                  <li>• 15+ villages supported</li>
                  <li>• 25+ schools engaged</li>
                  <li>• 12+ healthcare camps conducted</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                <h4 class="font-bold text-gray-800 mb-2 text-amber-700">Environmental Impact</h4>
                <ul class="text-gray-700 text-xs space-y-1">
                  <li>• 25,000+ trees planted</li>
                  <li>• 15+ water conservation units</li>
                  <li>• 8+ solar installations</li>
                  <li>• 5+ waste management projects</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-red-200">Partnership Models</h3>
            <div class="space-y-3">
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-1 text-red-600">Skills-Based CSR</h4>
                <p class="text-gray-700 text-sm mb-2">Leveraging employee expertise for social impact projects.</p>
                <div class="text-blue-600 text-xs font-semibold">60% of partnerships</div>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-1 text-red-600">Financial CSR</h4>
                <p class="text-gray-700 text-sm mb-2">Direct financial contributions to support programs.</p>
                <div class="text-blue-600 text-xs font-semibold">30% of partnerships</div>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-1 text-red-600">Infrastructure CSR</h4>
                <p class="text-gray-700 text-sm mb-2">Building physical assets for community development.</p>
                <div class="text-blue-600 text-xs font-semibold">10% of partnerships</div>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-green-200">Partner Feedback</h3>
            <div class="space-y-4">
              <div class="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                <p class="text-gray-700 italic mb-2">"Working with WISER Foundation has enhanced our ESG credentials while providing meaningful engagement opportunities for our employees."</p>
                <p class="text-gray-600 text-sm font-semibold">- CSR Head, TechCorp</p>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                <p class="text-gray-700 italic mb-2">"The partnership model allows us to achieve our sustainability goals while making real social impact in communities."</p>
                <p class="text-gray-600 text-sm font-semibold">- Sustainability Director, GreenInitiatives</p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-gray-50 to-purple-50 p-4 rounded-xl border border-gray-200">
              <h4 class="font-bold text-gray-800 mb-2 text-purple-700">Focus Areas</h4>
              <ul class="text-gray-700 text-sm list-disc pl-5 space-y-1">
                <li>Environmental Volunteering</li>
                <li>Education Support</li>
                <li>Community Health</li>
              </ul>
            </div>
            <div class="bg-gradient-to-br from-gray-50 to-indigo-50 p-4 rounded-xl border border-gray-200">
              <h4 class="font-bold text-gray-800 mb-2 text-indigo-700">Future Collaborations</h4>
              <ul class="text-gray-700 text-sm list-disc pl-5 space-y-1">
                <li>Long-term partnership agreements</li>
                <li>Joint innovation projects</li>
                <li>ESG reporting collaborations</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      metrics: {
        totalVolunteers: 1200,
        hoursContributed: 4500,
        funds: 1.2,
        distribution: [
          { name: "Skills-based", value: 60 },
          { name: "General Volunteering", value: 40 }
        ]
      },
      tags: ["csr", "partnership"]
    },
    {
      id: 4,
      title: "Program Analysis 2024",
      type: "analysis",
      date: "2024-09-30",
      description: "Effectiveness and recommendations",
      content: `
        <div class="report-content">
          <div class="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl mb-6 border border-orange-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Program Effectiveness Analysis Report</h2>
            <div class="text-base text-gray-700 leading-relaxed mb-4">
              Data analysis indicates a 92% efficiency rate in fund utilization.
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500">
              <p class="text-gray-700">
                Strong operational performance across all program verticals.
              </p>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-orange-200">Impact Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-blue-700">Total Volunteers:</span> 3,500</p>
              </div>
              <div class="bg-green-50 p-3 rounded-lg border border-green-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-green-700">Beneficiaries:</span> 12,000</p>
              </div>
              <div class="bg-teal-50 p-3 rounded-lg border border-teal-100">
                <p class="text-gray-700 text-sm"><span class="font-semibold text-teal-700">Efficiency Rate:</span> 92%</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-amber-200">Program Reach</h3>
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <ul class="space-y-1">
                <li class="flex items-center p-2 hover:bg-orange-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">Urban: <span class="font-semibold text-orange-600">70%</span></span>
                </li>
                <li class="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span class="text-gray-700 text-sm">Rural: <span class="font-semibold text-blue-600">30%</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-blue-200">Program Verticals</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                <h4 class="font-bold text-gray-800 mb-2 text-blue-700">Education Programs</h4>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Volunteers:</span>
                    <span class="font-semibold text-blue-600">1,200</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Beneficiaries:</span>
                    <span class="font-semibold text-blue-600">4,500</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Centers:</span>
                    <span class="font-semibold text-blue-600">45</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-2">Focus on digital literacy and STEM education</div>
                </div>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <h4 class="font-bold text-gray-800 mb-2 text-green-700">Healthcare Programs</h4>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Volunteers:</span>
                    <span class="font-semibold text-green-600">800</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Beneficiaries:</span>
                    <span class="font-semibold text-green-600">3,200</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Camps:</span>
                    <span class="font-semibold text-green-600">28</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-2">Medical camps and health awareness</div>
                </div>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                <h4 class="font-bold text-gray-800 mb-2 text-purple-700">Environmental Programs</h4>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Volunteers:</span>
                    <span class="font-semibold text-purple-600">700</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Projects:</span>
                    <span class="font-semibold text-purple-600">18</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Trees Planted:</span>
                    <span class="font-semibold text-purple-600">15,000</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-2">Sustainability and conservation efforts</div>
                </div>
              </div>
              <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                <h4 class="font-bold text-gray-800 mb-2 text-amber-700">Community Programs</h4>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Volunteers:</span>
                    <span class="font-semibold text-amber-600">800</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Communities:</span>
                    <span class="font-semibold text-amber-600">22</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Initiatives:</span>
                    <span class="font-semibold text-amber-600">32</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-2">Rural development and empowerment</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-red-200">Performance Indicators</h3>
            <div class="space-y-3">
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-gray-800 text-red-600">Volunteer Retention Rate</h4>
                  <span class="text-lg font-bold text-red-600">78%</span>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-red-600 h-2.5 rounded-full" style="width: 78%"></div>
                </div>
                <p class="text-gray-600 text-xs mt-2">Percentage of volunteers who return for multiple engagements</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-gray-800 text-blue-600">Beneficiary Satisfaction</h4>
                  <span class="text-lg font-bold text-blue-600">89%</span>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: 89%"></div>
                </div>
                <p class="text-gray-600 text-xs mt-2">Satisfaction rating from program beneficiaries</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-gray-800 text-green-600">Fund Utilization Efficiency</h4>
                  <span class="text-lg font-bold text-green-600">92%</span>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-green-600 h-2.5 rounded-full" style="width: 92%"></div>
                </div>
                <p class="text-gray-600 text-xs mt-2">Percentage of funds effectively utilized for intended purposes</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-gray-800 text-purple-600">Program Coverage</h4>
                  <span class="text-lg font-bold text-purple-600">85%</span>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-purple-600 h-2.5 rounded-full" style="width: 85%"></div>
                </div>
                <p class="text-gray-600 text-xs mt-2">Geographic coverage of program implementation</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-green-200">Resource Allocation</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                <h4 class="font-bold text-gray-800 mb-3 text-green-700">Budget Distribution</h4>
                <ul class="text-gray-700 text-sm space-y-2">
                  <li class="flex justify-between">
                    <span>Program Delivery:</span>
                    <span class="font-semibold text-green-600">65%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Operations:</span>
                    <span class="font-semibold text-green-600">20%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Administration:</span>
                    <span class="font-semibold text-green-600">10%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Marketing:</span>
                    <span class="font-semibold text-green-600">5%</span>
                  </li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-200">
                <h4 class="font-bold text-gray-800 mb-3 text-teal-700">Volunteer Time Allocation</h4>
                <ul class="text-gray-700 text-sm space-y-2">
                  <li class="flex justify-between">
                    <span>Direct Service:</span>
                    <span class="font-semibold text-teal-600">70%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Training & Prep:</span>
                    <span class="font-semibold text-teal-600">20%</span>
                  </li>
                  <li class="flex justify-between">
                    <span>Admin Tasks:</span>
                    <span class="font-semibold text-teal-600">10%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-gray-50 to-orange-50 p-4 rounded-xl border border-gray-200">
              <h4 class="font-bold text-gray-800 mb-2 text-orange-700">Key Recommendations</h4>
              <ul class="text-gray-700 text-sm list-disc pl-5 space-y-1">
                <li>Shift 10% budget to digital infrastructure</li>
                <li>Increase volunteer retention training</li>
                <li>Expand rural outreach programs</li>
                <li>Implement impact measurement tools</li>
                <li>Strengthen monitoring mechanisms</li>
              </ul>
            </div>
            <div class="bg-gradient-to-br from-gray-50 to-amber-50 p-4 rounded-xl border border-gray-200">
              <h4 class="font-bold text-gray-800 mb-2 text-amber-700">Success Factors</h4>
              <ul class="text-gray-700 text-sm list-disc pl-5 space-y-1">
                <li>Strong partner collaboration</li>
                <li>Effective volunteer coordination</li>
                <li>Transparent fund allocation</li>
                <li>Robust monitoring systems</li>
                <li>Community engagement</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      metrics: {
        totalVolunteers: 3500,
        beneficiaries: 12000,
        efficiencyRate: 92,
        distribution: [
          { name: "Urban", value: 70 },
          { name: "Rural", value: 30 }
        ]
      },
      tags: ["analysis", "evaluation"]
    }
  ];

  // --- HELPER: Get Metrics from Report Data ---
  const parseMetrics = (report) => {
    return {
      totalVolunteers: report.metrics?.totalVolunteers || 0,
      newVolunteers: report.metrics?.newVolunteers || 0,
      returningVolunteers: report.metrics?.returningVolunteers || 0,
      beneficiaries: report.metrics?.beneficiaries || 0,
      funds: report.metrics?.funds || 0,
      hoursContributed: report.metrics?.hoursContributed || 0,
      efficiencyRate: report.metrics?.efficiencyRate || 0,
      distribution: report.metrics?.distribution || [{ name: 'No Data', value: 100 }],
    };
  };

  const filteredReports = useMemo(() => {
    return reportsData.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || report.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  const getReportTypeColor = (type) => {
    const colors = {
      annual: 'bg-blue-100 text-blue-800',
      quarterly: 'bg-green-100 text-green-800',
      csr: 'bg-purple-100 text-purple-800',
      analysis: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getReportTypeLabel = (type) => {
    const labels = {
      annual: 'Annual Report',
      quarterly: 'Quarterly Report',
      csr: 'CSR Report',
      analysis: 'Analysis Report'
    };
    return labels[type] || type;
  };

  const chartData = useMemo(() => {
    if (!selectedReport) return null;
    return parseMetrics(selectedReport);
  }, [selectedReport]);

  const METRIC_COLORS = {
    'Volunteers': '#4F46E5',
    'Beneficiaries': '#10B981',
    'Funds (Cr)': '#F59E0B',
    'New Volunteers': '#3B82F6',
    'Returning Volunteers': '#8B5CF6',
    'Hours Contributed': '#F97316',
    'Efficiency Rate': '#06B6D4',
    'No Data': '#9CA3AF'
  };

  const getBarChartData = () => {
    if (!chartData) return [];
    const metrics = [];
    if (chartData.totalVolunteers > 0) metrics.push({ name: 'Volunteers', value: chartData.totalVolunteers, key: 'volunteers' });
    if (chartData.beneficiaries > 0) metrics.push({ name: 'Beneficiaries', value: chartData.beneficiaries, key: 'beneficiaries' });
    if (chartData.funds > 0) metrics.push({ name: 'Funds (Cr)', value: chartData.funds * 10000, key: 'funds' }); 
    if (chartData.newVolunteers > 0) metrics.push({ name: 'New Volunteers', value: chartData.newVolunteers, key: 'newVolunteers' });
    if (chartData.returningVolunteers > 0) metrics.push({ name: 'Returning Volunteers', value: chartData.returningVolunteers, key: 'returningVolunteers' });
    if (chartData.hoursContributed > 0) metrics.push({ name: 'Hours Contributed', value: chartData.hoursContributed, key: 'hoursContributed' });
    if (chartData.efficiencyRate > 0) metrics.push({ name: 'Efficiency Rate', value: chartData.efficiencyRate * 100, key: 'efficiencyRate' }); 
    return metrics;
  };

  const PIE_COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // --- OPTIMIZED PDF DOWNLOAD FUNCTION ---
  // Fixes: Content cropping, PDF size, and performance issues
  const handleDownload = async (event) => {
    if (!selectedReport || !reportContentRef.current) return;

    const element = reportContentRef.current;
    
    try {
      // Show loading indicator
      const downloadBtn = document.getElementById('download-btn');
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating PDF...';
      downloadBtn.disabled = true;

      // 1. Import libraries
      const { jsPDF } = await import('jspdf');
      const html2canvas = await import('html2canvas');

      // 2. Setup PDF dimensions (A4: 210mm x 297mm)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Optimized margins for better content fit
      const marginTop = 20;
      const marginBottom = 15;
      const marginLeft = 15;
      const marginRight = 15;
      const pageContentHeight = pdfHeight - marginTop - marginBottom;

      // 3. Render HTML to Canvas with optimized settings
      const canvas = await html2canvas.default(element, {
        scale: 1.5, // Reduced scale for faster processing and smaller file size
        useCORS: true,
        logging: false,
        windowWidth: 700, // Optimized width for better fit
        backgroundColor: '#ffffff',
        // Remove animations and transitions for cleaner PDF
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-report-content]');
          if (clonedElement) {
            // Remove hover effects and transitions
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach(el => {
              el.style.transition = 'none';
              el.style.transform = 'none';
              el.style.animation = 'none';
            });
          }
        }
      });

      // Use JPEG with compression for smaller file size
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Calculate image dimensions
      const imgWidth = pdfWidth - (marginLeft + marginRight);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calculate total pages needed
      const totalPages = Math.ceil(imgHeight / pageContentHeight);

      // 4. Loop through pages with proper content slicing
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        // --- DRAW HEADER ---
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(marginLeft, 15, pdfWidth - marginRight, 15);

        // Logo
        try {
          pdf.addImage(LOGO_URL, 'PNG', marginLeft, 5, 25, 10);
        } catch (e) {
          pdf.setFontSize(10);
          pdf.text("WISER", marginLeft, 12);
        }

        // Report Type & Date (Right aligned)
        pdf.setFontSize(9);
        pdf.setTextColor(100);
        const reportType = getReportTypeLabel(selectedReport.type).toUpperCase();
        const dateStr = new Date().toLocaleDateString();
        pdf.text(reportType, pdfWidth - marginRight, 8, { align: 'right' });
        pdf.text(`Date: ${dateStr}`, pdfWidth - marginRight, 13, { align: 'right' });

        // --- DRAW CONTENT SLICE ---
        // FIXED: Proper page slicing calculation
        // Calculate the exact pixel position in the source canvas for this page
        const pixelsPerMm = canvas.width / imgWidth; // pixels per mm in the rendered image
        const pageStartY = i * pageContentHeight * pixelsPerMm; // Starting Y position in pixels
        const pageEndY = Math.min((i + 1) * pageContentHeight * pixelsPerMm, canvas.height); // Ending Y position
        const sourceHeightPixels = pageEndY - pageStartY; // Height of this page slice in pixels
        
        // Create a temporary canvas for this page slice
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeightPixels;
        
        const ctx = pageCanvas.getContext('2d');
        // Draw the specific slice from the original canvas
        ctx.drawImage(
          canvas,
          0, pageStartY,           // Source x, y
          canvas.width, sourceHeightPixels,  // Source width, height
          0, 0,                    // Destination x, y
          canvas.width, sourceHeightPixels   // Destination width, height
        );
        
        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.8);
        
        // Calculate the display height for this page slice
        const displayHeight = (sourceHeightPixels * imgWidth) / canvas.width;
        
        // Add the sliced image to the PDF
        pdf.addImage(pageImgData, 'JPEG', marginLeft, marginTop, imgWidth, displayHeight);

        // --- DRAW FOOTER ---
        const footerY = pdfHeight - 8;
        pdf.line(marginLeft, footerY - 3, pdfWidth - marginRight, footerY - 3);
        
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(`Page ${i + 1} of ${totalPages}`, marginLeft, footerY);
        pdf.text("WISER Foundation", pdfWidth - marginRight, footerY, { align: 'right' });
      }

      // 5. Save with optimized filename
      const filename = `WISER_Report_${selectedReport.title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);

      // Restore button
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;

    } catch (error) {
      console.error("Download failed:", error);
      alert("There was an error generating the PDF. Please check console for details.");
      
      // Restore button on error
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Download PDF';
        downloadBtn.disabled = false;
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg"
        >
          <span className="text-blue-200 font-semibold tracking-wide uppercase text-sm opacity-90">Data Driven Impact</span>
          <h1 className="text-4xl font-extrabold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Reports & Analytics</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Visualize our progress through interactive data and comprehensive insights.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search reports, descriptions, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <div className="w-full md:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="annual">Annual</option>
                <option value="quarterly">Quarterly</option>
                <option value="csr">CSR</option>
                <option value="analysis">Analysis</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden flex flex-col h-full"
              onClick={() => setSelectedReport(report)}
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getReportTypeColor(report.type)}`}>
                    {getReportTypeLabel(report.type)}
                  </span>
                  <span className="text-sm font-medium text-gray-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {report.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{report.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{report.description}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Report Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] h-[85vh] flex flex-col md:flex-row overflow-hidden"
          >
            
            {/* Sidebar: Charts & Data */}
            <div className="w-full md:w-5/12 bg-gradient-to-b from-indigo-50 to-blue-50 border-r border-indigo-100 flex flex-col">
              <div className="p-6 border-b border-indigo-200 flex-shrink-0 bg-gradient-to-r from-indigo-100 to-blue-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-indigo-800">Analytics Dashboard</h3>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full bg-opacity-50">LIVE DATA</span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-grow custom-scrollbar bg-gradient-to-b from-white/70 to-indigo-50/50 m-4 rounded-xl shadow-inner p-4">
                
                {/* 1. KEY METRICS SECTION (List View) */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Key Metrics</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {chartData?.totalVolunteers > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">Total Volunteers</span>
                        <span className="text-sm font-bold text-indigo-600">{chartData.totalVolunteers.toLocaleString()}</span>
                      </div>
                    )}
                    {chartData?.newVolunteers > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">New Volunteers</span>
                        <span className="text-sm font-bold text-blue-500">{chartData.newVolunteers.toLocaleString()}</span>
                      </div>
                    )}
                    {chartData?.returningVolunteers > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">Returning Volunteers</span>
                        <span className="text-sm font-bold text-green-500">{chartData.returningVolunteers.toLocaleString()}</span>
                      </div>
                    )}
                    {chartData?.beneficiaries > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">Beneficiaries</span>
                        <span className="text-sm font-bold text-teal-600">{chartData.beneficiaries.toLocaleString()}</span>
                      </div>
                    )}
                    {chartData?.funds > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">Funds Raised</span>
                        <span className="text-sm font-bold text-yellow-600">₹{chartData.funds} Cr</span>
                      </div>
                    )}
                    {chartData?.hoursContributed > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">Hours Contributed</span>
                        <span className="text-sm font-bold text-orange-500">{chartData.hoursContributed.toLocaleString()}</span>
                      </div>
                    )}
                    {chartData?.efficiencyRate > 0 && (
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">Efficiency Rate</span>
                        <span className="text-sm font-bold text-purple-600">{chartData.efficiencyRate}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. PIE CHART */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Distribution</h4>
                  <div className="h-48 w-full bg-white p2 rounded-xl shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData?.distribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData?.distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 3. BAR CHART */}
                <div className="mt-8">
                  <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Comparison</h4>
                  <div className="h-48 w-full bg-white p-4 rounded-xl shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getBarChartData()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <YAxis hide />
                        <Tooltip 
                          cursor={{fill: 'transparent'}} 
                          formatter={(value, name) => {
                            if (name.includes('Funds')) return [`₹${(value/10000).toFixed(1)} Cr`, name];
                            if (name.includes('Rate')) return [`${(value/100).toFixed(0)}%`, name];
                            return [value.toLocaleString(), name];
                          }} 
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                           {getBarChartData().map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={METRIC_COLORS[entry.name] || '#CBD5E1'} />
                           ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="h-8"></div>
              </div>
            </div>

            {/* Main Content Area - This is what gets captured by PDF */}
            <div className="w-full md:w-7/12 flex flex-col h-full bg-white relative">
              <div className="p-6 border-b border-gray-100 flex-shrink-0 z-10 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getReportTypeColor(selectedReport.type)}`}>
                      {getReportTypeLabel(selectedReport.type)}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedReport.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">{selectedReport.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>
              
              {/* WRAPPER DIV FOR PDF CAPTURE */}
              <div className="flex-grow overflow-y-auto custom-scrollbar bg-white relative">
                <div 
                  ref={reportContentRef}
                  className="p-8"
                  style={{ width: '100%', minHeight: '100%' }}
                  data-report-content="true"
                >
                  <div 
                    className="prose prose-indigo max-w-none prose-headings:font-bold prose-a:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: selectedReport.content }}
                  />
                  <div className="h-10"></div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0 z-10">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    id="download-btn"
                    onClick={handleDownload}
                    className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
};

export default Reports;