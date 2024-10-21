import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomepageSA = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#F8F7F6] p-4">
      {/* Floating Sidebar */}
      <aside className="w-64 h-[98%] bg-[#614B3B] rounded-2xl shadow-lg m-2">
        <div className="p-6 h-full flex flex-col">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-white rounded-full" />
            <h2 className="text-white text-lg font-semibold">Quote System</h2>
          </div>

          {/* Navigation Buttons */}
          <nav className="space-y-2 flex-1">
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Enter Sales Quote
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Edit Quote
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Review Quote Email
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              View All Quotes
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              My Commission
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              My Profile
            </button>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 mt-auto transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 rounded-2xl bg-white ml-4 shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Sales Associate Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg border border-gray-200"
            />
            <User className="w-8 h-8 text-gray-600" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6 bg-[#F8F7F6]">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#8B6F5C] text-white p-4 rounded-xl shadow-sm">
              <h3 className="text-sm opacity-90 mb-1">Active Quotes</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-[#B4A194] p-4 rounded-xl shadow-sm">
              <h3 className="text-sm opacity-90 mb-1">Monthly Sales</h3>
              <p className="text-2xl font-bold">$12,450</p>
            </div>
            <div className="bg-[#9D8475] p-4 rounded-xl shadow-sm">
              <h3 className="text-sm opacity-90 mb-1">Commission</h3>
              <p className="text-2xl font-bold">$1,245</p>
            </div>
            <div className="bg-[#B4A194] p-4 rounded-xl shadow-sm">
              <h3 className="text-sm opacity-90 mb-1">Success Rate</h3>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Quotes</h2>
              <div className="space-y-3">
                <div className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Quote #12345</span>
                    <span className="text-[#8B6F5C]">$1,200</span>
                  </div>
                  <p className="text-gray-600 text-sm">Customer: John Doe</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Monthly Activity</h2>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Activity chart will be displayed here
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageSA;