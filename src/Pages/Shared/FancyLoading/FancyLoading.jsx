import React from "react";
import { motion } from "framer-motion";

const FancyLoading = () => {
  const bars = Array.from({ length: 5 });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F9FAFB]">
      {/* Bars wave animation */}
      <div className="flex space-x-2">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-10 rounded-md bg-gradient-to-t from-[#3B82F6] to-[#0EA5E9]"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text with sliding dots */}
      <motion.p
        className="mt-6 text-[#1E293B] text-lg font-medium flex items-center"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading
        <motion.span
          className="ml-1 flex"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.p>
    </div>
  );
};

export default FancyLoading;

