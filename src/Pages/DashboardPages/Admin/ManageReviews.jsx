import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ✅ Fetch all reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/reviews");
            return data;
        },
    });

    // ✅ Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/reviews/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["all-reviews"]);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            background: "#1f2937", // dark modal bg
            color: "#f9fafb", // light text
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReviewMutation.mutate(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "The review has been removed.",
                    icon: "success",
                    background: "#1f2937",
                    color: "#f9fafb",
                });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-400 animate-pulse">
                Loading reviews...
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                No reviews found.
            </div>
        );
    }

    return (
        <motion.section
            className="max-w-6xl mx-auto px-4 py-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
                Manage Reviews
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, idx) => (
                    <motion.div
                        key={review._id}
                        className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-700"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        {/* Reviewer Image */}
                        <img
                            src={review.userImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            alt={review.userName}
                            className="w-16 h-16 rounded-full border border-gray-600 mb-4"
                        />

                        <h3 className="text-lg font-semibold text-white">
                            {review.name}
                        </h3>

                        <p className="text-sm text-gray-400 mb-3">
                            {review.email}
                        </p>

                        <p className="text-gray-200 text-base font-medium mb-4">
                            “{review.text}”
                        </p>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(review._id)}
                            className="mt-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                        >
                            Delete
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default ManageReviews;
