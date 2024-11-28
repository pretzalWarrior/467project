import React, { useState } from 'react';
import { ArrowUpDown, Trash2, X } from 'lucide-react';

const EditSalesAssociatePage = () => {
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    password: ''
  });

  // Mock data - replace with actual API call
  const mockAssociates = [
    { 
      id: 1, 
      fullName: 'John Doe', 
      address: '123 Main St, City, State',
      commission: 1500.00,
      joinDate: '2024-03-15'
    },
    { 
      id: 2, 
      fullName: 'Jane Smith', 
      address: '456 Oak Ave, Town, State',
      commission: 2000.00,
      joinDate: '2024-03-16'
    }
  ];

  const handleSortToggle = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  const sortedAssociates = [...mockAssociates].sort((a, b) => {
    const dateA = new Date(a.joinDate);
    const dateB = new Date(b.joinDate);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const handleSelectAssociate = (associate) => {
    setSelectedAssociate(associate);
    setFormData({
      fullName: associate.fullName,
      address: associate.address,
      password: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssociate) return;
    
    const submissionData = {
      id: selectedAssociate.id,
      fullName: formData.fullName,
      address: formData.address,
      commission: selectedAssociate.commission
    };

    if (formData.password) {
      submissionData.password = formData.password;
    }

    console.log('Form submitted:', submissionData);
  };

  const handleDeleteAssociate = () => {
    console.log('Deleting associate:', selectedAssociate.id);
    setShowDeleteModal(false);
    setSelectedAssociate(null);
  };

  return (
    <>
      <div className="flex h-full">
        {/* Left sidebar with associates list */}
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
              {sortedAssociates.map(associate => (
                <div
                  key={associate.id}
                  onClick={() => handleSelectAssociate(associate)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors
                    ${selectedAssociate?.id === associate.id ? 'border-[#614B3B] bg-[#F8F7F6]' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{associate.fullName}</h3>
                    <span className="text-sm text-gray-500">
                      ${associate.commission.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p className="truncate">{associate.address}</p>
                    <p>Joined: {new Date(associate.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side edit form */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedAssociate ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#614B3B] mb-2">
                    Edit Sales Associate
                  </h2>
                  <p className="text-gray-500">ID: {selectedAssociate.id}</p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Associate"
                >
                  <Trash2 size={20} />
                </button>
              </div>

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
                      Current Commission
                    </label>
                    <div className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-gray-700">
                      ${selectedAssociate.commission.toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] focus:border-[#8B6F5C]"
                      placeholder="Leave empty to keep current password"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedAssociate(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#614B3B] text-white rounded-lg hover:bg-[#725A49] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Select a sales associate to edit their information</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Delete Sales Associate</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedAssociate?.fullName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAssociate}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditSalesAssociatePage;