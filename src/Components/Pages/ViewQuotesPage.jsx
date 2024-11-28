import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Filter } from 'lucide-react';

const ViewQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockQuotes = [
      {
        id: 1,
        customer: { name: "Acme Corp", email: "contact@acme.com" },
        status: "draft",
        total: 1500.00,
        createdAt: "2024-03-15",
        lastModified: "2024-03-15",
      },
      {
        id: 2,
        customer: { name: "TechStart Inc", email: "info@techstart.com" },
        status: "finalized",
        total: 2500.00,
        createdAt: "2024-03-16",
        lastModified: "2024-03-17",
      },
      {
        id: 3,
        customer: { name: "Global Solutions", email: "contact@global.com" },
        status: "sanctioned",
        total: 3500.00,
        createdAt: "2024-03-14",
        lastModified: "2024-03-18",
      }
    ];
    
    setQuotes(mockQuotes);
    setLoading(false);
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'draft':
        return <Clock className="w-5 h-5 text-gray-500" />;
      case 'finalized':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'sanctioned':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'draft':
        return 'Draft';
      case 'finalized':
        return 'Finalized';
      case 'sanctioned':
        return 'Sanctioned';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
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

  const filteredQuotes = statusFilter === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === statusFilter);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B] text-center mb-6">View All Quotes</h1>
        
        {/* Filter */}
        <div className="flex justify-center gap-2">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-md text-sm transition-colors
                ${statusFilter === 'all' 
                  ? 'bg-white text-[#614B3B] shadow' 
                  : 'text-gray-600 hover:text-[#614B3B]'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-4 py-2 rounded-md text-sm transition-colors
                ${statusFilter === 'draft' 
                  ? 'bg-white text-[#614B3B] shadow' 
                  : 'text-gray-600 hover:text-[#614B3B]'}`}
            >
              Draft
            </button>
            <button
              onClick={() => setStatusFilter('finalized')}
              className={`px-4 py-2 rounded-md text-sm transition-colors
                ${statusFilter === 'finalized' 
                  ? 'bg-white text-[#614B3B] shadow' 
                  : 'text-gray-600 hover:text-[#614B3B]'}`}
            >
              Finalized
            </button>
            <button
              onClick={() => setStatusFilter('sanctioned')}
              className={`px-4 py-2 rounded-md text-sm transition-colors
                ${statusFilter === 'sanctioned' 
                  ? 'bg-white text-[#614B3B] shadow' 
                  : 'text-gray-600 hover:text-[#614B3B]'}`}
            >
              Sanctioned
            </button>
          </div>
        </div>
      </div>

      {/* Quotes List */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F8F7F6]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading quotes...
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Filter className="w-12 h-12 mb-2 opacity-50" />
            <p>No quotes found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredQuotes.map(quote => (
              <div 
                key={quote.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{quote.customer.name}</h3>
                    <p className="text-sm text-gray-500">{quote.customer.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${getStatusStyle(quote.status)}`}>
                      {getStatusIcon(quote.status)}
                      {getStatusText(quote.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Created: {new Date(quote.createdAt).toLocaleDateString()}
                    {quote.lastModified !== quote.createdAt && (
                      <> · Modified: {new Date(quote.lastModified).toLocaleDateString()}</>
                    )}
                  </div>
                  <div className="font-medium text-[#614B3B]">
                    ${quote.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQuotesPage;