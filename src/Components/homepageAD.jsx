import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const HomepageAD = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    status: '',
    startDate: '',
    endDate: '',
    salesAssociate: '',
    customer: ''
  });

  // Mock data for the activity chart
  const activityData = [
    { month: 'Jan', quotes: 45 },
    { month: 'Feb', quotes: 52 },
    { month: 'Mar', quotes: 48 },
    { month: 'Apr', quotes: 61 },
    { month: 'May', quotes: 55 },
    { month: 'Jun', quotes: 67 }
  ];

  // Logout handler function
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7F6] to-[#E5E1DD] flex">
      {/* Floating Sidebar */}
      <div className="w-64 h-[96vh] bg-[#614B3B] m-4 rounded-2xl p-4 flex flex-col text-white">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <h1 className="text-xl font-semibold">Quote System</h1>
        </div>
        
        <nav className="flex-1">
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            Manage Associates
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            Review Quotes
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            System Settings
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#614B3B]">Administrator Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C] outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="w-10 h-10 bg-[#614B3B] rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Associates</h3>
            <p className="text-2xl font-bold text-[#614B3B]">24</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Monthly Quotes</h3>
            <p className="text-2xl font-bold text-[#614B3B]">156</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Commission</h3>
            <p className="text-2xl font-bold text-[#614B3B]">$67,500</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Success Rate</h3>
            <p className="text-2xl font-bold text-[#614B3B]">87%</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[#614B3B] mb-4">Recent Quotes</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium text-[#614B3B]">Quote #{12345 + item}</p>
                    <p className="text-sm text-gray-500">Customer: John Doe</p>
                  </div>
                  <p className="font-medium text-[#614B3B]">${(1200 + item * 100).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Activity Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[#614B3B] mb-4">Monthly Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="quotes" 
                    stroke="#614B3B" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageAD;