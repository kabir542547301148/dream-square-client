import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import FancyLoading from '../Shared/FancyLoading/FancyLoading';

const SoldProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Assuming user is the agent

    const { isPending, data: soldProperties = [] } = useQuery({
        queryKey: ['soldProperties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/agent/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isPending) return <FancyLoading />;

    if (soldProperties.length === 0) {
        return <p className="text-center mt-10 text-white">No properties sold yet.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-white mb-4">Sold Properties</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="border p-2 text-yellow-400">Property ID</th>
                            <th className="border p-2 text-green-400">Offer ID</th>
                            <th className="border p-2 text-blue-400">Buyer Email</th>
                            <th className="border p-2 text-pink-400">Amount ($)</th>
                            <th className="border p-2 text-purple-400">Transaction ID</th>
                            <th className="border p-2 text-red-400">Payment Method</th>
                            <th className="border p-2 text-white">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soldProperties.map((item) => (
                            <tr key={item._id} className="bg-gray-800">
                                <td className="border p-2 text-yellow-300">{item.propertyId}</td>
                                <td className="border p-2 text-green-300">{item.offerId}</td>
                                <td className="border p-2 text-blue-300">{item.email}</td>
                                <td className="border p-2 text-pink-300">{item.amount}</td>
                                <td className="border p-2 text-purple-300">{item.transactionId}</td>
                                <td className="border p-2 text-red-300">{item.paymentMethod}</td>
                                <td className="border p-2 text-white">{new Date(item.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SoldProperties;
