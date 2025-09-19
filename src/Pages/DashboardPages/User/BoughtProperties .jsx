import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FancyLoading from "../../Shared/FancyLoading/FancyLoading";

const BoughtProperties = () => {
    const { user } = useAuth();
    const instance = useAxiosSecure();

    const { data: boughtProperties, isLoading, isError } = useQuery({
        queryKey: ["boughtProperties", user?.email],
        queryFn: async () => {
            const { data } = await instance.get(`/offers?buyerEmail=${user.email}`);
            return data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <FancyLoading />;
    if (isError)
        return (
            <p className="text-center text-red-500 mt-10">
                Failed to load bought properties.
            </p>
        );

    if (!boughtProperties || boughtProperties.length === 0) {
        return (
            <p className="text-center text-gray-400 mt-10">
                You have not bought any properties yet.
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 grid gap-6 md:grid-cols-2">
            {boughtProperties.map((item) => (
                <div
                    key={item._id}
                    className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                >
                    {/* Replace with actual property image if available */}
                    <img
                        src={item.image || "https://via.placeholder.com/400x200?text=Property"}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 text-gray-100">
                            {item.title}
                        </h3>
                        <p className="text-gray-300 mb-1">Agent: {item.agentName}</p>
                        <p className="text-gray-300 mb-1">
                            Offer: ${item.offerAmount.toLocaleString()}
                        </p>
                        <p
                            className={`font-semibold ${item.status === "pending" ? "text-yellow-400" : "text-green-400"
                                }`}
                        >
                            Status: {item.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoughtProperties;




