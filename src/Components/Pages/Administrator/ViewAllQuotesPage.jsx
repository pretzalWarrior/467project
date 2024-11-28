import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, Building2, X, DollarSign, Lock, Mail } from 'lucide-react';

const ViewAllQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    salesAssociate: '',
    customer: ''
  });
  const [salesAssociates, setSalesAssociates] = useState([]);

  useEffect(() => {
    const mockQuotes = [
      {
        id: 1,
        customer: "Acme Corp",
        customerEmail: "contact@acmecorp.com",
        salesAssociate: "John Doe",
        status: "finalized",
        date: "2024-03-15",
        total: 2500.00,
        items: [
          { description: "Machine Repair", price: 1500.00 },
          { description: "Parts Replacement", price: 1000.00 }
        ],
        secretNotes: [
          "Customer requires urgent processing",
          "Previous order completed successfully"
        ],
        discount: {
          type: "percentage",
          value: 10
        }
      },
      {
        id: 2,
        customer: "Tech Solutions",
        customerEmail: "info@techsolutions.com",
        salesAssociate: "Jane Smith",
        status: "sanctioned",
        date: "2024-03-16",
        total: 3200.00,
        items: [
          { description: "System Upgrade", price: 2200.00 },
          { description: "Maintenance", price: 1000.00 }
        ],
        secretNotes: [
          "Regular customer - priority service"
        ],
        discount: {
          type: "amount",
          value: 200
        }
      }
    ];

    const mockSalesAssociates = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" }
    ];

    setQuotes(mockQuotes);
    setFilteredQuotes(mockQuotes);
    setSalesAssociates(mockSalesAssociates);
  }, []);

  const applyFilters = () => {
    let filtered = [...quotes];

    if (filters.status) {
      filtered = filtered.filter(quote => quote.status === filters.status);
    }

    if (filters.startDate) {
      filtered = filtered.filter(quote => quote.date >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter(quote => quote.date <= filters.endDate);
    }

    if (filters.salesAssociate) {
      filtered = filtered.filter(quote => quote.salesAssociate === filters.salesAssociate);
    }

    if (filters.customer) {
      filtered = filtered.filter(quote => 
        quote.customer.toLowerCase().includes(filters.customer.toLowerCase())
      );
    }

    setFilteredQuotes(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      startDate: '',
      endDate: '',
      salesAssociate: '',
      customer: ''
    });
    setFilteredQuotes(quotes);
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const calculateDiscountedTotal = (quote) => {
    const subtotal = quote.items.reduce((sum, item) => sum + item.price, 0);
    if (quote.discount.type === 'percentage') {
      return subtotal * (1 - quote.discount.value / 100);
    } else if (quote.discount.type === 'amount') {
      return subtotal - quote.discount.value;
    }
    return subtotal;
  };

  // Quote Details Modal Component
  const QuoteDetailsModal = ({ quote, onClose }) => {
    if (!quote) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-[30rem] max-h-[80vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-semibold text-[#614B3B]">Quote #{quote.id}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X size={18} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 space-y-4">
            {/* Customer Info */}
            <div className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 size={14} />
                <span>{quote.customer}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Mail size={14} />
                <span>{quote.customerEmail}</span>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-sm font-medium mb-2">Line Items</h3>
              <div className="space-y-1">
                {quote.items.map((item, index) => (
                  <div key={index} className="flex justify-between bg-gray-50 p-2 rounded text-sm">
                    <span>{item.description}</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secret Notes */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lock size={14} />
                <h3 className="text-sm font-medium">Secret Notes</h3>
              </div>
              <div className="space-y-1">
                {quote.secretNotes.map((note, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-3 rounded space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sales Associate:</span>
                <span className="font-medium">{quote.salesAssociate}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(quote.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-medium ${
                  quote.status === 'ordered' ? 'text-green-600' : 
                  quote.status === 'sanctioned' ? 'text-blue-600' : 
                  'text-gray-600'
                }`}>
                  {formatStatus(quote.status)}
                </span>
              </div>
              <div className="flex justify-between font-medium pt-1 border-t">
                <span>Discount:</span>
                <span>
                  {quote.discount.type === 'percentage' 
                    ? `${quote.discount.value}%` 
                    : `$${quote.discount.value}`}
                </span>
              </div>
              <div className="flex justify-between font-medium text-[#614B3B]">
                <span>Final Total:</span>
                <span>${calculateDiscountedTotal(quote).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-4 py-3 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#614B3B] text-white text-sm rounded-md hover:bg-[#725A49]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B]">View All Quotes</h1>
      </div>

      {/* Filters */}
      <div className="p-6 bg-[#F8F7F6] border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-[#8B6F5C]"
            >
              <option value="">All Statuses</option>
              <option value="finalized">Finalized</option>
              <option value="sanctioned">Sanctioned</option>
              <option value="ordered">Ordered</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-[#8B6F5C]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-[#8B6F5C]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Sales Associate
            </label>
            <select
              value={filters.salesAssociate}
              onChange={(e) => handleFilterChange('salesAssociate', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-[#8B6F5C]"
            >
              <option value="">All Associates</option>
              {salesAssociates.map(associate => (
                <option key={associate.id} value={associate.name}>
                  {associate.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Customer
            </label>
            <input
              type="text"
              value={filters.customer}
              onChange={(e) => handleFilterChange('customer', e.target.value)}
              placeholder="Search customer..."
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-[#8B6F5C]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49]"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Associate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuotes.map(quote => (
                <tr 
                  key={quote.id} 
                  onClick={() => setSelectedQuote(quote)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">#{quote.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{quote.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{quote.salesAssociate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${quote.status === 'ordered' ? 'bg-green-100 text-green-800' : 
                        quote.status === 'sanctioned' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {formatStatus(quote.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(quote.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    ${quote.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {selectedQuote && (
        <QuoteDetailsModal 
          quote={selectedQuote} 
          onClose={() => setSelectedQuote(null)} 
        />
      )}
    </div>
  );
};

export default ViewAllQuotesPage;
