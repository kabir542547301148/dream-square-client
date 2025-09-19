import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FancyLoading from "../../Shared/FancyLoading/FancyLoading";

const MyReviews = () => {
    const { user } = useAuth();
    const instance = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch user's reviews
    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ["my-reviews", user?.email],
        queryFn: async () => {
            const { data } = await instance.get(`/reviews/${user.email}`);
            return data;
        },
        enabled: !!user?.email,
    });

    // Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: async (reviewId) => {
            await instance.delete(`/reviews/${reviewId}`);
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Review deleted successfully", "success");
            queryClient.invalidateQueries(["my-reviews", user?.email]);
        },
        onError: () => Swal.fire("Error", "Could not delete review", "error"),
    });

    if (isLoading) return <FancyLoading />;
    if (isError)
        return (
            <p className="text-center text-red-500">Failed to load reviews</p>
        );

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">My Reviews</h2>

            {reviews.length === 0 && (
                <p className="text-gray-300">You haven't added any reviews yet.</p>
            )}

            <div className="space-y-4">
                {reviews.map((review, i) => (
                    <div
                        key={`${review.reviewId}-${i}`} // unique key
                        className="bg-gray-900 p-4 rounded-lg shadow-md text-gray-200"
                    >
                        {/* Property title */}
                        <h3 className="font-semibold">{review.propertyTitle}</h3>
                        <p className="text-sm text-gray-400">Agent: {review.agentName}</p>
                        <p className="text-sm text-gray-400">
                            Reviewed on: {new Date(review.reviewTime).toLocaleString()}
                        </p>

                        {/* Reviewer name and review text */}
                        <p className="mt-2">
                            <span className="font-medium">{review.name}:</span> {review.text || review.reviewDescription}
                        </p>

                        <button
                            onClick={() => deleteReviewMutation.mutate(review.reviewId)}
                            className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;




