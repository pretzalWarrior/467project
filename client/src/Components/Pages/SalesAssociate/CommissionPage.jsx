import React, { useState, useEffect } from 'react';
import { Calendar, Filter, SortDesc } from 'lucide-react';

const CommissionPage = () => {
  const [commissionData, setCommissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCommission, setTotalCommission] = useState(0);
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        period: "March 2024",
        sortDate: "2024-03",
        totalCommission: 1234.56,
        orders: [
          { id: 101, customer: "Acme Corp", amount: 534.56, date: "2024-03-15" },
          { id: 102, customer: "TechStart Inc", amount: 700.00, date: "2024-03-17" },
        ]
      },
      {
        id: 2,
        period: "February 2024",
        sortDate: "2024-02",
        totalCommission: 987.65,
        orders: [
          { id: 103, customer: "Global Solutions", amount: 487.65, date: "2024-02-14" },
          { id: 104, customer: "Prime Industries", amount: 500.00, date: "2024-02-28" },
        ]
      }
    ];
    
    // Sort data by date (most recent first)
    const sortedData = [...mockData].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    setCommissionData(sortedData);
    setLoading(false);

    // Calculate total commission
    const total = mockData.reduce((sum, period) => sum + period.totalCommission, 0);
    setTotalCommission(total);
  }, []);

  // Sort function for orders
  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      if (sortOrder === 'desc') {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B] text-center">Commission Report</h1>
      </div>

      {/* Commission Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F8F7F6]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading commission data...
          </div>
        ) : commissionData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Filter className="w-12 h-12 mb-2 opacity-50" />
            <p>No commission data found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Total Commission Card */}
            <div className="flex justify-center">
              <div className="inline-flex flex-col items-center bg-[#614B3B] text-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-medium opacity-90">Total Commission</h2>
                <p className="text-3xl font-bold mt-2">
                  ${totalCommission.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Period Cards */}
            {commissionData.map(period => (
              <div key={period.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#614B3B]" />
                      <h3 className="font-medium text-gray-900">{period.period}</h3>
                    </div>
                    <p className="font-bold text-[#614B3B]">
                      ${period.totalCommission.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-[#614B3B]"
                          onClick={toggleSortOrder}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            <SortDesc 
                              className={`w-4 h-4 transform transition-transform ${
                                sortOrder === 'asc' ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Commission Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortOrders(period.orders).map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">
                            ${order.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionPage;