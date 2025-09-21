import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import FancyLoading from '../../Shared/FancyLoading/FancyLoading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {

    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { id } = useParams();
    console.log("🚀 ~ PaymentForm ~ propertyId:", id)

    const [error, setError] = useState('');



    const { isPending, data: propertyInfo = {} } = useQuery({
        queryKey: ["properties", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties/${id}`);
            return res.data;
        },
    });

    if (isPending) return <FancyLoading />;

    console.log("Property Info:", propertyInfo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        if (error) {
            setError(error.message)
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>

                <CardElement className='p-2 border rounded-2xl'>

                </CardElement>

                <button className='btn btn-primary w-full' type='submit' disabled={!stripe}>
                    Pay to buy Properties
                </button>

                {
                    error && <p className='text-red-600'>{error}</p>
                }



            </form>


        </div>
    );
};

export default PaymentForm;