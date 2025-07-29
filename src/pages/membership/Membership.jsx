import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import { User } from 'lucide-react';
import { AuthContext } from '../../context/provider/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishKey);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');


        const res = await fetch('https://forum-server-ebon.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 500 })
        });
        const { clientSecret } = await res.json();

        const card = elements.getElement(CardElement);
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card }
        });

        if (paymentResult.error) {
            setError(paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            setSuccess('Payment successful!');

            const data = {
                paymentId: paymentResult.paymentIntent.id,
                amount: paymentResult.paymentIntent.amount,
                status: paymentResult.paymentIntent.status,
                userEmail: User.email,
            };

            try {
                const res = await axiosSecure.post(`/save-payment?email=${user.email}`, data);
                if (res.data.success) {
                    toast.success('Payment info saved!');
                } else {
                    toast.error('Payment info save failed!');
                }
            } catch (err) {
                toast.error(err.message);
            }
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-base-200 rounded">
            <CardElement className="mb-4 p-2 border rounded" />
            <button className="btn btn-primary w-full" type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay $5'}
            </button>
            {error && <p className="text-error mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
        </form>
    );
};

const Membership = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Membership Payment</h2>
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    </div>
);

export default Membership;