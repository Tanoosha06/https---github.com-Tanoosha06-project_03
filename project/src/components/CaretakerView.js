import React, { useEffect, useState } from "react";
import axios from "axios";
const CaretakerView = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');

  // Sample data - in a real app, this would come from an API
  const caretakerProfile = {
    name: 'asmin',
    employeeId: 'CT-2023-001',
    phone: '+91 9876543210',
    email: 'asmin.doe@hostel.edu',
    shiftTimings: '2:00 pM - 8:00 PM',
  };

  const students = [
    { id: '2023001', name: 'Amit Kumar', roomNumber: 'A-101', contact: '9876543211', hostelName: 'Boys Hostel A' },
    { id: '2023002', name: 'Priya Singh', roomNumber: 'B-203', contact: '9876543212', hostelName: 'Girls Hostel B' },
    { id: '2023003', name: 'Rahul Sharma', roomNumber: 'A-105', contact: '9876543213', hostelName: 'Boys Hostel A' },
    { id: '2023004', name: 'Neha Patel', roomNumber: 'B-210', contact: '9876543214', hostelName: 'Girls Hostel B' },
  ];

  const leaveApplications = [
    { id: 'LA001', studentId: '2023001', studentName: 'Amit Kumar', fromDate: '2025-04-05', toDate: '2025-04-10', reason: 'Family function', status: 'Pending' },
    { id: 'LA002', studentId: '2023002', studentName: 'Priya Singh', fromDate: '2025-04-02', toDate: '2025-04-04', reason: 'Medical appointment', status: 'Approved' },
    { id: 'LA003', studentId: '2023003', studentName: 'Rahul Sharma', fromDate: '2025-04-15', toDate: '2025-04-20', reason: 'Home visit', status: 'Pending' },
  ];

  const rooms = [
    { id: 'A-101', hostel: 'Boys Hostel A', capacity: 2, occupied: 1, students: ['Amit Kumar'] },
    { id: 'A-102', hostel: 'Boys Hostel A', capacity: 2, occupied: 2, students: ['Rajesh Kumar', 'Sanjay Gupta'] },
    { id: 'A-105', hostel: 'Boys Hostel A', capacity: 2, occupied: 1, students: ['Rahul Sharma'] },
    { id: 'B-203', hostel: 'Girls Hostel B', capacity: 2, occupied: 1, students: ['Priya Singh'] },
    { id: 'B-210', hostel: 'Girls Hostel B', capacity: 2, occupied: 1, students: ['Neha Patel'] },
  ];

  const maintenanceRequests = [
    { id: 'MR001', roomNumber: 'A-101', issue: 'Leaking tap', status: 'Pending', raisedBy: 'Amit Kumar', date: '2025-03-28' },
    { id: 'MR002', roomNumber: 'B-203', issue: 'Faulty electrical socket', status: 'In Progress', raisedBy: 'Priya Singh', date: '2025-03-27' },
    { id: 'MR003', roomNumber: 'A-102', issue: 'Window not closing properly', status: 'Resolved', raisedBy: 'Rajesh Kumar', date: '2025-03-25' },
  ];

  const complaints = [
    { id: 'CM001', studentName: 'Amit Kumar', studentId: '2023001', complaint: 'Noisy neighbors after 11 PM', status: 'Pending', date: '2025-03-29' },
    { id: 'CM002', studentName: 'Priya Singh', studentId: '2023002', complaint: 'Mess food quality has decreased', status: 'In Progress', date: '2025-03-28' },
    { id: 'CM003', studentName: 'Rahul Sharma', studentId: '2023003', complaint: 'Common area cleaning not done properly', status: 'Resolved', date: '2025-03-26' },
  ];

  const attendance = [
    { date: '2025-03-30', present: ['2023001', '2023002', '2023003', '2023004'], absent: [] },
    { date: '2025-03-29', present: ['2023001', '2023003', '2023004'], absent: ['2023002'] },
    { date: '2025-03-28', present: ['2023001', '2023002', '2023004'], absent: ['2023003'] },
  ];

  // Handler functions
  const handleLeaveStatus = (id, newStatus) => {
    alert(`Leave application ${id} marked as ${newStatus}`);
    // In a real app, you would update the state and send the update to the backend
  };

  const handleMaintenanceStatus = (id, newStatus) => {
    alert(`Maintenance request ${id} status updated to ${newStatus}`);
    // In a real app, you would update the state and send the update to the backend
  };

  const handleComplaintStatus = (id, newStatus) => {
    alert(`Complaint ${id} status updated to ${newStatus}`);
    // In a real app, you would update the state and send the update to the backend
  };

  const handleRoomAvailability = (id, isAvailable) => {
    alert(`Room ${id} availability updated to ${isAvailable ? 'Available' : 'Unavailable'}`);
    // In a real app, you would update the state and send the update to the backend
  };

  const markAttendance = (date, studentId, isPresent) => {
    alert(`Student ${studentId} marked as ${isPresent ? 'present' : 'absent'} for ${date}`);
    // In a real app, you would update the state and send the update to the backend
  };

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Caretaker Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{caretakerProfile.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Employee ID</span>
                <span className="font-medium">{caretakerProfile.employeeId}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{caretakerProfile.phone}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{caretakerProfile.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Shift Timings</span>
                <span className="font-medium">{caretakerProfile.shiftTimings}</span>
              </div>
            </div>
          </div>
        );
      
      case 'students':
        return (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold p-4 border-b">Student Management</h2>
            
            <div className="px-4 py-2">
              <h3 className="text-lg font-medium mb-2">Student Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.hostelName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-4 py-2 mt-4">
              <h3 className="text-lg font-medium mb-2">Leave Applications</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaveApplications.map((leave) => (
                      <tr key={leave.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{leave.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{leave.studentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{leave.fromDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{leave.toDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{leave.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {leave.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {leave.status === 'Pending' && (
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleLeaveStatus(leave.id, 'Approved')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleLeaveStatus(leave.id, 'Rejected')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-4 py-2 mt-4 mb-4">
              <h3 className="text-lg font-medium mb-2">Attendance Tracking</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      {students.map(student => (
                        <th key={student.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {student.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendance.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                        {students.map(student => (
                          <td key={student.id} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={record.present.includes(student.id)} 
                                onChange={(e) => markAttendance(record.date, student.id, e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2">
                                {record.present.includes(student.id) ? 'Present' : 'Absent'}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'rooms':
        return (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold p-4 border-b">Room & Maintenance Management</h2>
            
            <div className="px-4 py-2">
              <h3 className="text-lg font-medium mb-2">Room Assignments</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{room.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.hostel}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.occupied}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.students.join(', ')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={room.occupied < room.capacity ? 'available' : 'unavailable'}
                            onChange={(e) => handleRoomAvailability(room.id, e.target.value === 'available')}
                          >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-4 py-2 mt-4 mb-4">
              <h3 className="text-lg font-medium mb-2">Maintenance Requests</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raised By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {maintenanceRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.issue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.raisedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${request.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                              request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select 
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={request.status}
                            onChange={(e) => handleMaintenanceStatus(request.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'complaints':
        return (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold p-4 border-b">Complaint Handling</h2>
            
            <div className="px-4 py-2 mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{complaint.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{complaint.studentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{complaint.studentId}</td>
                        <td className="px-6 py-4">{complaint.complaint}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{complaint.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                              complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select 
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={complaint.status}
                            onChange={(e) => handleComplaintStatus(complaint.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hostel Management System</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">{caretakerProfile.name}</span>
            <button className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-50">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar / Navigation */}
          <nav className="w-full md:w-64 bg-white shadow rounded-lg p-4 h-min">
            <ul>
              <li className="mb-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Caretaker Profile
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => setActiveTab('students')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'students'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student Management
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => setActiveTab('rooms')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'rooms'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Room & Maintenance
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => setActiveTab('complaints')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'complaints'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Complaint Handling
                </button>
              </li>
            </ul>
          </nav>

          {/* Main content area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
  // Within the CaretakerView component
 useEffect(() => {
     // Example of fetching data when component mounts
     const fetchCaretakerData = async () => {
       try {
         const profileRes = await axios.get('/api/caretaker/profile');
         const studentsRes = await axios.get('/api/caretaker/students');
         const leaveRes = await axios.get('/api/caretaker/leave-applications');
         const roomsRes = await axios.get('/api/caretaker/rooms');
         const maintenanceRes = await axios.get('/api/caretaker/maintenance');
         const complaintsRes = await axios.get('/api/caretaker/complaints');
         const attendanceRes = await axios.get('/api/caretaker/attendance');
        
        // Update your state with the fetched data
        // ...
       } catch (error) {
         console.error('Error fetching caretaker data:', error);
        // Handle errors
       }
     };
  
     fetchCaretakerData();
    }, []);
    function CaretakerView({ userData, handleLogout }) {
        const [activeSection, setActiveSection] = useState('profile');
        
        // Place all useEffect hooks at the top level, not inside conditionals
        useEffect(() => {
          // Any initialization logic for the caretaker view
          document.title = "Caretaker Portal";
          
          // Cleanup function
          return () => {
            document.title = "Hostel Management";
          };
        }, []);
      
        const renderContent = () => {
          switch (activeSection) {
            case 'profile':
              return <div><h2 className="text-xl font-bold mb-4">Profile</h2>
                     {/* Profile content here */}</div>;
            case 'rooms':
              return <div><h2 className="text-xl font-bold mb-4">Rooms Management</h2>
                     {/* Rooms content here */}</div>;
            case 'complaints':
              return <div><h2 className="text-xl font-bold mb-4">Complaints</h2>
                     {/* Complaints content here */}</div>;
            case 'notices':
              return <div><h2 className="text-xl font-bold mb-4">Notices</h2>
                     {/* Notices content here */}</div>;
            default:
              return <div><h2 className="text-xl font-bold mb-4">Profile</h2>
                     {/* Default content here */}</div>;
          }
        };
      
        return (
          <div className="flex h-screen bg-gray-100">
            {/* Caretaker sidebar or navigation */}
            <div className="w-64 bg-white shadow-md p-4">
              <div className="mb-8">
                <h2 className="text-xl font-bold">Hostel Management</h2>
                <p className="text-gray-600">Caretaker Portal</p>
              </div>
              
              <div className="mb-4">
                <p className="font-medium">{userData?.name || 'Caretaker'}</p>
                <p className="text-sm text-gray-600">Role: Caretaker</p>
              </div>
              
              <nav className="mb-8">
                {/* Navigation links for caretaker */}
                <button 
                  className={`block w-full text-left py-2 px-4 hover:bg-gray-100 rounded ${activeSection === 'profile' ? 'bg-gray-100 font-medium' : ''}`}
                  onClick={() => setActiveSection('profile')}
                >
                  Profile
                </button>
                <button 
                  className={`block w-full text-left py-2 px-4 hover:bg-gray-100 rounded ${activeSection === 'rooms' ? 'bg-gray-100 font-medium' : ''}`}
                  onClick={() => setActiveSection('rooms')}
                >
                  Rooms
                </button>
                <button 
                  className={`block w-full text-left py-2 px-4 hover:bg-gray-100 rounded ${activeSection === 'complaints' ? 'bg-gray-100 font-medium' : ''}`}
                  onClick={() => setActiveSection('complaints')}
                >
                  Complaints
                </button>
                <button 
                  className={`block w-full text-left py-2 px-4 hover:bg-gray-100 rounded ${activeSection === 'notices' ? 'bg-gray-100 font-medium' : ''}`}
                  onClick={() => setActiveSection('notices')}
                >
                  Notices
                </button>
              </nav>
              
              {/* Logout button */}
              <button 
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
            
            {/* Main content area */}
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-6">Caretaker Dashboard</h1>
              {renderContent()}
            </div>
          </div>
        );
      }
    }
export default CaretakerView;
  