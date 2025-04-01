import React, { useState, useEffect } from 'react';

const FeeManagement = () => {
  const [feeDetails, setFeeDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch fee data
    setTimeout(() => {
      setFeeDetails({
        totalFee: 45000,
        amountPaid: 30000,
        dueAmount: 15000,
        nextDueDate: '2025-04-15',
      });
      
      setPaymentHistory([
        { id: 'PAY1001', date: '2024-12-10', amount: 15000, mode: 'Online Transfer', status: 'Completed' },
        { id: 'PAY1002', date: '2025-01-15', amount: 15000, mode: 'Credit Card', status: 'Completed' },
      ]);
      
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Fee Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Total Fee</h3>
            <p className="text-2xl font-bold text-gray-800">₹{feeDetails.totalFee.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Amount Paid</h3>
            <p className="text-2xl font-bold text-green-700">₹{feeDetails.amountPaid.toLocaleString()}</p>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Due Amount</h3>
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-red-600">₹{feeDetails.dueAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">Due by: {feeDetails.nextDueDate}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Make Payment
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Payment ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6 text-left">Mode</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{payment.id}</td>
                  <td className="py-3 px-6 text-left">{payment.date}</td>
                  <td className="py-3 px-6 text-right">₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-left">{payment.mode}</td>
                  <td className="py-3 px-6 text-left">
                    <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;