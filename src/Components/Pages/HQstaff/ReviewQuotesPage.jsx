import React, { useState } from 'react';
import { ArrowUpDown, Plus, Trash2, Save, ArrowRight, Unlock, Lock, DollarSign } from 'lucide-react';

const ReviewQuotesPage = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      customer: "Acme Corp",
      salesAssociate: "John Doe",
      totalAmount: 2500.00,
      customerEmail: "contact@acmecorp.com",
      items: [
        { description: "Machine Repair", price: 1500.00, isLocked: true },
        { description: "Parts Replacement", price: 1000.00, isLocked: true }
      ],
      secretNotes: ["Customer requires urgent processing", "Original note from sales"],
      submittedDate: "2024-03-15T10:30:00",
      status: "pending_review",
      discount: {
        type: "none",
        value: '',
        isLocked: false
      }
    },
    {
      id: 2,
      customer: "Tech Solutions",
      salesAssociate: "Jane Smith",
      totalAmount: 3200.00,
      customerEmail: "info@techsolutions.com",
      items: [
        { description: "System Upgrade", price: 2200.00, isLocked: true },
        { description: "Maintenance", price: 1000.00, isLocked: true }
      ],
      secretNotes: ["Regular customer - priority service"],
      submittedDate: "2024-03-16T14:45:00",
      status: "pending_review",
      discount: {
        type: "none",
        value: '',
        isLocked: false
      }
    }
  ]);

  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editedQuote, setEditedQuote] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSortToggle = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    const dateA = new Date(a.submittedDate);
    const dateB = new Date(b.submittedDate);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const handleQuoteSelect = (quote) => {
    const quoteWithLockedItems = {
      ...quote,
      items: quote.items.map(item => ({
        ...item,
        isLocked: true
      })),
      newNote: ''
    };
    setSelectedQuote(quote);
    setEditedQuote(quoteWithLockedItems);
  };

  const handleAddLineItem = () => {
    setEditedQuote(prev => ({
      ...prev,
      items: [...prev.items, { description: '', price: '', isLocked: false }]
    }));
  };

  const handleRemoveLineItem = (index) => {
    if (editedQuote.items[index].isLocked) return;
    setEditedQuote(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleLineItemChange = (index, field, value) => {
    if (editedQuote.items[index].isLocked) return;
    setEditedQuote(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const toggleLineItemLock = (index) => {
    setEditedQuote(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, isLocked: !item.isLocked } : item
      )
    }));
  };

  const toggleDiscountLock = () => {
    setEditedQuote(prev => ({
      ...prev,
      discount: {
        ...prev.discount,
        isLocked: !prev.discount.isLocked
      }
    }));
  };

  const handleDiscountTypeChange = (type) => {
    if (editedQuote.discount.isLocked) return;
    
    setEditedQuote(prev => ({
      ...prev,
      discount: { 
        ...prev.discount,
        type,
        value: type === 'none' ? 0 : ''
      }
    }));
  };

  const handleDiscountValueChange = (e) => {
    if (editedQuote.discount.isLocked) return;
    
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setEditedQuote(prev => ({
        ...prev,
        discount: { 
          ...prev.discount, 
          value: value === '' ? '' : parseFloat(value)
        }
      }));
    }
  };

  const calculateTotal = () => {
    if (!editedQuote) return 0;
    
    const subtotal = editedQuote.items.reduce((sum, item) => 
      sum + (parseFloat(item.price) || 0), 0
    );

    const discountValue = editedQuote.discount.value === '' ? 0 : editedQuote.discount.value;

    if (editedQuote.discount.type === 'percentage') {
      return subtotal * (1 - discountValue / 100);
    } else if (editedQuote.discount.type === 'amount') {
      return subtotal - discountValue;
    }
    return subtotal;
  };

  const handleAddNote = () => {
    if (editedQuote.newNote.trim()) {
      setEditedQuote(prev => ({
        ...prev,
        secretNotes: [...prev.secretNotes, prev.newNote.trim()],
        newNote: ''
      }));
    }
  };

  const handleSave = () => {
    const updatedQuote = {
      ...editedQuote,
      totalAmount: calculateTotal()
    };
    setQuotes(prev => prev.map(q => 
      q.id === updatedQuote.id ? updatedQuote : q
    ));
    setSelectedQuote(updatedQuote);
  };

  const handleSanction = () => {
    if (!editedQuote.discount.isLocked) {
      alert('Please lock the discount before sanctioning the quote.');
      return;
    }

    const sanctionedQuote = {
      ...editedQuote,
      status: 'sanctioned',
      totalAmount: calculateTotal()
    };
    
    setQuotes(prev => prev.map(q => 
      q.id === sanctionedQuote.id ? sanctionedQuote : q
    ));
    
    setSelectedQuote(null);
    setEditedQuote(null);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-4">
          <button
            onClick={handleSortToggle}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg mb-4 w-full"
          >
            <ArrowUpDown size={16} />
            Sort by {sortOrder === 'desc' ? 'newest' : 'oldest'} first
          </button>

          <div className="space-y-2">
            {sortedQuotes.map(quote => (
              <div
                key={quote.id}
                onClick={() => handleQuoteSelect(quote)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors
                  ${selectedQuote?.id === quote.id ? 'border-[#614B3B] bg-[#F8F7F6]' : 'hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{quote.customer}</h3>
                  <span className="text-sm text-gray-500">
                    ${quote.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <p>By: {quote.salesAssociate}</p>
                  <p>Email: {quote.customerEmail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {editedQuote ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#614B3B] mb-2">
                  {editedQuote.customer}
                </h2>
                <p className="text-gray-500">Quote #{editedQuote.id}</p>
                <p className="text-gray-500">Email: {editedQuote.customerEmail}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49]"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={handleSanction}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <ArrowRight size={16} />
                  Sanction Quote
                </button>
              </div>
            </div>

            <div className="bg-[#F8F7F6] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Line Items</h3>
                <button
                  onClick={handleAddLineItem}
                  className="flex items-center gap-1 text-sm text-[#614B3B] hover:text-[#725A49]"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
              <div className="space-y-2">
                {editedQuote.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                      placeholder="Item description"
                      className={`flex-1 px-3 py-2 rounded border ${item.isLocked ? 'bg-gray-100' : ''}`}
                      disabled={item.isLocked}
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleLineItemChange(index, 'price', e.target.value)}
                      placeholder="Price"
                      className={`w-32 px-3 py-2 rounded border ${item.isLocked ? 'bg-gray-100' : ''}`}
                      disabled={item.isLocked}
                    />
                    <button
                      onClick={() => toggleLineItemLock(index)}
                      className={`p-2 rounded hover:bg-gray-100
                        ${item.isLocked ? 'text-red-500' : 'text-green-500'}`}
                      title={item.isLocked ? 'Unlock to edit' : 'Lock item'}
                    >
                      {item.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                    </button>
                    <button
                      onClick={() => handleRemoveLineItem(index)}
                      className={`p-2 rounded hover:bg-red-50
                        ${item.isLocked ? 'text-gray-400 cursor-not-allowed' : 'text-red-500'}`}
                      disabled={item.isLocked}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F7F6] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} className="text-[#614B3B]" />
                  <h3 className="font-medium">Discount</h3>
                </div>
                <button
                  onClick={toggleDiscountLock}
                  className={`p-2 rounded-lg transition-colors
                    ${editedQuote.discount.isLocked ? 
                      'text-blue-500 hover:bg-blue-50' : 
                      'text-green-500 hover:bg-green-50'}`}
                  title={editedQuote.discount.isLocked ? 'Unlock discount' : 'Lock discount'}
                >
                  {editedQuote.discount.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>
              </div>
              
              <div className="flex gap-4 items-center">
                <select
                  value={editedQuote.discount.type}
                  onChange={(e) => handleDiscountTypeChange(e.target.value)}
                  className={`px-3 py-2 rounded border ${editedQuote.discount.isLocked ? 'bg-gray-100' : ''}`}
                  disabled={editedQuote.discount.isLocked}
                >
                  <option value="none">No Discount</option>
                  <option value="percentage">Percentage</option>
                  <option value="amount">Fixed Amount</option>
                </select>
                {editedQuote.discount.type !== 'none' && (
                  <input
                    type="number"
                    value={editedQuote.discount.value}
                    onChange={handleDiscountValueChange}
                    placeholder={editedQuote.discount.type === 'percentage' ? 'Percentage' : 'Amount'}
                    className={`w-32 px-3 py-2 rounded border ${editedQuote.discount.isLocked ? 'bg-gray-100' : ''}`}
                    min="0"
                    step="any"
                    disabled={editedQuote.discount.isLocked}
                  />
                )}
                <div className="ml-auto font-medium">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            <div className="bg-[#F8F7F6] rounded-lg p-4">
              <h3 className="font-medium mb-4">Secret Notes</h3>
              <div className="space-y-2 mb-4">
                {editedQuote.secretNotes.map((note, index) => (
                  <div key={index} className="p-2 bg-white rounded border text-gray-700">
                    {note}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editedQuote.newNote}
                  onChange={(e) => setEditedQuote(prev => ({ ...prev, newNote: e.target.value }))}
                  placeholder="Add a new note..."
                  className="flex-1 px-3 py-2 rounded border"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-[#614B3B] text-white rounded hover:bg-[#725A49]"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>Select a quote to review its details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewQuotesPage;