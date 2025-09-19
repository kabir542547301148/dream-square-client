import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash, FaDollarSign, FaMapMarkerAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FancyLoading from "../../Shared/FancyLoading/FancyLoading";

const Wishlist = () => {
    const { user } = useAuth();
    const instance = useAxiosSecure();
    const queryClient = useQueryClient();

    // ✅ Fetch wishlist properties
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ["wishlist", user?.email],
        queryFn: async () => {
            const { data } = await instance.get(`/wishlist/${user?.email}`);
            return data;
        },
        enabled: !!user?.email, // only run if user exists
    });

    // ✅ Remove mutation
    const removeMutation = useMutation({
        mutationFn: async (propertyId) => {
            await instance.delete(`/wishlist/${user?.email}/${propertyId}`);
        },
        onSuccess: () => {
            Swal.fire("Removed!", "Property removed from wishlist", "success");
            queryClient.invalidateQueries(["wishlist", user?.email]);
        },
        onError: () => {
            Swal.fire("Error", "Could not remove property", "error");
        },
    });

    if (isLoading) return <FancyLoading />;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

            {wishlist.length === 0 && (
                <p className="text-gray-500">No properties in your wishlist yet.</p>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wishlist.map((property) => (
                    <div
                        key={property._id}
                        className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={property.image}
                            alt={property.title}
                            className="h-48 w-full object-cover"
                        />

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold mb-1 text-black">{property.title}</h3>
                            <p className="flex items-center text-sm text-gray-600 mb-2">
                                <FaMapMarkerAlt className="mr-1 text-red-500" />{" "}
                                {property.location}
                            </p>
                            <p className="flex items-center text-sm text-gray-600 mb-2">
                                <FaUserTie className="mr-1 text-blue-500" /> {property.agentName}
                            </p>

                            {/* Agent Image + Verification */}
                            <div className="flex items-center gap-2 mb-3">
                                <img
                                    src={property.agentImage || "/default-user.png"}
                                    alt={property.agentName}
                                    className="w-8 h-8 rounded-full border"
                                />
                                {property.isVerified && (
                                    <FaCheckCircle className="text-green-500" title="Verified Agent" />
                                )}
                            </div>

                            {/* Price */}
                            <p className="flex items-center text-orange-600 font-semibold mb-4">
                                <FaDollarSign className="mr-1" /> ${property.minPrice} - $
                                {property.maxPrice}
                            </p>

                            {/* Actions */}
                            <div className="mt-auto flex justify-between gap-2">
                                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm">
                                    Make an Offer
                                </button>
                                <button
                                    onClick={() => removeMutation.mutate(property._id)}
                                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
