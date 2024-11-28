import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Building2, Unlock, Check } from 'lucide-react';

const SalesQuotePage = () => {
  // State management
  const [quoteData, setQuoteData] = useState({
    customer: null,
    lineItems: [{ description: '', price: '', isLocked: false }],
    secretNotes: '',
    customerEmail: '',
    status: 'draft'
  });

  const [customers, setCustomers] = useState([]);

  // Load customers on component mount
  useEffect(() => {
    // Mock customer data - replace with actual API call
    const mockCustomers = [
      { id: 1, name: "Example Customer 1", email: "customer1@example.com" },
      { id: 2, name: "Example Customer 2", email: "customer2@example.com" },
      { id: 3, name: "Example Customer 3", email: "customer3@example.com" }
    ];
    setCustomers(mockCustomers);
  }, []);

// Handle customer selection - now doesn't set email
const handleCustomerSelect = (e) => {
  const selectedCustomer = customers.find(customer => customer.id === parseInt(e.target.value));
  if (selectedCustomer) {
    setQuoteData(prev => ({
      ...prev,
      customer: selectedCustomer
    }));
  } else {
    setQuoteData(prev => ({
      ...prev,
      customer: null
    }));
  }
};

  // Handle email change
  const handleEmailChange = (e) => {
    setQuoteData(prev => ({
      ...prev,
      customerEmail: e.target.value
    }));
  };

  // Handle line item changes
  const handleLineItemChange = (index, field, value) => {
    if (quoteData.lineItems[index].isLocked) return;

    const newLineItems = [...quoteData.lineItems];
    newLineItems[index] = {
      ...newLineItems[index],
      [field]: value
    };
    setQuoteData(prev => ({
      ...prev,
      lineItems: newLineItems
    }));
  };

  // Toggle line item lock
  const toggleLineItemLock = (index) => {
    const item = quoteData.lineItems[index];
    // Only allow locking if both description and price are filled
    if (!item.isLocked && (!item.description || !item.price)) {
      alert('Please fill in both description and price before locking the item');
      return;
    }

    const newLineItems = [...quoteData.lineItems];
    newLineItems[index] = {
      ...newLineItems[index],
      isLocked: !newLineItems[index].isLocked
    };
    setQuoteData(prev => ({
      ...prev,
      lineItems: newLineItems
    }));
  };

  // Add new line item
  const addLineItem = () => {
    setQuoteData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', price: '', isLocked: false }]
    }));
  };

  // Remove line item
  const removeLineItem = (index) => {
    if (quoteData.lineItems.length > 1) {
      setQuoteData(prev => ({
        ...prev,
        lineItems: prev.lineItems.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle secret notes change
  const handleNotesChange = (e) => {
    setQuoteData(prev => ({
      ...prev,
      secretNotes: e.target.value
    }));
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Calculate total
  const calculateTotal = () => {
    return quoteData.lineItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) || 0);
    }, 0);
  };

  // Handle form submission
  const handleSubmit = async (status) => {
    if (status === 'pending_review' && !isValidEmail(quoteData.customerEmail)) {
      alert('Please enter a valid email address before sending to HQ');
      return;
    }

    const quoteSubmission = {
      customerId: quoteData.customer?.id,
      customerEmail: quoteData.customerEmail,
      lineItems: quoteData.lineItems,
      secretNotes: quoteData.secretNotes,
      status: status,
      total: calculateTotal(),
      createdAt: new Date().toISOString()
    };

    try {
      console.log('Submitting quote:', quoteSubmission);
      
      if (status === 'pending_review') {
        setQuoteData({
          customer: null,
          lineItems: [{ description: '', price: '', isLocked: false }],
          secretNotes: '',
          customerEmail: '',
          status: 'draft'
        });
      }
      
      alert(status === 'pending_review' 
        ? 'Quote successfully sent to HQ for review!' 
        : 'Quote saved as draft!'
      );

    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error submitting quote. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex-none p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B]">
          Enter Sales Quote
        </h1>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Customer Selection Dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Select Existing Customer
            </label>
            <select
              value={quoteData.customer?.id || ''}
              onChange={handleCustomerSelect}
              className="w-full h-10 px-3 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] bg-white"
            >
              <option value="">Select a customer...</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Customer Email
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              value={quoteData.customerEmail}
              onChange={handleEmailChange}
              placeholder="Enter customer email..."
              className="w-full h-10 px-3 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C]"
            />
            {quoteData.customerEmail && !isValidEmail(quoteData.customerEmail) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
            )}
          </div>

          {/* Line Items */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Line Items</label>
              <button
                onClick={addLineItem}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49] text-sm"
              >
                <Plus size={14} />
                Add Item
              </button>
            </div>
            
            <div className="space-y-2">
              {quoteData.lineItems.map((item, index) => (
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
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Secret Notes
            </label>
            <textarea
              value={quoteData.secretNotes}
              onChange={handleNotesChange}
              placeholder="Enter private notes here..."
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C]"
            />
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex-none p-6 border-t bg-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">
            Total: ${calculateTotal().toFixed(2)}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmit('draft')}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#B4A194] text-white rounded-lg hover:bg-[#9D8475] text-sm"
            >
              <Save size={16} />
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit('pending_review')}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              disabled={!isValidEmail(quoteData.customerEmail)}
              title={!isValidEmail(quoteData.customerEmail) ? 'Please enter a valid email first' : ''}
            >
              <Building2 size={16} />
              Send to HQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesQuotePage;