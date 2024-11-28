import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import pages components
import ReviewQuotesPage from './Pages/HQstaff/ReviewQuotesPage';
import ProcessOrdersPage from './Pages/HQstaff/ProcessOrdersPage';

const HomepageHQ = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(null);
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  const renderWorkspace = () => {
    switch(currentPage) {
      case 'reviewQuotes':
        return <ReviewQuotesPage />;
      case 'processOrders':
        return <ProcessOrdersPage />;
      default:
        return (
          <div className="flex items-center justify-center flex-1 text-gray-500 text-lg">
            Select an activity from the sidebar to begin
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F7F6] p-4">
      {/* Sidebar navigation */}
      <aside className="w-64 h-[98%] bg-[#614B3B] rounded-2xl shadow-lg m-2">
        <div className="p-6 h-full flex flex-col">
          {/* title section */}
          <div className="mb-8">
            <h1 className="text-white text-lg font-bold">Quote System</h1>
          </div>

          {/* navigation menu */}
          <nav className="space-y-2 flex-1">
            <button 
              onClick={() => setCurrentPage('reviewQuotes')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'reviewQuotes' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Review Quotes
            </button>
            <button 
              onClick={() => setCurrentPage('processOrders')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'processOrders' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Process Orders
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

      {/* main area */}
      <main className="flex-1 rounded-2xl bg-white ml-4 shadow-lg overflow-hidden">
        {/* header */}
        <header className="bg-white border-b p-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-[#614B3B]">Headquarters Dashboard</h1>
        </header>

        {/* dashboard content */}
        <div className="p-6 space-y-6 bg-[#F8F7F6] h-[calc(100%-4rem)] overflow-y-auto">
          {/* stats bubbles - always visible */}
          <div className="flex justify-center gap-8">
            <div className="bg-[#8B6F5C] text-white px-6 py-4 rounded-xl shadow-sm flex flex-col items-center justify-center whitespace-nowrap">
              <h3 className="text-sm opacity-90 mb-1">Quotes to Review</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-[#B4A194] text-white px-6 py-4 rounded-xl shadow-sm flex flex-col items-center justify-center whitespace-nowrap">
              <h3 className="text-sm opacity-90 mb-1">Ready to Place Order</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>

          {/* workspace area */}
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px] flex flex-col">
            {renderWorkspace()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageHQ;