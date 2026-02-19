import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import API_CONFIG from '../../config/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSubmissions: 0,
    individualVolunteers: 0,
    corporateVolunteers: 0,
    contactMessages: 0,
    donations: 0,
    recentSubmissions: []
  });
  const [loading, setLoading] = useState(true);
  const [allFormData, setAllFormData] = useState({
    individualData: [],
    corporateData: [],
    requestForVolunteeringData: [],
    contactData: [],
    donationData: []
  });

  // Function to download data as PDF
  const downloadAsPDF = async (data, title, headers, getDataRow) => {
    if (!data || data.length === 0) {
      alert('No data available to download');
      return;
    }

    try {
      // Dynamically import jsPDF for better Netlify compatibility
      const { jsPDF } = await import('jspdf');
      await import('jspdf-autotable');
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text(title, 20, 20);
      
      // Add generation date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
      
      let yPosition = 40;
      
      // Add main table
      if (data.length > 0) {
        doc.setFontSize(14);
        doc.text('Detailed Records', 20, yPosition);
        yPosition += 10;
        
        // Prepare table data
        const tableData = data.map(getDataRow);
        
        // AutoTable for detailed records
        doc.autoTable({
          startY: yPosition,
          head: [headers],
          body: tableData,
          styles: {
            fontSize: 8,
          },
          headStyles: {
            fillColor: [29, 78, 216], // blue-600
          },
          margin: { left: 20, right: 20 },
        });
      }
      
      // Save the PDF
      const fileName = title.replace(/[^a-zA-Z0-9]/g, '_') + '_report.pdf';
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating report. Please try again. Make sure you have an active internet connection.');
    }
  };

  // Download functions for each form type
  const downloadIndividualVolunteers = async () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Department', 'Course', 'Year', 'Message', 'Date'];
    const getDataRow = (item) => [
      item.name || 'N/A',
      item.email || 'N/A',
      item.phone || 'N/A',
      item.college || 'N/A',
      item.department || 'N/A',
      item.course || 'N/A',
      item.year || 'N/A',
      item.message || item.description || 'N/A',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
    ];
    downloadAsPDF(allFormData.individualData, 'Individual Volunteers Report', headers, getDataRow);
  };

  const downloadCorporateVolunteers = async () => {
    const headers = ['Name', 'Email', 'Contact', 'Company', 'Role', 'Message', 'Date'];
    const getDataRow = (item) => [
      item.name || 'N/A',
      item.email || 'N/A',
      item.contact || item.phone || 'N/A',
      item.companyName || item.company || 'N/A',
      item.role || 'N/A',
      item.message || item.description || 'N/A',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
    ];
    downloadAsPDF(allFormData.corporateData, 'Corporate Volunteers Report', headers, getDataRow);
  };

  const downloadRequestForVolunteering = async () => {
    const headers = ['Name', 'Email', 'Contact', 'Organization', 'Type', 'Message', 'Date'];
    const getDataRow = (item) => [
      item.name || 'N/A',
      item.email || 'N/A',
      item.contact || item.phone || 'N/A',
      item.organization || item.company || 'N/A',
      item.type || 'N/A',
      item.message || item.description || 'N/A',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
    ];
    downloadAsPDF(allFormData.requestForVolunteeringData, 'Request for Volunteering Report', headers, getDataRow);
  };

  const downloadContactMessages = async () => {
    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date'];
    const getDataRow = (item) => [
      item.name || 'N/A',
      item.email || 'N/A',
      item.subject || 'N/A',
      item.message || 'N/A',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
    ];
    downloadAsPDF(allFormData.contactData, 'Contact Messages Report', headers, getDataRow);
  };

  const downloadDonations = async () => {
    const headers = ['Name', 'Amount', 'Email', 'Phone', 'Date'];
    const getDataRow = (item) => [
      item.name || 'N/A',
      `₹${item.amount || 0}`,
      item.email || 'N/A',
      item.phone || 'N/A',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
    ];
    downloadAsPDF(allFormData.donationData, 'Donations Report', headers, getDataRow);
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          // Redirect to login if no token
          window.location.href = '/admin/login';
          return;
        }

        // Fetch all data concurrently
        const responses = await Promise.all([
          fetch(API_CONFIG.ENDPOINTS.FORMS.INDIVIDUAL_VOLUNTEERING, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(API_CONFIG.ENDPOINTS.FORMS.CORPORATE_VOLUNTEERING, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(API_CONFIG.ENDPOINTS.FORMS.REQUEST_FOR_VOLUNTEERING, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(API_CONFIG.ENDPOINTS.FORMS.CONTACT, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(API_CONFIG.ENDPOINTS.FORMS.DONATION, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const [individualResp, corporateResp, requestForVolunteeringResp, contactResp, donationResp] = responses;

        if (responses.some(resp => resp.status === 401)) {
          // Unauthorized, redirect to login
          window.location.href = '/admin/login';
          return;
        }

        const [individualData, corporateData, requestForVolunteeringData, contactData, donationData] = await Promise.all([
          individualResp.json(),
          corporateResp.json(),
          requestForVolunteeringResp.json(),
          contactResp.json(),
          donationResp.json()
        ]);

        // Set all form data for download functionality
        setAllFormData({
          individualData,
          corporateData,
          requestForVolunteeringData,
          contactData,
          donationData
        });

        // Calculate metrics
        const totalSubmissions = individualData.length + corporateData.length + requestForVolunteeringData.length + contactData.length + donationData.length;

        setDashboardData({
          totalSubmissions,
          individualVolunteers: individualData.length,
          corporateVolunteers: corporateData.length,
          requestForVolunteering: requestForVolunteeringData.length,
          contactMessages: contactData.length,
          donations: donationData.length,
          recentSubmissions: [
            ...individualData.slice(0, 3).map(item => ({ ...item, type: 'Individual Volunteer' })),
            ...corporateData.slice(0, 3).map(item => ({ ...item, type: 'Corporate Volunteer' })),
            ...requestForVolunteeringData.slice(0, 3).map(item => ({ ...item, type: 'Request for Volunteering' })),
            ...contactData.slice(0, 3).map(item => ({ ...item, type: 'Contact Message' })),
            ...donationData.slice(0, 3).map(item => ({ ...item, type: 'Donation' }))
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Stats cards
  const stats = [
    { name: 'Total Submissions', value: dashboardData.totalSubmissions, icon: '📊', color: 'bg-blue-500' },
    { name: 'Individual Volunteers', value: dashboardData.individualVolunteers, icon: '👥', color: 'bg-green-500' },
    { name: 'Corporate Volunteers', value: dashboardData.corporateVolunteers, icon: '🏢', color: 'bg-purple-500' },
    { name: 'Request for Volunteering', value: dashboardData.requestForVolunteering, icon: '📋', color: 'bg-indigo-500' },
    { name: 'Contact Messages', value: dashboardData.contactMessages, icon: '✉️', color: 'bg-yellow-500' },
    { name: 'Donations', value: dashboardData.donations, icon: '💰', color: 'bg-pink-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, Administrator</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 text-white ${stat.color}`}>
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Individual Volunteers Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
              <Link to="/admin/submissions/individual" className="block p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">👥</div>
                  <div 
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        await downloadIndividualVolunteers();
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Download failed. Please check your internet connection and try again.');
                      }
                    }}
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg cursor-pointer transition-colors"
                    title="Download Individual Volunteers Data"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Individual Volunteers</h3>
                <p className="text-sm text-gray-500">{dashboardData.individualVolunteers} submissions</p>
              </Link>
            </div>
            
            {/* Corporate Volunteers Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
              <Link to="/admin/submissions/corporate" className="block p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">🏢</div>
                  <div 
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        await downloadCorporateVolunteers();
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Download failed. Please check your internet connection and try again.');
                      }
                    }}
                    className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg cursor-pointer transition-colors"
                    title="Download Corporate Volunteers Data"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Corporate Volunteers</h3>
                <p className="text-sm text-gray-500">{dashboardData.corporateVolunteers} submissions</p>
              </Link>
            </div>
            
            {/* Contact Messages Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
              <Link to="/admin/submissions/contacts" className="block p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">✉️</div>
                  <div 
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        await downloadContactMessages();
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Download failed. Please check your internet connection and try again.');
                      }
                    }}
                    className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-lg cursor-pointer transition-colors"
                    title="Download Contact Messages Data"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Contact Messages</h3>
                <p className="text-sm text-gray-500">{dashboardData.contactMessages} messages</p>
              </Link>
            </div>
            
            {/* Donations Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
              <Link to="/admin/submissions/donations" className="block p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">💰</div>
                  <div 
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        await downloadDonations();
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Download failed. Please check your internet connection and try again.');
                      }
                    }}
                    className="bg-pink-100 hover:bg-pink-200 p-2 rounded-lg cursor-pointer transition-colors"
                    title="Download Donations Data"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Donations</h3>
                <p className="text-sm text-gray-500">{dashboardData.donations} records</p>
              </Link>
            </div>
            
            {/* Request for Volunteering Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
              <Link to="/admin/submissions/request-for-volunteering" className="block p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">📋</div>
                  <div 
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        await downloadRequestForVolunteering();
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Download failed. Please check your internet connection and try again.');
                      }
                    }}
                    className="bg-indigo-100 hover:bg-indigo-200 p-2 rounded-lg cursor-pointer transition-colors"
                    title="Download Request for Volunteering Data"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Request for Volunteering</h3>
                <p className="text-sm text-gray-500">{dashboardData.requestForVolunteering} submissions</p>
              </Link>
            </div>
            
            {/* Company Volunteering Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
              <Link to="/admin/company-volunteering" className="block p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">💼</div>
                  <div className="w-8 h-8"></div> {/* Spacer for alignment */}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Company Volunteering</h3>
                <p className="text-sm text-gray-500">Manage records</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Submissions</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest activity across all forms</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company/Organization
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentSubmissions.length > 0 ? (
                  dashboardData.recentSubmissions.map((submission, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.name || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.phone || submission.contact || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.companyName || submission.company || submission.organization || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={submission.message || submission.description || submission.about || submission.details || submission.notes || 'N/A'}>{submission.message || submission.description || submission.about || submission.details || submission.notes || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No recent submissions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;