// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import { motion } from "framer-motion";
// import useAxios from "../../hooks/useAxios";
// import {
//   FaArrowRight,
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// const AdvertisedProperties = () => {
//   const axiosInstance = useAxios();

//   const { data: properties = [], isLoading } = useQuery({
//     queryKey: ["advertised-properties"],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get("/advertised-properties");
//       return data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-10 text-[#6B7280] text-lg animate-pulse">
//         Loading Verified Properties...
//       </div>
//     );
//   }

//   if (properties.length === 0) return null;

//   return (
//     <motion.section
//       className="max-w-7xl mx-auto px-4 py-14 bg-[#F8F8F8]"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-4xl font-bold mb-10 text-center text-[#2D2D2D]">
//        Advertised Properties
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {properties.map((property, index) => (
//           <motion.div
//             key={property._id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <img
//               src={property.image}
//               alt={property.title}
//               className="h-52 w-full object-cover"
//             />

//             <div className="p-4 flex-1 flex flex-col">
//               <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1 line-clamp-1">
//                 {property.title}
//               </h3>

//               <p className="text-[#6B7280] text-sm flex items-center gap-1 mb-2">
//                 <FaMapMarkerAlt className="text-[#FF6F3C]" />
//                 {property.location}
//               </p>

//               <p className="text-sm text-[#2D2D2D] flex items-center gap-1 mb-2">
//                 <FaMoneyBillWave className="text-[#FF6F3C]" />
//                 <span className="font-semibold text-[#FF6F3C]">
//                   ${property.minPrice} - ${property.maxPrice}
//                 </span>
//               </p>

//               <p className="text-[#10B981] text-xs font-semibold uppercase tracking-wide flex items-center gap-1 mb-2">
//                 <FaCheckCircle />
//                 {property.status}
//               </p>

//               <p className="text-gray-400 text-xs flex items-center gap-1 mb-4">
//                 <FaCalendarAlt />
//                 {new Date(property.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </p>

//               <Link
//                 to={`/properties-details/${property._id}`}
//                 className="mt-auto bg-[#FF6F3C] hover:bg-[#FFA987] text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2"
//               >
//                 View Details <FaArrowRight />
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default AdvertisedProperties;


import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import FancyLoading from "../Shared/FancyLoading/FancyLoading";

const AdvertisedProperties = () => {
  const axiosInstance = useAxios();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["advertised-properties"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/advertised-properties");
      return data;
    },
  });

  if (isLoading) {
    return <FancyLoading></FancyLoading>
  }

  if (properties.length === 0) return null;

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-14 bg-[#F8F8F8] rounded-3xl my-1"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2D2D2D]">
        Advertised Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {properties.slice(0, 8).map((property, index) => (
          <motion.div
            key={property._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={property.image}
              alt={property.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1 line-clamp-1">
                {property.title}
              </h3>

              <p className="text-[#6B7280] text-sm flex items-center gap-1 mb-2">
                <FaMapMarkerAlt className="text-[#FF6F3C]" />
                {property.location}
              </p>

              <p className="text-sm text-[#2D2D2D] flex items-center gap-1 mb-2">
                <FaMoneyBillWave className="text-[#FF6F3C]" />
                <span className="font-semibold text-[#FF6F3C]">
                  ${property.minPrice} - ${property.maxPrice}
                </span>
              </p>

              <p className="text-[#10B981] text-xs font-semibold uppercase tracking-wide flex items-center gap-1 mb-2">
                <FaCheckCircle />
                {property.status}
              </p>

              <p className="text-gray-400 text-xs flex items-center gap-1 mb-4">
                <FaCalendarAlt />
                {new Date(property.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

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

export default AdvertisedProperties;

