import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [attendanceSummary, setAttendanceSummary] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    percentage: 0
  });

  useEffect(() => {
    // Mock API call to fetch attendance data
    setTimeout(() => {
      const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate();
      
      const mockData = [];
      let presentCount = 0;
      let absentCount = 0;
      let leaveCount = 0;
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
        if (date > new Date()) continue; // Skip future dates
        
        let status;
        const randomNum = Math.random();
        
        if (randomNum > 0.8) {
          status = 'absent';
          absentCount++;
        } else if (randomNum > 0.7) {
          status = 'leave';
          leaveCount++;
        } else {
          status = 'present';
          presentCount++;
        }
        
        mockData.push({
          date: date.toISOString().split('T')[0],
          status,
          checkedIn: status === 'present' ? '08:30 AM' : null,
          checkedOut: status === 'present' ? '09:30 PM' : null,
        });
      }
      
      const totalDays = presentCount + absentCount + leaveCount;
      const percentage = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;
      
      setAttendanceData(mockData);
      setAttendanceSummary({
        present: presentCount,
        absent: absentCount,
        leave: leaveCount,
        percentage
      });
      
      setLoading(false);
    }, 500);
  }, [currentMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setLoading(true);
  };

  const nextMonth = () => {
    const nextDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    if (nextDate <= new Date()) {
      setCurrentMonth(nextDate);
      setLoading(true);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <span className="bg-green-100 text-green-700 py-1 px-2 rounded text-xs">Present</span>;
      case 'absent':
        return <span className="bg-red-100 text-red-700 py-1 px-2 rounded text-xs">Absent</span>;
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Attendance Record</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Attendance Percentage</h3>
            <p className="text-2xl font-bold text-blue-800">{attendanceSummary.percentage}%</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Present Days</h3>
            <p className="text-2xl font-bold text-green-700">{attendanceSummary.present}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Absent Days</h3>
            <p className="text-2xl font-bold text-red-600">{attendanceSummary.absent}</p>
          </div>
          
          
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Calendar size={20} className="text-blue-800 mr-2" />
            <h3 className="text-lg font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={prevMonth}
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              &lt; Prev
            </button>
            <button 
              onClick={nextMonth}
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1) > new Date()
              }
            >
              Next &gt;
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Check In</th>
                <th className="py-3 px-6 text-left">Check Out</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {attendanceData.map((record) => (
                <tr key={record.date} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{record.date}</td>
                  <td className="py-3 px-6 text-left">{getStatusBadge(record.status)}</td>
                  <td className="py-3 px-6 text-left">{record.checkedIn || '-'}</td>
                  <td className="py-3 px-6 text-left">{record.checkedOut || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;