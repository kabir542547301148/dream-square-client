



import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import FancyLoading from '../../Shared/FancyLoading/FancyLoading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams(); // <-- offerId

    // Fetch the offer details
    const { isPending, data: propertyInfo = {} } = useQuery({
        queryKey: ['offer', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/${id}`);
            return res.data;
        },
    });

    console.log(propertyInfo);

    const amount = propertyInfo.offerAmount;
    const amountInCents = amount*100;
    console.log("🚀 ~ PaymentForm ~ amountInCents:", amountInCents)
    


    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('✅ payment method created', paymentMethod);
        }

         // Step 2: Create payment intent on server
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;
      }
    };

    if (isPending) return <FancyLoading />;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Show property details */}


            {/* Stripe Payment Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full"
            >
                <CardElement className="p-3 border rounded-xl" />

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                    type="submit"
                    disabled={!stripe}
                >
                    Pay ${propertyInfo.offerAmount?.toLocaleString()}
                </button>

                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;

