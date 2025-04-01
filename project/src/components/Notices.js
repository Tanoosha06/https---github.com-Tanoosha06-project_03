import React, { useState, useEffect } from 'react';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch notices data
    setTimeout(() => {
      setNotices([
        {
          id: 1,
          title: 'Hostel Maintenance Schedule',
          content: 'There will be maintenance work carried out in K2 from March 15 to March 20. Please ensure your rooms are accessible during this period.',
          date: '2025-03-10',
          category: 'Maintenance',
          isImportant: true
        },
        {
          id: 2,
          title: 'Fee Payment Reminder',
          content: 'All students are reminded to pay their hostel fees for the next semester by April 15, 2025. Late payments will incur additional charges.',
          date: '2025-03-15',
          category: 'Fees',
          isImportant: true
        },
        {
          id: 3,
          title: 'Wi-Fi Network Upgrade',
          content: 'The hostel Wi-Fi network will be upgraded on March 25, 2025. There may be intermittent connectivity issues between 10 AM and 2 PM.',
          date: '2025-03-20',
          category: 'Facilities',
          isImportant: false
        },
        {
          id: 4,
          title: "Womens's Day Celebration",
          content: "Annual Women's day will be celebrated on March 08, 2025. All students are encouraged to participate in the cultural events and competitions.",
          date: '2025-03-25',
          category: 'Events',
          isImportant: false
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notices</h2>
      
      <div className="space-y-6">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className={`p-4 rounded-lg border-l-4 ${
              notice.isImportant 
                ? 'border-red-500 bg-red-50' 
                : 'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">
                {notice.isImportant && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs mr-2">
                    Important
                  </span>
                )}
                {notice.title}
              </h3>
              <span className="text-sm text-gray-500">{notice.date}</span>
            </div>
            
            <div className="mt-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
                {notice.category}
              </span>
            </div>
            
            <p className="mt-3 text-gray-600">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;