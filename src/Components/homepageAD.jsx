import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import page components
import AddSalesAssociatePage from './Pages/Administrator/AddSalesAssociatePage';
import EditSalesAssociatePage from './Pages/Administrator/EditSalesAssociatePage';
import ViewAllQuotesPage from './Pages/Administrator/ViewAllQuotesPage';

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
      case 'addSalesAssociate':
        return <AddSalesAssociatePage />;
      case 'editSalesAssociate':
        return <EditSalesAssociatePage />;
      case 'viewAllQuotes':
        return <ViewAllQuotesPage />;
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
            <h1 className="text-white text-lg font-bold text-center">Quote System</h1>
          </div>

          {/* navigation menu */}
          <nav className="space-y-2 flex-1">
            <button 
              onClick={() => setCurrentPage('addSalesAssociate')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'addSalesAssociate' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Add Sales Associate
            </button>
            <button 
              onClick={() => setCurrentPage('editSalesAssociate')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'editSalesAssociate' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              Edit Sales Associate
            </button>
            <button 
              onClick={() => setCurrentPage('viewAllQuotes')}
              className={`w-full text-left text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${currentPage === 'viewAllQuotes' ? 'bg-[#725A49]' : 'hover:bg-[#725A49]'}`}
            >
              View All Quotes
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
        <header className="bg-white border-b p-4 flex-none">
          <h1 className="text-xl font-semibold text-center">Admin Dashboard</h1>
        </header>

        {/* dashboard content - now scrollable */}
        <div className="flex-1 overflow-auto bg-[#F8F7F6]">
          <div className="p-6 min-h-full">
            {/* stats bubbles - centered and with gap */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="inline-block bg-[#8B6F5C] text-white px-6 py-4 rounded-xl shadow-sm">
                <h3 className="text-sm opacity-90 mb-1 whitespace-nowrap">Total Associates</h3>
                <p className="text-2xl font-bold text-center">-</p>
              </div>
              <div className="inline-block bg-[#9D8475] text-white px-6 py-4 rounded-xl shadow-sm">
                <h3 className="text-sm opacity-90 mb-1 whitespace-nowrap">Total Quotes</h3>
                <p className="text-2xl font-bold text-center">-</p>
              </div>
            </div>

            {/* workspace area */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {renderPage()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageAD;