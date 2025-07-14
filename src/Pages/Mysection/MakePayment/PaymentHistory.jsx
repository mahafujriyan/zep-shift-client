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
        <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Parcel ID</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">{payment.parcelId}</td>
                <td className="px-4 py-2 border text-center">{payment.transactionId}</td>
                <td className="px-4 py-2 border text-center">{payment.payment_status}</td>
                <td className="px-4 py-2 border text-center">
                  {new Date(payment.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;