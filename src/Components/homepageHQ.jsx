import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomepageHQ = () => {
  const navigate = useNavigate();
  
  /**
   *this handles user logout
   */
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#F8F7F6] p-4">
      {/* 
        this is for the Sidebar navigation
      */}
      <aside className="w-64 h-[98%] bg-[#614B3B] rounded-2xl shadow-lg m-2">
        <div className="p-6 h-full flex flex-col">
          {/* title section */}
          <div className="mb-8">
            <h1 className="text-white text-lg font-bold">Quote System</h1>
          </div>

          {/* 
            navigation menu which has all main functions available to headquarters.
            Each button will take the user to a different workspace
          */}
          <nav className="space-y-2 flex-1">
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Review Quotes
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Edit Quote
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Apply Discount
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Sanction Quote
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Process Orders
            </button>
            <button className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 transition-colors">
              Commission Records
            </button>
          </nav>

          {/* logout button */}
          <button
            onClick={handleLogout}
            className="w-full text-left text-white px-4 py-3 hover:bg-[#725A49] rounded-xl flex items-center gap-3 mt-auto transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* 
        this is for the main area
      */}
      <main className="flex-1 rounded-2xl bg-white ml-4 shadow-lg overflow-hidden">
        {/* 
          header
        */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Headquarters Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg border border-gray-200"
            />
            <User className="w-8 h-8 text-gray-600" />
          </div>
        </header>

        {/* 
          dashboard content
        */}
        <div className="p-6 space-y-6 bg-[#F8F7F6]">
          {/* 
            stats bubbles
          */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#8B6F5C] text-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-sm opacity-90 mb-1 text-center">Pending Quotes</h3>
              <p className="text-2xl font-bold text-center">-</p>
            </div>
            <div className="bg-[#B4A194] text-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-sm opacity-90 mb-1 text-center">Processed Orders</h3>
              <p className="text-2xl font-bold text-center">-</p>
            </div>
            <div className="bg-[#9D8475] text-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-sm opacity-90 mb-1 text-center">Total Sales</h3>
              <p className="text-2xl font-bold text-center">-</p>
            </div>
          </div>

          {/* 
            workspace area which changes based on selected sidebar option
          */}
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px] flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-[#614B3B]">Workspace</h1>
            <div className="flex items-center justify-center flex-1 text-gray-500 text-lg">
              Select an activity from the sidebar to begin
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageHQ;