import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FancyLoading from "../Shared/FancyLoading/FancyLoading";

const AllProperties = () => {
  const axiosInstance = useAxiosSecure();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-verified-properties"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/properties"); // ✅ your backend should only return verified ones
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-[#6B7280] text-lg animate-pulse">
        Loading Verified Properties...
      </div>
    );
  }

  if (properties.length === 0) {
    return <FancyLoading></FancyLoading>
  }

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-14"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-10 text-center text-yellow-400">
        All Verified Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Property Image */}
            <img
              src={property.image}
              alt={property.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-4 flex-1 flex flex-col">
              {/* Title */}
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1 line-clamp-1">
                {property.title}
              </h3>

              {/* Location */}
              <p className="text-[#6B7280] text-sm flex items-center gap-1 mb-2">
                <FaMapMarkerAlt className="text-[#FF6F3C]" />
                {property.location}
              </p>

              {/* Agent Info */}
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={property.agentImage || "https://www.w3schools.com/howto/img_avatar.png"}
                  alt={property.agentName}
                  className="w-7 h-7 rounded-full border"
                />
                <span className="text-sm text-[#2D2D2D] font-medium">
                  {property.agentName || "Unknown Agent"}
                </span>
              </div>

              {/* Verification Status */}
              <p className="text-[#10B981] text-xs font-semibold uppercase tracking-wide flex items-center gap-1 mb-2">
                <FaCheckCircle />
                Verified
              </p>

              {/* Price Range */}
              <p className="text-sm text-[#2D2D2D] flex items-center gap-1 mb-4">
                <FaMoneyBillWave className="text-[#FF6F3C]" />
                <span className="font-semibold text-[#FF6F3C]">
                  ${property.minPrice} - ${property.maxPrice}
                </span>
              </p>

              {/* Details Button */}
              <Link
                to={`/properties-details/${property._id}`}
                className="mt-auto bg-[#FF6F3C] hover:bg-[#FFA987] text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2"
              >
                View Details <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AllProperties;
