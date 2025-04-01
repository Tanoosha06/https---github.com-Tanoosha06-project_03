import React from 'react';
import { 
  UserCircle, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  Bell,
  Users,
  Home,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userRole, availableTabs, onLogout, userName }) => {
  // Define menu items based on user role
  const allMenuItems = {
    profile: { id: 'profile', name: 'Student Profile', icon: <UserCircle size={20} /> },
    fee: { id: 'fee', name: 'Fee Management', icon: <CreditCard size={20} /> },
    attendance: { id: 'attendance', name: 'Attendance', icon: <Calendar size={20} /> },
    complaints: { id: 'complaints', name: 'Complaints', icon: <MessageSquare size={20} /> },
    notices: { id: 'notices', name: 'Notices', icon: <Bell size={20} /> },
    students: { id: 'students', name: 'Students', icon: <Users size={20} /> },
    fees: { id: 'fees', name: 'Fees Overview', icon: <CreditCard size={20} /> },
    rooms: { id: 'rooms', name: 'Room Management', icon: <Home size={20} /> }
  };

  // Filter menu items based on available tabs
  const menuItems = availableTabs.map(tabId => allMenuItems[tabId]);

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-800">RGUKT</h1>
        <p className="text-sm text-gray-600 mt-1">Logged in as {userRole}</p>
      </div>
      
      <div className="p-4 border-b bg-blue-50">
        <div className="flex items-center">
          <div className="rounded-full bg-blue-200 w-10 h-10 flex items-center justify-center text-blue-700 font-bold">
            {userName ? userName.charAt(0) : '?'}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800">{userName || 'User'}</p>
            <p className="text-xs text-gray-500">
              {userRole === 'student' ? 'Student' : userRole === 'admin' ? 'Administrator' : 'Caretaker'}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1 px-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-md ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-full px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;