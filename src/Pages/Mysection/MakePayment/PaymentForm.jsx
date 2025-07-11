import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useNavigate } from 'react-router';

const PaymentForm = ({parcelId}) => {

      const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParcel = async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      setParcel(res.data);
    };

    const createIntent = async () => {
      const res = await axiosSecure.post('/create-payment-intent', {
        parcelId
      });
      setClientSecret(res.data.clientSecret);
    };

    fetchParcel();
    createIntent();
  }, [parcelId, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
     if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      await axiosSecure.patch(`/parcels/payment/${parcelId}`, {
        transactionId: paymentIntent.id,
      });
      navigate('/dashboard/my-parcels');
    }
  };
    return (
        <form onSubmit={handleSubmit}>
      <CardElement className="p-4 border border-gray-300 rounded-md mb-4" />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="btn btn-primary w-full"
      >
        Pay ৳{parcel?.cost || '...'}
      </button>
    </form>
    );
};

export default PaymentForm;