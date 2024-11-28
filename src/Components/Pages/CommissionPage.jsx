import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CommissionPage = () => {
  const [commissionData, setCommissionData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData = {
      thisMonth: {
        totalCommission: 2450.75,
        numberOfSales: 12,
        trend: 'up',
        trendPercentage: 15.4,
        transactions: [
          { id: 1, date: '2024-03-15', customerName: 'Acme Corp', saleAmount: 15000, commission: 750.00, status: 'paid' },
          { id: 2, date: '2024-03-12', customerName: 'TechStart Inc', saleAmount: 8500, commission: 425.00, status: 'pending' },
          { id: 3, date: '2024-03-10', customerName: 'Global Solutions', saleAmount: 12000, commission: 600.00, status: 'paid' },
        ]
      }
    };

    setCommissionData(mockData[selectedPeriod]);
    setLoading(false);
  }, [selectedPeriod]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading commission data...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none p-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#614B3B] text-center mb-4">My Commission</h1>
        <div className="flex justify-center">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-48 h-10 px-3 border rounded-lg focus:ring-2 focus:ring-[#8B6F5C] bg-white"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="yearToDate">Year to Date</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F8F7F6] space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Commission</span>
              <DollarSign className="w-5 h-5 text-[#614B3B] opacity-50" />
            </div>
            <div className="text-2xl font-bold text-[#614B3B]">
              ${commissionData.totalCommission.toFixed(2)}
            </div>
            <div className="flex items-center mt-2 text-sm">
              {commissionData.trend === 'up' ? (
                <>
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">{commissionData.trendPercentage}% from previous period</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">{commissionData.trendPercentage}% from previous period</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Number of Sales</span>
              <TrendingUp className="w-5 h-5 text-[#614B3B] opacity-50" />
            </div>
            <div className="text-2xl font-bold text-[#614B3B]">
              {commissionData.numberOfSales}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-900">Commission History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Sale Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Commission</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {commissionData.transactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">{transaction.customerName}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      ${transaction.saleAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-[#614B3B]">
                      ${transaction.commission.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium
                        ${transaction.status === 'paid' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionPage;