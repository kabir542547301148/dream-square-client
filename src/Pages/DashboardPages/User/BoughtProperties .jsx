



// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import FancyLoading from "../../Shared/FancyLoading/FancyLoading";
// import { Link, useNavigate } from "react-router";

// const BoughtProperties = () => {
//     const { user } = useAuth();
//     const instance = useAxiosSecure();
//     const navigate = useNavigate();

//     const { data: boughtProperties, isLoading, isError } = useQuery({
//         queryKey: ["boughtProperties", user?.email],
//         queryFn: async () => {
//             const { data } = await instance.get(`/offers?buyerEmail=${user.email}`);
//             return data;
//         },
//         enabled: !!user?.email,
//     });

//     if (isLoading) return <FancyLoading />;
//     if (isError)
//         return (
//             <p className="text-center text-red-500 mt-10">
//                 Failed to load bought properties.
//             </p>
//         );

//     if (!boughtProperties || boughtProperties.length === 0) {
//         return (
//             <p className="text-center text-gray-400 mt-10">
//                 You have not bought any properties yet.
//             </p>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-6 grid gap-6 md:grid-cols-2">
//             {boughtProperties.map((item) => (
//                 <div
//                     key={item._id}
//                     className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
//                 >
//                     <img
//                         src={item.image || "https://via.placeholder.com/400x200?text=Property"}
//                         alt={item.title}
//                         className="w-full h-48 object-cover"
//                     />

//                     <div className="p-4">
//                         <h3 className="text-xl font-bold mb-2 text-gray-100">
//                             {item.title}
//                         </h3>
//                         <p className="text-gray-300 mb-1">Agent: {item.agentName}</p>
//                         <p className="text-gray-300 mb-1">
//                             Offer: ${item.offerAmount.toLocaleString()}
//                         </p>
//                         <p
//                             className={`font-semibold ${item.status === "pending"
//                                     ? "text-yellow-400"
//                                     : item.status === "accepted"
//                                         ? "text-green-400"
//                                         : "text-red-400"
//                                 }`}
//                         >
//                             Status: {item.status}
//                         </p>

//                         {/* ✅ Show Pay Now button only if status is accepted */}
//                         {item.status === "accepted" && (


//                             <button
//                                 onClick={() => navigate(`/dashboard/payment/${item.propertyId}`)}
//                                 className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
//                             >
//                                 Pay Now
//                             </button>


//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default BoughtProperties;




import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FancyLoading from "../../Shared/FancyLoading/FancyLoading";
import { Link, useNavigate } from "react-router";

const BoughtProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: boughtProperties = [], isLoading, isError } = useQuery({
        queryKey: ["boughtProperties", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offers?buyerEmail=${user.email}`);
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

    if (!boughtProperties.length) {
        return (
            <p className="text-center text-gray-400 mt-10">
                You have not bought any properties yet.
            </p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 grid gap-6 md:grid-cols-2">
            {boughtProperties.map((item) => (
                <div
                    key={item._id}
                    className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                >
                    <img
                        src={
                            item.image ||
                            "https://via.placeholder.com/400x200?text=Property"
                        }
                        alt={item.title}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 text-gray-100">
                            {item.title}
                        </h3>
                        <p className="text-gray-300 mb-1">
                            📍 Location: {item.location}
                        </p>
                        <p className="text-gray-300 mb-1">
                            👤 Agent: {item.agentName} ({item.agentEmail})
                        </p>
                        <p className="text-gray-300 mb-1">
                            💰 Offer: ${item.offerAmount.toLocaleString()}
                        </p>
                        <p className="text-gray-300 mb-1">
                            🧑 Buyer: {item.buyerName} ({item.buyerEmail})
                        </p>
                        <p className="text-gray-300 mb-1">
                            📅 Buying Date: {item.buyingDate}
                        </p>
                        <p className="text-gray-300 mb-1">
                            ⏱ Created: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        <p
                            className={`font-semibold ${item.status === "pending"
                                    ? "text-yellow-400"
                                    : item.status === "accepted"
                                        ? "text-green-400"
                                        : "text-red-400"
                                }`}
                        >
                            Status: {item.status}
                        </p>

                        {/* ✅ Show Pay Now button only if status is accepted */}
                        {item.status === "accepted" && (
                            <button
                                onClick={() =>
                                    navigate(`/dashboard/payment/${item._id}`)
                                }
                                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoughtProperties;

