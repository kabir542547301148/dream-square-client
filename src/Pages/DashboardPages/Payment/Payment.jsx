import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51S2Npm4XsPO0Nxk9lrpVLHJGLOhPDXVJ1eyOPJO2FEkXTzLq5X6fNaRDV2L8AwNXjeORVYIbhvg0f0yWONhP0K0v00Cv3nvRdI');

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;