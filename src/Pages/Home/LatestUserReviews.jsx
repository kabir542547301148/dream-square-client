import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import FancyLoading from "../Shared/FancyLoading/FancyLoading";

const LatestUserReviews = () => {
    const axiosInstance = useAxios();

    // ✅ Fetch reviews from your backend route
    const {
        data: reviews = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosInstance.get("/reviews");
            return res.data;
        },
    });

    if (isLoading)
        return <FancyLoading></FancyLoading>

    if (error)
        return (
            <div className="min-h-[200px] flex justify-center items-center text-red-600 font-semibold text-lg">
                Failed to load reviews.
            </div>
        );

    // ✅ sort reviews by date and take the latest 3
    const latestReviews = reviews
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-[#FFF9F0] via-[#FDF6EC] to-[#FFF9F0] rounded-3xl shadow-xl my-1">
            <h2 className="text-4xl font-bold mb-10 text-center text-[#2D2D2D]">
                Latest User Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {latestReviews.map((review, i) => (
                    <motion.div
                        key={review.reviewId || review._id || i}
                        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={review.reviewerPhoto || "/default-avatar.png"}
                                alt={review.name}
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-[#FF6F3C] shadow-sm"
                            />
                            <div>
                                <h4 className="text-lg md:text-xl font-semibold text-[#2D3748]">
                                    {review.name}
                                </h4>
                                <p className="text-sm text-[#718096] italic mt-1">
                                    {review.propertyTitle || "Property"}
                                </p>
                            </div>
                        </div>

                        <p className="text-[#4A5568] text-base leading-relaxed tracking-wide relative pl-4 border-l-4 border-[#FF6F3C]">
                            “{review.text}”
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default LatestUserReviews;
