




import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import FancyLoading from '../../Shared/FancyLoading/FancyLoading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams(); // offerId
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    // Fetch the offer details
    const { isPending, data: propertyInfo = {} } = useQuery({
        queryKey: ['offer', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const amount = Number(propertyInfo.offerAmount || 0);
    const amountInCents = Math.round(amount * 100);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setError('');

        try {
            if (amount <= 0) {
                setError('Invalid payment amount.');
                setIsProcessing(false);
                return;
            }

            if (!propertyInfo?.propertyId) {
                setError('Property information missing. Cannot proceed.');
                setIsProcessing(false);
                return;
            }

            const card = elements.getElement(CardElement);
            if (!card) return;

            // Step 1: Create payment intent
            const { data } = await axiosSecure.post('/create-payment-intent', {
                amount: amountInCents,
            });

            const clientSecret = data.clientSecret;
            if (!clientSecret) throw new Error('Failed to create payment intent.');

            // Step 2: Confirm card payment
            const { error: confirmError, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card,
                        billing_details: {
                            email: user?.email,
                            name: user?.displayName || 'Anonymous',
                        },
                    },
                });

            if (confirmError) {
                setError(confirmError.message);
                setIsProcessing(false);
                return;
            }

            // Step 3: Save payment and update project status
            if (paymentIntent.status === 'succeeded') {
                const transactionId = paymentIntent.id;

                const paymentData = {
                    offerId: id,
                    propertyId: propertyInfo.propertyId,
                    email: user.email,
                    amount,
                    transactionId,
                    paymentMethod: paymentIntent.payment_method_types[0],
                    date: new Date(),
                };

                // Save to DB
                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (!paymentRes?.data?.insertedId) {
                    throw new Error('Failed to save payment info.');
                }

                // Update project status
                await axiosSecure.patch(`/project-status/${id}`, { transactionId });

                await Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                    confirmButtonText: 'Go to My Bought Properties',
                });

                navigate('/dashboard/property-bought');
            } else {
                setError('Payment not completed.');
            }
        } catch (err) {
            setError(err?.response?.data?.error || err.message || 'Payment failed.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isPending) return <FancyLoading />;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full"
            >
                <CardElement className="p-3 border rounded-xl" />

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
                    type="submit"
                    disabled={!stripe || isProcessing || amount <= 0}
                >
                    {isProcessing
                        ? 'Processing...'
                        : `Pay $${amount.toLocaleString()}`}
                </button>

                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;

