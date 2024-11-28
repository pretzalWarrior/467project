import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Unlock, Check, FileEdit } from 'lucide-react';

const EditQuotePage = () => {
  // State for quotes list and selected quote
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Initial fetch of draft quotes
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockQuotes = [
      {
        id: 1,
        customer: { name: "Acme Corp", email: "contact@acme.com" },
        status: "draft",
        total: 1500.00,
        createdAt: "2024-03-15",
        lineItems: [
          { description: "Service A", price: "1000.00", isLocked: false },
          { description: "Service B", price: "500.00", isLocked: false }
        ],
        secretNotes: "Customer prefers evening maintenance"
      },
      {
        id: 2,
        customer: { name: "TechStart Inc", email: "info@techstart.com" },
        status: "draft",
        total: 2500.00,
        createdAt: "2024-03-16",
        lineItems: [
          { description: "Consulting", price: "2500.00", isLocked: false }
        ],
        secretNotes: "Urgent project - priority client"
      }
    ];
    
    setQuotes(mockQuotes);
  }, []);

  // Handle quote selection
  const handleQuoteSelect = (e) => {
    const quote = quotes.find(q => q.id === parseInt(e.target.value));
    setSelectedQuote(quote || null);
  };

  // Handle line item changes
  const handleLineItemChange = (index, field, value) => {
    if (!selectedQuote) return;
    
    const newLineItems = [...selectedQuote.lineItems];
    newLineItems[index] = {
      ...newLineItems[index],
      [field]: value
    };
    
    setSelectedQuote(prev => ({
      ...prev,
      lineItems: newLineItems,
      total: newLineItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0)
    }));
  };

  // Add new line item
  const addLineItem = () => {
    if (!selectedQuote) return;
    
    setSelectedQuote(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', price: '', isLocked: false }]
    }));
  };

  // Remove line item
  const removeLineItem = (index) => {
    if (!selectedQuote || selectedQuote.lineItems.length <= 1) return;
    
    const newLineItems = selectedQuote.lineItems.filter((_, i) => i !== index);
    setSelectedQuote(prev => ({
      ...prev,
      lineItems: newLineItems,
      total: newLineItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0)
    }));
  };

  // Toggle line item lock
  const toggleLineItemLock = (index) => {
    if (!selectedQuote) return;
    
    const item = selectedQuote.lineItems[index];
    if (!item.isLocked && (!item.description || !item.price)) {
      alert('Please fill in both description and price before locking the item');
      return;
    }

    const newLineItems = [...selectedQuote.lineItems];
    newLineItems[index] = {
      ...newLineItems[index],
      isLocked: !newLineItems[index].isLocked
    };
    
    setSelectedQuote(prev => ({
      ...prev,
      lineItems: newLineItems
    }));
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    if (!selectedQuote) return;
    
    setSelectedQuote(prev => ({
      ...prev,
      secretNotes: e.target.value
    }));
  };

  // Save changes
  const handleSave = async (action) => {
    if (!selectedQuote) return;
    
    try {
      // Mock API call
      console.log('Saving quote:', selectedQuote);
      
      if (action === 'finalize') {
        alert('Quote has been finalized and sent to HQ for review!');
        setSelectedQuote(null);
      } else {
        alert('Changes saved successfully!');
      }
      
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Quote Selection */}
      <div className="flex-none p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B] text-center mb-4">Edit Quote</h1>
        <div className="flex justify-center">
          <select
            onChange={handleQuoteSelect}
            value={selectedQuote?.id || ''}
            className="w-96 h-10 px-3 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] bg-white"
          >
            <option value="">Select a quote to edit</option>
            {quotes.map(quote => (
              <option key={quote.id} value={quote.id}>
                {quote.customer.name} - ${quote.total.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {!selectedQuote ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a quote to edit
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8F7F6]">
              {/* Customer Info */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="font-medium text-gray-900 mb-2">Customer Information</h2>
                <div className="text-gray-600">
                  <div>{selectedQuote.customer.name}</div>
                  <div>{selectedQuote.customer.email}</div>
                </div>
              </div>

              {/* Line Items */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-gray-900">Line Items</h2>
                  <button
                    onClick={addLineItem}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49] text-sm"
                  >
                    <Plus size={14} />
                    Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedQuote.lineItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                        placeholder="Enter item description..."
                        className={`flex-1 h-10 px-3 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] 
                          ${item.isLocked ? 'bg-gray-100' : ''}`}
                        disabled={item.isLocked}
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleLineItemChange(index, 'price', e.target.value)}
                        placeholder="Price"
                        className={`w-24 h-10 px-3 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C]
                          ${item.isLocked ? 'bg-gray-100' : ''}`}
                        disabled={item.isLocked}
                      />
                      <button
                        onClick={() => toggleLineItemLock(index)}
                        className={`h-10 px-2 rounded-lg transition-colors
                          ${item.isLocked 
                            ? 'text-blue-500 hover:bg-blue-50' 
                            : 'text-green-500 hover:bg-green-50'}`}
                        title={item.isLocked ? 'Unlock item' : 'Lock item'}
                      >
                        {item.isLocked ? <Unlock size={16} /> : <Check size={16} />}
                      </button>
                      <button
                        onClick={() => removeLineItem(index)}
                        className="h-10 px-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secret Notes */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="font-medium text-gray-900 mb-2">Secret Notes</h2>
                <textarea
                  value={selectedQuote.secretNotes}
                  onChange={handleNotesChange}
                  placeholder="Enter private notes here..."
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex-none p-4 border-t bg-white">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  Total: ${selectedQuote.total.toFixed(2)}
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave('save')}
                    className="flex items-center gap-1 px-4 py-2 bg-[#B4A194] text-white rounded-lg hover:bg-[#9D8475]"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => handleSave('finalize')}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FileEdit size={16} />
                    Finalize Quote
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditQuotePage;