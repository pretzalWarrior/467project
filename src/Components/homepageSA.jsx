import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import pages components
import SalesQuotePage from './Pages/SalesQuotePage';
import EditQuotePage from './Pages/EditQuotePage';
import ViewQuotesPage from './Pages/ViewQuotesPage';
import CommissionPage from './Pages/CommissionPage';

const HomepageSA = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'enterQuote':
        return <SalesQuotePage />;
      case 'editQuote':
        return <EditQuotePage />;
      case 'viewQuotes':
        return <ViewQuotesPage />;
      case 'commission':
        return <CommissionPage />;
      case 'dashboard':
      default:
        return (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-3xl font-bold mb-8 text-[#614B3B]">Welcome Back!</h1>
            <div className="text-gray-500 text-lg">
              Select an activity from the sidebar to begin
            </div>
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
              onClick={() => setCurrentPage('enterQuote')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'enterQuote' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Enter Sales Quote
            </button>
            <button 
              onClick={() => setCurrentPage('editQuote')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'editQuote' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Edit Quote
            </button>
            <button 
              onClick={() => setCurrentPage('viewQuotes')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'viewQuotes' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              View All Quotes
            </button>
            <button 
              onClick={() => setCurrentPage('commission')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'commission' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              My Commission
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
      <main className="flex-1 flex flex-col rounded-2xl bg-white ml-4 shadow-lg overflow-hidden">
        {/* header */}
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

        {/* dashboard content */}
        <div className="flex-1 flex flex-col min-h-0 p-6 space-y-6 bg-[#F8F7F6]">
          {/* stats bubble */}
          <div className="flex justify-center">
            <div className="bg-[#9D8475] text-white rounded-xl shadow-sm inline-flex flex-col items-center justify-center px-8 py-4">
              <h3 className="text-sm opacity-90 mb-1">Total Commission</h3>
              <p className="text-2xl font-bold">$1,234.56</p>
            </div>
          </div>

          {/* workspace area */}
          <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl shadow-sm">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageSA;