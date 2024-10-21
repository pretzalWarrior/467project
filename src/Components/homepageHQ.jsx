import React, { useState } from 'react';
import { Search, FileText, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
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

const HomepageHQ = () => {
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Logout handler function
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    
    // Navigate to login page
    navigate('/login');
  };
  
  // Mock data for the activity chart
  const quoteData = [
    { month: 'Jan', quotes: 32, approved: 28 },
    { month: 'Feb', quotes: 40, approved: 35 },
    { month: 'Mar', quotes: 35, approved: 30 },
    { month: 'Apr', quotes: 45, approved: 40 },
    { month: 'May', quotes: 38, approved: 34 },
    { month: 'Jun', quotes: 42, approved: 38 }
  ];

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
            Review Quotes
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            Process Orders
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            Apply Discounts
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#8B6F5C] transition-colors">
            View Analytics
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
          <h2 className="text-2xl font-bold text-[#614B3B]">Headquarters Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search quotes..."
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Review</h3>
            <p className="text-2xl font-bold text-[#614B3B]">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Orders to Process</h3>
            <p className="text-2xl font-bold text-[#614B3B]">8</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Approved Today</h3>
            <p className="text-2xl font-bold text-[#614B3B]">15</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Processing Time</h3>
            <p className="text-2xl font-bold text-[#614B3B]">2.4h</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Quotes Pending Review */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[#614B3B] mb-4">Quotes Pending Review</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} 
                  className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                  onClick={() => setSelectedQuote(item)}
                >
                  <div>
                    <p className="font-medium text-[#614B3B]">Quote #{12345 + item}</p>
                    <p className="text-sm text-gray-500">Sales Associate: John Doe</p>
                    <p className="text-sm text-gray-500">Customer: Acme Corp</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#614B3B]">${(5200 + item * 1000).toLocaleString()}</p>
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Pending Review
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Trends Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[#614B3B] mb-4">Quote Approval Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quoteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="quotes" 
                    stroke="#614B3B" 
                    name="Total Quotes"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved" 
                    stroke="#8B6F5C" 
                    name="Approved"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
            <h3 className="text-lg font-semibold text-[#614B3B] mb-4">Recent Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-green-900">Quote #12348 Approved</p>
                  <p className="text-sm text-green-700">Processed by Sarah - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <DollarSign className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-blue-900">10% Discount Applied to Quote #12347</p>
                  <p className="text-sm text-blue-700">Applied by Mike - 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600" size={20} />
                <div>
                  <p className="font-medium text-yellow-900">Quote #12346 Flagged for Review</p>
                  <p className="text-sm text-yellow-700">Flagged by System - 4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHQ;