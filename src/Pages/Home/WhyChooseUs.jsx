import { ShieldCheck, Home, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Home size={36} className="text-indigo-600" />,
      title: "Verified Properties",
      desc: "We ensure all listings are genuine and verified for your peace of mind.",
    },
    {
      icon: <Users size={36} className="text-indigo-600" />,
      title: "Trusted Agents",
      desc: "Connect with professional agents who are here to guide you at every step.",
    },
    {
      icon: <ShieldCheck size={36} className="text-indigo-600" />,
      title: "Secure Transactions",
      desc: "Your property deals are protected with safe and transparent processes.",
    },
    {
      icon: <DollarSign size={36} className="text-indigo-600" />,
      title: "Best Price Deals",
      desc: "Find properties that match your budget with the best market rates.",
    },
  ];

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Why Choose <span className="text-indigo-600">Dream Square</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          At Dream Square, we make your real estate journey simple, safe, and rewarding. 
          Here’s why thousands of buyers and agents trust us.
        </motion.p>

        {/* Features Grid with Animation */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center cursor-pointer"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
