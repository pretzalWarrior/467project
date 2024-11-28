import React, { useState } from 'react';
import { Package, Clock, DollarSign, Lock, Save, Unlock, ArrowUpDown } from 'lucide-react';

const ProcessOrdersPage = () => {
  const COMMISSION_RATE = 0.05; // 5% commission rate

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Acme Corp",
      salesAssociate: "John Doe",
      totalAmount: 2500.00,
      items: [
        { description: "Machine Repair", price: 1500.00 },
        { description: "Parts Replacement", price: 1000.00 }
      ],
      approvedDate: "2024-03-15",
      status: "ready_to_process",
      discount: {
        type: "none",
        value: 0,
        isLocked: false
      },
      secretNotes: [
        "Customer requires urgent processing",
        "Previous order completed successfully",
        "Priority client - handle with care"
      ]
    },
    {
      id: 2,
      customer: "Tech Solutions",
      salesAssociate: "Jane Smith",
      totalAmount: 3200.00,
      items: [
        { description: "System Upgrade", price: 2200.00 },
        { description: "Maintenance", price: 1000.00 }
      ],
      approvedDate: "2024-03-16",
      status: "ready_to_process",
      discount: {
        type: "none",
        value: 0,
        isLocked: false
      },
      secretNotes: [
        "Upgrade needed urgently",
        "Previous client - good payment history"
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSortToggle = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.approvedDate);
    const dateB = new Date(b.approvedDate);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const handleDiscountTypeChange = (type) => {
    if (selectedOrder.discount.isLocked) return;
    
    setSelectedOrder(prev => ({
      ...prev,
      discount: {
        ...prev.discount,
        type,
        value: type === 'none' ? 0 : ''
      }
    }));
    setIsModified(true);
  };

  const handleDiscountValueChange = (e) => {
    if (selectedOrder.discount.isLocked) return;
    
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setSelectedOrder(prev => ({
        ...prev,
        discount: {
          ...prev.discount,
          value: value
        }
      }));
      setIsModified(true);
    }
  };

  const toggleDiscountLock = () => {
    setSelectedOrder(prev => ({
      ...prev,
      discount: {
        ...prev.discount,
        isLocked: !prev.discount.isLocked
      }
    }));
    setIsModified(true);
  };

  const calculateFinalTotal = (order) => {
    if (!order) return 0;
    
    const subtotal = order.totalAmount;
    const discountValue = order.discount.value === '' ? 0 : parseFloat(order.discount.value);
    
    if (order.discount.type === 'percentage') {
      return subtotal * (1 - discountValue / 100);
    } else if (order.discount.type === 'amount') {
      return subtotal - discountValue;
    }
    return subtotal;
  };

  const calculateCommission = (finalTotal) => {
    return finalTotal * COMMISSION_RATE;
  };

  const handleSaveChanges = () => {
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id ? selectedOrder : order
    ));
    setIsModified(false);
    alert('Changes saved successfully!');
  };

  const handleProcessOrder = async (order) => {
    if (isModified) {
      alert('Please save your changes before processing the order.');
      return;
    }

    if (!order.discount.isLocked) {
      alert('Please lock the discount before processing the order.');
      return;
    }

    try {
      const finalTotal = calculateFinalTotal(order);
      const commission = calculateCommission(finalTotal);
      
      const processedOrder = {
        ...order,
        finalTotal,
        commission,
        status: 'processing',
        processedDate: new Date().toISOString()
      };

      setOrders(prev => prev.map(o => 
        o.id === order.id ? processedOrder : o
      ));
      
      setSelectedOrder(null);
      setIsModified(false);
      
      alert(`Order processed successfully!\nFinal Total: $${finalTotal.toFixed(2)}\nCommission: $${commission.toFixed(2)}`);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Error processing order. Please try again.');
    }
  };

  const handleOrderSelect = (order) => {
    if (isModified) {
      const confirm = window.confirm('You have unsaved changes. Do you want to discard them?');
      if (!confirm) return;
    }
    setSelectedOrder(order);
    setIsModified(false);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <div className="space-y-4">
          <button
            onClick={handleSortToggle}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg mb-4 w-full"
          >
            <ArrowUpDown size={16} />
            Sort by {sortOrder === 'desc' ? 'newest' : 'oldest'} first
          </button>

          <div className="space-y-2">
            {sortedOrders.map(order => (
              <div
                key={order.id}
                onClick={() => handleOrderSelect(order)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors
                  ${selectedOrder?.id === order.id ? 'border-[#614B3B] bg-[#F8F7F6]' : 'hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{order.customer}</h3>
                  <span className="text-sm text-gray-500">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <p>By: {order.salesAssociate}</p>
                  <p>Approved: {new Date(order.approvedDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {selectedOrder ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#614B3B] mb-2">
                  {selectedOrder.customer}
                </h2>
                <p className="text-gray-500">Order #{selectedOrder.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-[#B4A194] text-white rounded-lg hover:bg-[#9D8475]"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={() => handleProcessOrder(selectedOrder)}
                  className={`flex items-center gap-2 px-4 py-2 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49] 
                    ${isModified ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isModified}
                >
                  <Package size={16} />
                  Process Order
                </button>
              </div>
            </div>

            <div className="bg-[#F8F7F6] rounded-lg p-4">
              <h3 className="font-medium mb-4">Order Details</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.description}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-4 font-medium flex justify-between items-center">
                  <span>Subtotal</span>
                  <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F7F6] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={20} className="text-[#614B3B]" />
                <h3 className="font-medium">Secret Notes</h3>
              </div>
              <div className="space-y-2">
                {selectedOrder.secretNotes.map((note, index) => (
                  <div key={index} className="p-2 bg-white rounded border text-gray-700">
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F7F6] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} className="text-[#614B3B]" />
                  <h3 className="font-medium">Final Discount</h3>
                </div>
                <button
                  onClick={toggleDiscountLock}
                  className={`p-2 rounded-lg transition-colors
                    ${selectedOrder.discount.isLocked ? 
                      'text-blue-500 hover:bg-blue-50' : 
                      'text-green-500 hover:bg-green-50'}`}
                  title={selectedOrder.discount.isLocked ? 'Unlock discount' : 'Lock discount'}
                >
                  {selectedOrder.discount.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <select
                    value={selectedOrder.discount.type}
                    onChange={(e) => handleDiscountTypeChange(e.target.value)}
                    className={`px-3 py-2 rounded border ${selectedOrder.discount.isLocked ? 'bg-gray-100' : ''}`}
                    disabled={selectedOrder.discount.isLocked}
                  >
                    <option value="none">No Discount</option>
                    <option value="percentage">Percentage</option>
                    <option value="amount">Fixed Amount</option>
                  </select>
                  
                  {selectedOrder.discount.type !== 'none' && (
                    <input
                      type="number"
                      value={selectedOrder.discount.value}
                      onChange={handleDiscountValueChange}
                      placeholder={selectedOrder.discount.type === 'percentage' ? 'Percentage' : 'Amount'}
                      className={`w-32 px-3 py-2 rounded border ${selectedOrder.discount.isLocked ? 'bg-gray-100' : ''}`}
                      min="0"
                      step="any"
                      disabled={selectedOrder.discount.isLocked}
                    />
                  )}
                </div>

                <div className="border-t pt-4 flex justify-between items-center text-lg font-medium">
                  <span>Final Total</span>
                  <span className="text-[#614B3B]">
                    ${calculateFinalTotal(selectedOrder).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8F7F6] rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  Order Timeline
                </h3>
                <div className="space-y-2 text-sm">
                  <p>Approved: {new Date(selectedOrder.approvedDate).toLocaleDateString()}</p>
                  <p>Status: Ready to Process</p>
                </div>
              </div>

              <div className="bg-[#F8F7F6] rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <DollarSign size={16} className="text-[#614B3B]" />
                  Sales Associate
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{selectedOrder.salesAssociate}</p>
                  <div className="flex justify-between items-center text-gray-600">
                    <p>Commission Rate:</p>
                    <p>{(COMMISSION_RATE * 100).toFixed(0)}%</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Estimated Commission:</p>
                    <p className="font-medium text-[#614B3B]">
                      ${calculateCommission(calculateFinalTotal(selectedOrder)).toFixed(2)}
                    </p>
                  </div>
                  {selectedOrder.commission && (
                    <div className="flex justify-between items-center text-green-600 font-medium">
                      <p>Final Commission:</p>
                      <p>${selectedOrder.commission.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>Select an order to add discount and process</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessOrdersPage;