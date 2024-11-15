import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import empty page components
import EditSalesAssociatePage from './Pages/EditSalesAssociatePage';
import ViewSalesAssociatesPage from './Pages/ViewSalesAssociatesPage';
import SearchQuotesPage from './Pages/SearchQuotesPage';

const HomepageAD = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  // Function to render the current page
  const renderPage = () => {
    switch(currentPage) {
      case 'editSalesAssociate':
        return <EditSalesAssociatePage />;
      case 'viewSalesAssociates':
        return <ViewSalesAssociatesPage />;
      case 'searchQuotes':
        return <SearchQuotesPage />;
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
              onClick={() => setCurrentPage('editSalesAssociate')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'editSalesAssociate' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Edit Sales Associate
            </button>
            <button 
              onClick={() => setCurrentPage('viewSalesAssociates')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'viewSalesAssociates' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              View Sales Associates
            </button>
            <button 
              onClick={() => setCurrentPage('searchQuotes')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'searchQuotes' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Search Quotes
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
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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
        <div className="p-6 space-y-6 bg-[#F8F7F6]">
          {/* stats bubbles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#8B6F5C] text-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-sm opacity-90 mb-1 text-center">Total Associates</h3>
              <p className="text-2xl font-bold text-center">-</p>
            </div>
            <div className="bg-[#B4A194] text-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-sm opacity-90 mb-1 text-center">Total Quotes</h3>
              <p className="text-2xl font-bold text-center">-</p>
            </div>
          </div>

          {/* workspace area */}
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px] flex flex-col">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageAD;