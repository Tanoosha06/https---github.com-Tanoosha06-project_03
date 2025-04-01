import React, { useState, useEffect } from 'react';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch student data
    setTimeout(() => {
      setStudent({
        id: "N201048",
        name: "Allu Tanoosha",
        email: "tanu@gmail.com",
        phone: "9963537668",
        department: "Computer Science",
        year: "E3",
        roomNumber: "FF-50",
        blockName: "k2",
        hostleName: "Girls Hostel",
        profilePicture: "my_photo.jpg"
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Profile</h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
          <img 
            src={student.profilePicture} 
            alt="Student" 
            className="rounded-full h-40 w-40 object-cover border-4 border-blue-100"
          />
          <h3 className="text-xl font-semibold mt-4">{student.name}</h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2">
            {student.id}
          </span>
        </div>
        
        <div className="md:w-2/3 md:pl-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
              <p className="text-gray-800">{student.email}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
              <p className="text-gray-800">{student.phone}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Department</h4>
              <p className="text-gray-800">{student.department}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Year</h4>
              <p className="text-gray-800">{student.year}</p>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3">Hostel Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Room Number</h4>
                <p className="text-gray-800">{student.roomNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Block</h4>
                <p className="text-gray-800">{student.blockName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Hostel</h4>
                <p className="text-gray-800">{student.hostleName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;