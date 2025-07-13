import React from 'react';
import { useParams } from 'react-router';
import StripeProvider from '../../Context/StripeProvider/StripeProvider';
import PaymentForm from './PaymentForm';

const Payment = () => {
     const { id } = useParams();

  return (
    <div className="max-w-md mx-auto mt-10 bg-violet-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Pay for Parcel</h2>
      <StripeProvider>
        <PaymentForm parcelId={id} />
      </StripeProvider>
    </div>
  );
};

export default Payment;