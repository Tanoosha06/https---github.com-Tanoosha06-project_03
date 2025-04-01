import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const Login = ({ setIsAuthenticated, setUserRole, setUserData }) => {
  const [activeTab, setActiveTab] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    // For demo purposes, we'll use mock credentials
    const mockCredentials = {
      student: { email: 'student@example.com', password: 'studentpass' },
      admin: { email: 'admin@example.com', password: 'adminpass' },
      caretaker: { email: 'caretaker@example.com', password: 'caretakerpass' }
    };

    if (
      loginData.email === mockCredentials[activeTab].email &&
      loginData.password === mockCredentials[activeTab].password
    ) {
      // Set mock user data based on role
      let userData = {};
      
      if (activeTab === 'student') {
        userData = {
          id: "N201048",
          name: "Allu Tanoosha",
          email: "student@example.com",
          phone: "+1 234 567 8901",
          department: "Computer Science",
          year: "3rd Year",
          roomNumber: "B-204",
          blockName: "North Block",
          hostleName: "girls Hostel",
          profilePicture: "/api/placeholder/150/150"
        };
      } else if (activeTab === 'admin') {
        userData = {
          id: "ADM2024001",
          name: "Admin User",
          email: "admin@example.com",
        };
      } else {
        userData = {
          id: "CAR2024001",
          name: "Caretaker User",
          email: "caretaker@example.com",
          blockAssigned: "North Block"
        };
      }

      setUserData(userData);
      setUserRole(activeTab);
      setIsAuthenticated(true);
    } else {
      setError('Invalid email or password');
    }
  };

  if (showSignUp) {
    return <SignUp setShowSignUp={setShowSignUp} activeTab={activeTab} />;
  }

  if (showForgotPassword) {
    return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">Hostel Management System</h1>
          <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
        </div>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'student'
                ? 'border-b-2 border-blue-500 text-blue-700 font-semibold'
                : 'text-gray-500 border-b border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('student')}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'admin'
                ? 'border-b-2 border-blue-500 text-blue-700 font-semibold'
                : 'text-gray-500 border-b border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('admin')}
          >
            Admin
          </button>
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'caretaker'
                ? 'border-b-2 border-blue-500 text-blue-700 font-semibold'
                : 'text-gray-500 border-b border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('caretaker')}
          >
            Caretaker
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-6 text-right">
            <button
              type="button"
              className="text-blue-600 text-sm hover:underline"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>

          {(activeTab === 'student' || activeTab === 'caretaker') && (
            <div className="mt-4 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          )}
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-600">
            Demo Credentials:
          </p>
          <div className="mt-2 text-center text-xs text-gray-500">
            <p>Student: student@example.com / studentpass</p>
            <p>Admin: admin@example.com / adminpass</p>
            <p>Caretaker: caretaker@example.com / caretakerpass</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;