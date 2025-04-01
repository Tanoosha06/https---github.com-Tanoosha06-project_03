import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StudentProfile from './components/StudentProfile';
import FeeManagement from './components/FeeManagement';
import Attendance from './components/Attendance';
import Complaints from './components/Complaints';
import Notices from './components/Notices';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Check for existing session on load
  useEffect(() => {
    // In a real app, you would check for a valid token in localStorage or cookies
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole');
    const savedUserData = localStorage.getItem('userData');
    
    if (savedAuth === 'true' && savedRole) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    }
  }, []);
  
  // Save authentication state when it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', userRole);
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    }
  }, [isAuthenticated, userRole, userData]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserData(null);
    setActiveTab('profile');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <StudentProfile student={userData} />;
      case 'fee':
        return <FeeManagement />;
      case 'attendance':
        return <Attendance />;
      case 'complaints':
        return <Complaints />;
      case 'notices':
        return <Notices />;
      default:
        return <StudentProfile student={userData} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <Login 
        setIsAuthenticated={setIsAuthenticated} 
        setUserRole={setUserRole} 
        setUserData={setUserData} 
      />
    );
  }

  // Define which tabs are available based on user role
  let availableTabs = [];
  
  if (userRole === 'student') {
    availableTabs = ['profile', 'fee', 'attendance', 'complaints', 'notices'];
  } else if (userRole === 'admin') {
    availableTabs = ['students', 'fees', 'rooms', 'complaints', 'notices'];
  } else if (userRole === 'caretaker') {
    availableTabs = ['attendance', 'rooms', 'complaints', 'notices'];
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={userRole}
        availableTabs={availableTabs}
        onLogout={handleLogout}
        userName={userData?.name}
      />
      <div className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;