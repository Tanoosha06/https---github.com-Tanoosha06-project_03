import React, { useState, useEffect } from 'react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    hostelName: 'Boys Hostel' // Default value
  });

  useEffect(() => {
    // Mock API call to fetch complaints data
    setTimeout(() => {
      setComplaints([
        {
          id: 'COMP001',
          studentName: 'Uma',
          issueType: 'Maintenance',
          description: 'Water leakage in bathroom',
          hostelName: 'Girls Hostel',
          status: 'Resolved',
          createdAt: '2025-03-15',
          resolvedAt: '2025-03-18'
        },
        {
          id: 'COMP002',
          studentName: 'Thanusha',
          issueType: 'Electrical',
          description: 'Fan not working properly',
          hostelName: 'Girls Hostel',
          status: 'In Progress',
          createdAt: '2025-03-25',
          resolvedAt: null
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new complaint ID
    const newId = `COMP${String(complaints.length + 1).padStart(3, '0')}`;
    
    // Create new complaint object
    const newComplaint = {
      id: newId,
      studentName: 'Jaya', // Assuming logged in user
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      resolvedAt: null
    };
    
    // Add to complaints list
    setComplaints([newComplaint, ...complaints]);
    
    // Reset form data and hide form
    setFormData({
      issueType: '',
      description: '',
      hostelName: 'Boys Hostel'
    });
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="bg-green-100 text-green-700 py-1 px-2 rounded-full text-xs">Resolved</span>;
      case 'In Progress':
        return <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded-full text-xs">In Progress</span>;
      case 'Pending':
        return <span className="bg-yellow-100 text-yellow-700 py-1 px-2 rounded-full text-xs">Pending</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Complaints</h2>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {showForm ? 'Cancel' : 'Add New Complaint'}
          </button>
        </div>
        
        {showForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Submit New Complaint</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Type
                  </label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Issue Type</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Internet">Internet</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hostel Name
                  </label>
                  <select
                    name="hostelName"
                    value={formData.hostelName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Boys Hostel">Boys Hostel</option>
                    <option value="Girls Hostel">Girls Hostel</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please describe your issue in detail..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Issue ID</th>
                <th className="py-3 px-6 text-left">Issue Type</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Hostel Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left font-medium">{complaint.id}</td>
                  <td className="py-3 px-6 text-left">{complaint.issueType}</td>
                  <td className="py-3 px-6 text-left">{complaint.description}</td>
                  <td className="py-3 px-6 text-left">{complaint.hostelName}</td>
                  <td className="py-3 px-6 text-left">{complaint.createdAt}</td>
                  <td className="py-3 px-6 text-left">{getStatusBadge(complaint.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complaints;