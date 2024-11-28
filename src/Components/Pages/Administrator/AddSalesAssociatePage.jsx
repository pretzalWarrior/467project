import React, { useState } from 'react';

const AddSalesAssociatePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    address: '',
    commission: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#614B3B]">Add New Sales Associate</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Commission ($)
            </label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C]"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49] transition-colors"
          >
            Add Sales Associate
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalesAssociatePage;