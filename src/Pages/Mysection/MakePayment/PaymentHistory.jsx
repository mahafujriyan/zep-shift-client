import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const PaymentHistory = () => {
     const [payments, setPayments] = useState([]);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await axiosSecure.get('/payments');
      setPayments(res.data);
    };
    fetchPayments();
  }, [axiosSecure]);
    return (
      <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">💳 Payment History</h2>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-gray-800 text-sm">
          <thead className="bg-blue-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Parcel ID</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Method</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-500'}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{payment.parcelId}</td>
                <td className="py-3 px-4">{payment.transactionId}</td>
                <td className="py-3 px-4">{payment.email}</td>
                <td className="py-3 px-4 capitalize">{payment.payment_method}</td>
                <td className="py-3 px-4 text-green-600 font-medium">
                  {payment.payment_status}
                </td>
                <td className="py-3 px-4">
                  {new Date(payment.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;