import React, { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';

const ViewQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockQuotes = [
      {
        id: 1,
        customer: { name: "Acme Corp", email: "contact@acme.com" },
        status: "draft",
        total: 1500.00,
        createdAt: "2024-03-15",
      },
      {
        id: 2,
        customer: { name: "TechStart Inc", email: "info@techstart.com" },
        status: "finalized",
        total: 2500.00,
        createdAt: "2024-03-16",
      },
      {
        id: 3,
        customer: { name: "Global Solutions", email: "contact@global.com" },
        status: "sanctioned",
        total: 3500.00,
        createdAt: "2024-03-14",
      }
    ];
    
    setQuotes(mockQuotes);
    setLoading(false);
  }, []);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'draft':
        return 'bg-gray-100 text-gray-600';
      case 'finalized':
        return 'bg-blue-100 text-blue-600';
      case 'sanctioned':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B] text-center">
          View All Quotes
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Sort Button */}
          <button
            onClick={toggleSort}
            className="flex items-center gap-2 text-gray-600 mb-4"
          >
            <ArrowDownUp size={16} />
            Sort by newest first
          </button>

          {/* Quotes List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-gray-500">Loading quotes...</div>
            ) : sortedQuotes.length === 0 ? (
              <div className="text-gray-500">No quotes found</div>
            ) : (
              sortedQuotes.map(quote => (
                <div
                  key={quote.id}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{quote.customer.name}</h3>
                    <span>${quote.total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(quote.status)}`}>
                        {getStatusText(quote.status)}
                      </span>
                    </div>
                    <p>Email: {quote.customer.email}</p>
                    <p>Created: {new Date(quote.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuotesPage;