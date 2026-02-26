import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import API_CONFIG from '../../config/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CompanyVolunteering = () => {
  const [volunteeringData, setVolunteeringData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    date: '',
    hours: '',
    volunteers: '',
    students: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    fetchVolunteeringData();
  }, []);

  const fetchVolunteeringData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(API_CONFIG.ENDPOINTS.COMPANY_VOLUNTEERING, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch volunteering data');
      }

      const data = await response.json();
      setVolunteeringData(data);
    } catch (err) {
      console.error('Error fetching volunteering data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(editingId 
        ? `${API_CONFIG.ENDPOINTS.COMPANY_VOLUNTEERING}/${editingId}` 
        : API_CONFIG.ENDPOINTS.COMPANY_VOLUNTEERING, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchVolunteeringData();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          companyName: '',
          date: '',
          hours: '',
          volunteers: '',
          students: '',
          location: '',
          description: ''
        });
      } else {
        alert('Error saving data');
      }
    } catch (err) {
      console.error('Error submitting data:', err);
      alert('Error saving data');
    }
  };

  const handleEdit = (record) => {
    setFormData({
      companyName: record.companyName,
      date: record.date,
      hours: record.hours,
      volunteers: record.volunteers,
      students: record.students || '',
      location: record.location,
      description: record.description
    });
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const token = localStorage.getItem('adminToken');
      
      try {
        const response = await fetch(`${API_CONFIG.ENDPOINTS.COMPANY_VOLUNTEERING}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchVolunteeringData();
        } else {
          alert('Error deleting record');
        }
      } catch (err) {
        console.error('Error deleting record:', err);
        alert('Error deleting record');
      }
    }
  };

  const calculateTotalHours = () => {
    return volunteeringData.reduce((total, record) => {
      return total + (parseFloat(record.hours) || 0);
    }, 0);
  };

  const calculateTotalHoursPerCompany = () => {
    const companyHours = {};
    volunteeringData.forEach(record => {
      const company = record.companyName;
      const hours = parseFloat(record.hours) || 0;
      if (companyHours[company]) {
        companyHours[company].push(hours);
        companyHours[company + '_total'] += hours;
      } else {
        companyHours[company] = [hours];
        companyHours[company + '_total'] = hours;
      }
    });
    return companyHours;
  };

  const getCompanyHoursBreakdown = () => {
    const companyHours = calculateTotalHoursPerCompany();
    const breakdown = [];
    for (const company in companyHours) {
      if (!company.endsWith('_total')) {
        const totalHours = companyHours[company + '_total'];
        const hoursList = companyHours[company];
        breakdown.push({
          company,
          hours: hoursList,
          total: totalHours
        });
      }
    }
    return breakdown;
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Company Volunteering Report', 20, 20);
    
    // Add generation date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    
    // Add company hours breakdown section
    const companyBreakdown = getCompanyHoursBreakdown();
    if (companyBreakdown.length > 0) {
      let yPosition = 40;
      doc.setFontSize(14);
      doc.text('Company Hours Breakdown', 20, yPosition);
      yPosition += 10;
      
      companyBreakdown.forEach(item => {
        doc.setFontSize(12);
        doc.text(`${item.company}: ${item.hours.join(' + ')} = ${item.total} hours`, 20, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Add total hours
      doc.setFontSize(12);
      doc.text(`Overall Total Hours: ${calculateTotalHours()} hours`, 20, yPosition);
      yPosition += 15;
    }
    
    // Add main table
    if (volunteeringData.length > 0) {
      doc.setFontSize(14);
      doc.text('Detailed Records', 20, yPosition);
      yPosition += 10;
      
      // AutoTable for detailed records
      doc.autoTable({
        startY: yPosition,
        head: [['Company', 'Date', 'Hours', 'Volunteers', 'Location', 'Description']],
        body: volunteeringData.map(record => [
          record.companyName,
          new Date(record.date).toLocaleDateString(),
          `${record.hours} hrs`,
          record.volunteers,
          record.location,
          record.description.substring(0, 50) + (record.description.length > 50 ? '...' : '')
        ]),
        styles: {
          fontSize: 10,
        },
        headStyles: {
          fillColor: [29, 78, 216], // blue-600
        },
      });
    }
    
    // Save the PDF
    doc.save('company_volunteering_report.pdf');
  };

  const downloadCompanyReport = (companyName) => {
    try {
      const companyRecords = volunteeringData.filter(record => record.companyName === companyName);
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text(`${companyName} Volunteering Report`, 20, 20);
      
      // Add generation date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
      
      // Add company hours breakdown
      const companyTotalHours = companyRecords.reduce((total, record) => total + (parseFloat(record.hours) || 0), 0);
      const totalStudents = companyRecords.reduce((total, record) => total + (parseInt(record.students) || 0), 0);
      const totalVolunteers = companyRecords.reduce((total, record) => total + (parseInt(record.volunteers) || 0), 0);
      
      let yPosition = 40;
      doc.setFontSize(12);
      doc.text(`Total Hours: ${companyTotalHours}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Total Students: ${totalStudents}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Total Volunteers: ${totalVolunteers}`, 20, yPosition);
      yPosition += 12;
      
      // Add main table
      if (companyRecords.length > 0) {
        doc.setFontSize(14);
        doc.text('Detailed Records', 20, yPosition);
        yPosition += 10;
        
        // AutoTable for detailed records - include ALL data
        doc.autoTable({
          startY: yPosition,
          head: [['Date', 'Hours', 'Volunteers', 'Students', 'Location', 'Description']],
          body: companyRecords.map(record => [
            new Date(record.date).toLocaleDateString(),
            `${record.hours} hrs`,
            record.volunteers,
            record.students || 0,
            record.location,
            record.description || 'N/A'
          ]),
          styles: {
            fontSize: 10,
          },
          headStyles: {
            fillColor: [29, 78, 216], // blue-600
          },
          margin: { left: 20, right: 20 },
        });
      }
      
      // Save the PDF
      doc.save(`${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_volunteering_report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading volunteering data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Volunteering Records</h1>
          <p className="text-gray-600">
            Overall Total Hours: <span className="font-bold text-blue-600">{calculateTotalHours()} hours</span> | 
            Total Records: {volunteeringData.length}
          </p>
          
          {/* Company Hours Breakdown */}
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Company Hours Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {getCompanyHoursBreakdown().map((item, index) => {
                // Calculate total students and volunteers for this company
                const companyRecords = volunteeringData.filter(record => record.companyName === item.company);
                const totalStudents = companyRecords.reduce((sum, record) => sum + (parseInt(record.students) || 0), 0);
                const totalVolunteers = companyRecords.reduce((sum, record) => sum + (parseInt(record.volunteers) || 0), 0);
                
                return (
                  <div key={index} className="bg-white p-3 rounded border border-blue-100">
                    <div className="text-sm font-medium text-gray-900">{item.company}</div>
                    <div className="text-xs text-gray-600">{item.hours.join(' + ')} = <span className="font-bold text-blue-600">{item.total} hours</span></div>
                    <div className="text-xs text-gray-500">{totalVolunteers} volunteers, {totalStudents} students</div>
                    <button 
                      onClick={() => downloadCompanyReport(item.company)}
                      className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      title={`Download full report for ${item.company}`}
                    >
                      📥 Download
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => {
              setFormData({
                companyName: '',
                date: '',
                hours: '',
                volunteers: '',
                location: '',
                description: ''
              });
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add New Record
          </button>
          
          <button
            onClick={downloadReport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Download Report
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingId ? 'Edit Record' : 'Add New Record'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hours</label>
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.5"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Volunteers</label>
                  <input
                    type="number"
                    name="volunteers"
                    value={formData.volunteers}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Students</label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleInputChange}
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  ></textarea>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {editingId ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Company Volunteering Records</h3>
              <p className="mt-1 text-sm text-gray-500">Track and manage all company volunteering activities</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volunteers
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteeringData.length > 0 ? (
                  volunteeringData.map((record, index) => (
                    <tr key={record.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.companyName}</div>
                        <div className="text-sm text-gray-500">ID: {record.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-bold">{record.hours} hrs</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.volunteers}</div>
                        <div className="text-xs text-gray-500">participants</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.students || 0}</div>
                        <div className="text-xs text-gray-500">students</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{record.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={record.description}>{record.description}</div>
                        <div className="mt-1 text-xs text-gray-500">{record.description.length > 50 ? '...' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No volunteering records</h3>
                        <p className="text-gray-500">Get started by adding a new company volunteering record.</p>
                      </div>
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

export default CompanyVolunteering;